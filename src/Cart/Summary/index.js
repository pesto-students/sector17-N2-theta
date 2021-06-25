import GlobalContext from "@/appContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import PaymentButton from "../../Checkout/PaymentButton";

const CartSummary = (props) => {
  const router = useRouter();
  const { finalPriceToPay } = useContext(GlobalContext);
  
  const {
    cartPriceDetails,
    cartItemsCount,
    setCartPriceDetails
  } = props;

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [copyText, setCopyText] = useState('Copy');
  
  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
    setCouponError('');
  }

  const applyCoupon = () => {
    if(couponCode === ''){
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

  const handleCopyText = (copyText) => {
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    setCopyText('Copied');

    let timeout = '';
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setCopyText('Copy');
    }, 5000)
  }

  const copyCoupon = () => {
    const text = document.getElementById("couponCode");
    handleCopyText(text);
  }

  const couponCardNumber = () => {
    const text = document.getElementById("couponCardNumber");
    handleCopyText(text);
  }

  return (
    <div className='summary'>
      <div className='summary-inner'>
        <div className='details-heading'>Price details</div>
        {cartPriceDetails && (
          <ul className='details'>
            <li className='price'>
              <span className='label'>Price ({cartItemsCount} items)</span>
              <span className='value'>
                Rs. {cartPriceDetails.subTotal.toFixed(2)}
              </span>
            </li>
            <li className='coupon-discount'>
              {cartPriceDetails.coupon ? (
                <>
                  <span className='label'>
                    Coupon (
                    <span className='green'>{cartPriceDetails.coupon}</span>)
                    {router.asPath !== '/checkout' && <button
                      type='button'
                      title='Remove Coupon'
                      onClick={removeCouponCode}>
                      x
                    </button>}
                  </span>
                  <span className='value'>
                    - Rs. {cartPriceDetails.couponDiscount.toFixed(2)}
                  </span>
                </>
              ) : (
                router.asPath !== '/checkout' && <>
                  <div className='form'>
                    <div className='fields'>
                      <input
                        type='text'
                        value={couponCode}
                        onChange={handleCouponCodeChange}
                        name=''
                        id=''
                        placeholder='Enter Coupon Code'
                      />
                      <button
                        type='button'
                        onClick={applyCoupon}
                        disabled={couponError !== "" || couponCode === ""}>
                        Apply Coupon
                      </button>
                    </div>
                    <div style={{display: 'flex', fontSize: '12px'}}>
                      <input style={{position: 'absolute', pointerEvents:'none', opacity:'0'}} type="text" value="sector17" id="couponCode" />
                      <span>
                        <span style={{color: '#888888', paddingRight: '5px'}}>Use code:</span> sector17
                      </span> 
                      {
                        copyText !== 'Copied' 
                        ? <button style={{marginLeft: '10px', cursor: 'pointer', fontSize: '12px'}} onClick={copyCoupon}>{copyText}</button>
                        : <button style={{marginLeft: '10px', color:'#999', fontSize: '12px'}}>{copyText}</button>
                      }
                    </div>
                    <div className='error'>{couponError}</div>
                  </div>
                </>
              )}
            </li>

            {
              router.asPath === '/checkout' && cartPriceDetails.total !== finalPriceToPay && 
              <li className='coupon-discount'>
                  <span className='label green'>
                    Nebougherhood Discount
                  </span>
                  <span className='value'>
                    - Rs. {(cartPriceDetails.total - finalPriceToPay).toFixed(2)}
                  </span>
              </li>
            }

            <li className='delivery-charge'>
              <span className='label'>Delivery Charge</span>
              <span className='value'>Free</span>
            </li>
            
            <li className='total'>  
              <span className='label'>Total Amount</span>
              {
                router.asPath === '/checkout' && finalPriceToPay ? 
                  <span className='value'>Rs. {finalPriceToPay.toFixed(2)}</span>
                  : <span className='value'>Rs. {cartPriceDetails.total.toFixed(2)}</span>
              }
            </li>

            {router.asPath === '/checkout' ? (
              <>
                <li className='button payment'>
                  <PaymentButton />
                </li>
                <li>
                  <div style={{display: 'flex', fontSize: '12px', flexFlow: 'column'}}>
                    <input style={{position: 'absolute', pointerEvents:'none', opacity:'0'}} type="text" value="4111111111111111" id="couponCardNumber" />
                    <div>
                      <span>
                        <span style={{color: '#888888', paddingRight: '5px'}}>Card Number:</span> 4111111111111111
                      </span> 
                      {
                        copyText !== 'Copied' 
                        ? <button style={{marginLeft: '10px', cursor: 'pointer', fontSize: '12px'}} onClick={couponCardNumber}>{copyText}</button>
                        : <button style={{marginLeft: '10px', color:'#999', fontSize: '12px'}}>{copyText}</button>
                      }
                    </div>
                    <div>
                      <span style={{color: '#888888', paddingRight: '5px'}}>Expiry Date:</span> 12/22
                    </div>
                    <div>
                      <span style={{color: '#888888', paddingRight: '5px'}}>CVV:</span> 123
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <li className='button'>
                <Link href='/checkout'>
                  <a>Place Order</a>
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
