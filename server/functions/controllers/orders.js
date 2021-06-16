const { db } = require("../firebase/init");

/** Recalculate the total of order */
/** Get total products value helper */
const getTotalProductsValue = (dbProducts, quantities) =>
  dbProducts.docs.reduce((carry, prod) => {
    if (!quantities[prod.sku]) {
      return carry;
    }

    return carry + prod.price * parseFloat(quantities[prod.sku]);
  }, 0.0);

/** Get Products by Sellers */
const getSellerProducts = (dbProducts) => {
  const sellerProducts = {};
  dbProducts.docs.forEach((prod) => {
    const { seller } = prod;
    sellerProducts[seller] = prod;
  });

  return sellerProducts;
};

/** Re-Calculates the total to validate the order */
const validateOrder = async ({
  orderTotal = 0.0,
  coupon = "",
  quantities = {},
  pincode = "" /** For order's deleivery charges re-calculation */,
}) => {
  /** Validations for orderTotal and quantities (Product IDs as keys) */
  if (!orderTotal) {
    throw Error("Order Total is empty");
  }

  if (!quantities || Object.keys(quantities).count == 0) {
    throw Error("No Products found to create order");
  }

  /** Get products from DB */
  const dbProducts = await db
    .collection("products")
    .where("sku", "in", Object.keys(quantities))
    .get();

  /** Calculate total products value */
  let totalOrderValue = getTotalProductsValue(dbProducts, quantities);
  if (!totalOrderValue || totalOrderValue < 0) {
    throw Error("No orders can be free");
  }

  /** Get Coupon from DB and validate the total after applying coupon's discount */
  if (!!coupon) {
    const dbCoupon = await db.collection("discounts").doc(coupon).get();
    if (!dbCoupon || !dbCoupon.discount) {
      throw Error("Invalid Coupon");
    }

    totalOrderValue = totalOrderValue - dbCoupon.discount;
    if (!totalOrderValue || totalOrderValue < 0) {
      throw Error("No orders can be free");
    }
  }

  /** Get Products by Sellers */
  const sellerProducts = getSellerProducts(dbProducts);
  if (Object.keys(sellerProducts).length == 0) {
    throw Error("No products can be without sellers");
  }

  /** Get Sellers */
  const sellers = await db
    .collection("sellers")
    .where("id", "in", Object.keys(sellerProducts))
    .get();

    /** TODO: Calculate & Validate: Delivery Charges & Shipping Discounts (Neighbourhood Discounts etc.) */
};

const createOrder = (req, res) => {};
