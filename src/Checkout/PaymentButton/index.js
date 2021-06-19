import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_FOxPmF0nPWOJClYBlZ3d688y");

export default function PaymentButton() {
  const handleClick = async (event) => {
    // Get Stripe.js instance 
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session 
    const response = await axios.post(
      "http://localhost:3001/sector17-chandigarh/asia-south1/sector17/orders/",
      {
        orderTotal: 250,
        quantities: {
          1003003: 2,
        },
        pincode: "143001",
        coupon: "hello",
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
