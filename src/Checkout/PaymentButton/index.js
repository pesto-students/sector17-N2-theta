import GlobalContext from "@/appContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useContext, useState } from "react";

const stripePromise = loadStripe("pk_test_FOxPmF0nPWOJClYBlZ3d688y");

export default function PaymentButton({ctx}) {
  const { finalPriceToPay, cartItems, userInfo, currentUser } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = async (event) => {
    // Get Stripe.js instance 
    setLoading(true);
    setError(false);
    const stripe = await stripePromise;
    const quantities = {};

    Object.keys(cartItems).map((sku) => {
      quantities[sku] = cartItems[sku].qty;
    })

    const options = {
      orderTotal: finalPriceToPay.toFixed(2),
      quantities: {...quantities},
      pincode: userInfo.pincode,
      email: userInfo.email,
      uid: currentUser.uid
    }

    const coupon = localStorage.getItem('coupon');
    if(coupon){
      options.coupon = coupon;
    }

    // Call your backend to create the Checkout Session 
    const response = await axios.post(
      "https://asia-south1-sector17-chandigarh.cloudfunctions.net/sector17/orders",
      {
        ...options
      }
    )
    
    const session = response.data;

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      console.log(result.error.message);
      setError(result.error.message);
    }

    setLoading(false);
  };

  return (
    <>
    {loading ? (
      <button role="link" disabled={loading} style={{background: '#999'}}>
         <i className="fa fa-spin fa-spinner"/> Authenticating
      </button>
    ) : (
      <button role="link" disabled={loading} onClick={handleClick}>
        Proceed to Payment
      </button>
    )}
    {error && <div style={{textAlign:'center', fontSize:'12px'}}>{ error }</div>}
    </>
  );
}
