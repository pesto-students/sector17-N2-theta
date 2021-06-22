const { db } = require("../firebase/init");
const { getDistanceInKMs } = require("../controllers/distanceCalculate");

/** Recalculate the total of order */
/** Get total products value helper */
const getTotalProductsValue = (dbProducts, quantities) =>
  dbProducts.docs.reduce((carry, doc) => {
    const prod = doc.data();
    if (!quantities[prod.sku]) {
      return carry;
    }

    return carry + prod.price * parseFloat(quantities[prod.sku]);
  }, 0.0);

/** Get Products by Sellers */
const getSellerProducts = (dbProducts) => {
  const sellerProducts = {};
  dbProducts.docs.forEach((doc) => {
    const prod = doc.data();
    const { seller } = prod;
    sellerProducts[seller] = prod;
  });

  return sellerProducts;
};

/** Get Distances of Sellers to Customers */
const getSellerDistances = async (dbSellers, customerPin) => {
  const distances = {};

  for (const doc of dbSellers.docs) {
    const seller = doc.data();
    const { pincode } = seller;
    const distance = await getDistanceInKMs(pincode, customerPin);

    if(distance === 0) {
      distances[seller.id] = 0;
    }

    if (!!distance) {
      distances[seller.id] = distance;
    }
  }

  return distances;
};

/** Get Pincodes of Sellers */
const getSellerPincodes = async (dbSellers) => {
  const pincodes = {};

  for (const doc of dbSellers.docs) {
    const seller = doc.data();
    const { pincode } = seller;
    pincodes[seller.id] = pincode;
  }

  return pincodes;
};

/** Re-Calculates the total to validate the order */
const validateOrder = async ({
  orderTotal = 0.0,
  coupon = "",
  quantities = {},
  pincode /** For order's deleivery charges re-calculation */,
}) => {
  /** Validations for orderTotal and quantities (Product IDs as keys) */
  if (!orderTotal) {
    throw Error("Order Total is empty");
  }

  if (!quantities || Object.keys(quantities).count == 0) {
    throw Error("No Products found to create order");
  }

  if (!pincode) {
    throw Error("Pincode is mendatory to calculate delivery charges");
  }

  const prodKeys = Object.keys(quantities).map(prod => parseInt(prod));

  /** Get products from DB */
  const dbProducts = await db
    .collection("products")
    .where("sku", "in", prodKeys)
    .get();

  /** Calculate total products value */
  let totalOrderValue = getTotalProductsValue(dbProducts, quantities);
  if (!totalOrderValue || totalOrderValue < 0) {
    throw Error("No orders can be free, #1");
  }

  let couponDiscount = 0;
  /** Get Coupon from DB and validate the total after applying coupon's discount */
  if (!!coupon) {
    const couponRef = await db.collection("discounts").doc(coupon).get();
    const dbCoupon = couponRef.data();
    if (!dbCoupon || !dbCoupon.discount) {
      throw Error("Invalid Coupon");
    }

    couponDiscount = (parseFloat(dbCoupon.discount) / 100) * totalOrderValue;
    totalOrderValue = totalOrderValue - couponDiscount;
    if (!totalOrderValue || totalOrderValue < 0) {
      throw Error("No orders can be free, #2");
    }
  }

  /** Get Products by Sellers */
  const sellerProducts = getSellerProducts(dbProducts);
  if (Object.keys(sellerProducts).length == 0) {
    throw Error("No products can be without sellers");
  }

  /** Get Sellers */
  const dbSellers = await db
    .collection("sellers")
    .where("id", "in", Object.keys(sellerProducts))
    .get();

  /** Get distances of each seller */
  // const sellerDistances = await getSellerDistances(dbSellers, pincode);
  // if (Object.keys(sellerDistances).length < 1) {
  //   throw Error("Unable to calculate distances for delivery charges");
  // }

  /** Delivery charges */
  const sellerDeliveryCharges = {};
  let totalDelivery = 0;

  /** Neighbourhood Discounts */
  const sellerNeighbourDiscounts = {};
  let totalNeighbourDiscount = 0;

  /** Seller Pincodes */
  const sellerPincodes = await getSellerPincodes(dbSellers);
  /** Round to nearest 100 and add charges to totalOrderValue, OR apply express discount if within 100 KMs */
  for (const seller in sellerPincodes) {
    //const distance = sellerDistances[seller];

    /** Apply Neighbourhood discount (ie: 100) */
    if (pincode == sellerPincodes[seller] && totalOrderValue >= 200) {
      totalOrderValue = totalOrderValue - 100;

      /** Set Extra attributes */
      sellerNeighbourDiscounts[seller] = 100;
      totalNeighbourDiscount += 100;

      break;
      //continue;
    }

    // const delivery = Math.round(distance / 100) * 100;
    // totalOrderValue = totalOrderValue + delivery;

    // /** Set extra attributes */
    // totalDelivery += delivery;
    // sellerDeliveryCharges[seller] = delivery;
  }

  /** Throw error if order total difference is more than 10 */
  const valueDiff = Math.abs(totalOrderValue - orderTotal);
  if (valueDiff > 10) {
    throw Error(`Invalid Order total`);
  }

  return {
    lineItems: dbProducts.docs.map((d) => {
      const doc = d.data();
      return {
        id: doc.sku,
        qty: quantities[doc.sku],
        price: doc.price,
      };
    }),
    // deliveryCharges: {
    //   bySeller: sellerDeliveryCharges,
    //   total: totalDelivery,
    // },
    expressDiscounts: {
      bySeller: sellerNeighbourDiscounts,
      total: totalNeighbourDiscount,
    },
    couponDiscount: {
      coupon,
      discount: couponDiscount,
    },
    total: totalOrderValue,
    products: dbProducts.docs
      .map((d) => {
        const doc = d.data();
        return doc.name;
      })
      .join(", "),
  };
};

const stripe = require("stripe")("sk_test_odah4QkOQP0fKB4Z8GY70926");

const createOrder = async (req, res, next) => {
  const { orderTotal, coupon, quantities, pincode, uid, email } = req.body;
  let order = {};
  try {
    order = await validateOrder({ orderTotal, coupon, quantities, pincode });

    const doc = await db.collection('orders').add({...order, uid, email});

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: order.products,
            },
            unit_amount_decimal: parseInt(order.total) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://sector17.netlify.app/order-status?status=success&id=" + doc.id,
      cancel_url: "https://sector17.netlify.app/order-status?status=failed&id=" + doc.id,
    });

    res.json({ id: session.id });
  } catch (e) {
    next(e.message);
  }
};

module.exports = { createOrder };
