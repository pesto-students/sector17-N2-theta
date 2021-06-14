import GlobalContext from "context/GlobalContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CartStyle from "./Style";
import CartProducts from "./Products";
import getCouponDiscount from "shared/Utils/getCouponDiscount";

const Cart = () => {
  const [cartItemsSku, setCartItemsSku] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState();
  const { cartPriceDetails, setCartPriceDetails, cartItems } = useContext(GlobalContext);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  
  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
    setCouponError('');
  }

  const applyCoupon = () => {
    if(couponCode == ''){
      setCouponError('Please Enter a coupon code.');
      return;
    }
    if(couponCode !== 'sector17'){
      setCouponError('Please Enter a valid coupon code.');
      return;
    }

    localStorage.setItem('coupon', couponCode);
    setCartPriceDetails({
      ...cartPriceDetails,
      coupon : couponCode,
      total : cartPriceDetails.subTotal - cartPriceDetails.couponDiscount
    })
  }

  const removeCouponCode = () => {
    setCouponCode('');
    localStorage.removeItem('coupon');
    setCartPriceDetails({
      ...cartPriceDetails,
      coupon : null,
      total : cartPriceDetails.subTotal
    })
  }

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
      total : couponInfo.coupon ? subTotal - couponInfo.discount : subTotal
    })
  }

  useEffect(async () => {
    if(cartItems){
      setCartItemsCount(Object.keys(cartItems).length);
      setCartItemsSku(Object.keys(cartItems).map((sku) => {
        return parseInt(sku);
      }))
    }
  }, [cartItems])

  return (
    cartItemsCount > 0 ? <CartStyle>
      <div className="products">
        <h1>My Cart ({cartItemsCount})</h1>

        <CartProducts 
          cartItemsSku={cartItemsSku}
          preparePriceDetails={preparePriceDetails}
        />

        <div className="continue-shopping">
          <Link href="/">
            <a>Continue Shopping</a>
          </Link>
        </div>
      </div>
      <div className="summary">
        <div className="summary-inner">
          <div className="details-heading">Price details</div>
          {
            cartPriceDetails && <ul className="details">
              <li className="price">
                <span className="label">Price ({cartItemsCount} items)</span>
                <span className="value">{cartPriceDetails.subTotal.toFixed(2)}</span>
              </li>
              {/* <li className="discount">
                <span className="label">Discount</span>
                <span className="value">0</span>
              </li> */}
              <li className="coupon-discount">
                {cartPriceDetails.coupon ? (
                  <>
                    <span className="label">
                      Coupon (<span className="green">{cartPriceDetails.coupon}</span>)
                      <button title="Remove Coupon" onClick={removeCouponCode}>x</button>
                    </span>
                    <span className="value">- {cartPriceDetails.couponDiscount.toFixed(2)}</span>
                  </>
                ) : (
                  <>
                    <div className="form">
                      <div className="fields">
                        <input type="text" value={couponCode} onChange={handleCouponCodeChange} name="" id="" placeholder="Enter Coupon Code" />
                        <button onClick={applyCoupon} disabled={couponError !== '' || couponCode == ''}>Apply Coupon</button>
                      </div>
                      <div className="error">
                        {couponError}
                      </div>
                    </div>
                    
                  </>
                )}
              </li>
              <li className="delivery-charge">
                <span className="label">Delivery Charge</span>
                <span className="value">Free</span>
              </li>
              <li className="total">
                <span className="label">Total Amount</span>
                <span className="value">{cartPriceDetails.total.toFixed(2)}</span>
              </li>
              <li className="button">
                <Link href="/checkout">
                  <a>Place Order</a>
                </Link>
              </li>
            </ul>
          }
        </div>
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