import GlobalContext from "@/appContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useContext } from "react";

const stripePromise = loadStripe("pk_test_FOxPmF0nPWOJClYBlZ3d688y");

export default function PaymentButton({ctx}) {
  const { finalPriceToPay, cartItems, userInfo } = useContext(GlobalContext);

  const handleClick = async (event) => {
    // Get Stripe.js instance 
    const stripe = await stripePromise;
    const quantities = {};

    Object.keys(cartItems).map((sku) => {
      quantities[sku] = cartItems[sku].qty;
    })

    const options = {
      orderTotal: finalPriceToPay,
      quantities: {...quantities},
      pincode: userInfo.pincode,
      email: userInfo.email
    }

    const coupon = localStorage.getItem('coupon');
    if(coupon){
      options.coupon = coupon;
    }

    // Call your backend to create the Checkout Session 
    const response = await axios.post(
      "https://asia-south1-sector17-chandigarh.cloudfunctions.net/sector17",
      {
        ...options
      }
    );
    
    const session = response.data;

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    console.log(result);

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <button role="link" onClick={handleClick}>
      Proceed to Payment
    </button>
  );
}
