import { useProductsBySKU } from "@/data";
import GlobalContext from "context/GlobalContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CartProductCard from "shared/Components/CartProductCard";
import getCartItems from "shared/Utils/getCartItems";
import getCouponDiscount from "shared/Utils/getCouponDiscount";
import CartStyle from "./Style";

const Cart = () => {
  const [dataLimit, setDataLimit] = useState(10);
  const [products, setProducts] = useState({});
  const cartItems = getCartItems();
  const cartItemsCount = Object.keys(cartItems).length;
  const { cartPriceDetails, setCartPriceDetails } = useContext(GlobalContext);

  const carItemsSku = Object.keys(cartItems).map((sku) => {
    return parseInt(sku);
  })

  const { data, status, isLoading, isError } = useProductsBySKU(
    0,
    dataLimit,
    [...carItemsSku]
  );

  const preparePriceDetails = (data) => {
    let subTotal = 0;
    Object.keys(cartItems).map((sku) => {
      subTotal += data[sku].price * cartItems[sku].qty;
    });

    const couponInfo = getCouponDiscount(subTotal);

    setCartPriceDetails({
      ...cartPriceDetails,
      subTotal,
      discount : 0,
      coupon : couponInfo.coupon,
      couponDiscount : couponInfo.discount,
      total : subTotal - couponInfo.discount
    })
  }

  useEffect(() => {
    if (status === "success") {
      setProducts({ ...data });
      preparePriceDetails(data);
    }
  }, [status]);

  return (
    cartItemsCount > 0 ? <CartStyle>
      <div className="products">
        <h1>My Cart ({cartItemsCount})</h1>

        {!isError && Object.keys(cartItems).map((sku, index) => (
          <CartProductCard
            key={index}
            id={sku}
            {...products[sku]}
            quantity={cartItems[sku].qty}
          />
        ))}

        <div className="continue-shopping">
          <Link href="/">
            <a>Continue Shopping</a>
          </Link>
        </div>
      </div>
      <div className="summary">
        <div className="details-heading">Price details</div>
        {
          cartPriceDetails && <ul className="details">
            <li className="price">
              <span className="label">Price ({cartItemsCount} items)</span>
              <span className="value">{cartPriceDetails.subTotal}</span>
            </li>
            <li className="discount">
              <span className="label">Discount</span>
              <span className="value">0</span>
            </li>
            <li className="coupon-discount">
              {
                cartPriceDetails.coupon ? (
                  <>
                    <span className="label">Coupon Discount ({cartPriceDetails.coupon})</span>
                    <span className="value">{cartPriceDetails.couponDiscount}</span>
                  </>
                ) : (
                  <div className="form">
                    <input type="text" name="" id="" />
                    <button>Apply Coupon</button>
                  </div>
                )
              }
            </li>
            <li className="delivery-charge">
              <span className="label">Delivery Charge</span>
              <span className="value">Free</span>
            </li>
            <li className="total">
              <span className="label">Total Amount</span>
              <span className="value">{cartPriceDetails.total}</span>
            </li>
            <li className="button">
              <Link href="/checkout">
                <a>Place Order</a>
              </Link>
            </li>
          </ul>
        }
      </div>
    </CartStyle> : <CartStyle emptyCart={true}>
      No Items in Your Cart
      <br />
      <Link href="/">
        <a>Explore Products</a>
      </Link>
    </CartStyle>
  )
}

export default Cart;