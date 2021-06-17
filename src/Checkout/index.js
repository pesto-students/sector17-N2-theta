import GlobalContext from "@/appContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Address from "shared/Components/Address";
import CheckoutStyle from "./Style";
import Cart from "../Cart";
import ShippingMethods from "./ShippingMethods";

const Checkout = () => {
  const router = useRouter();
  const { cartItems, cartPriceDetails, cartItemSellers } =
    useContext(GlobalContext);
  const [validAddress, setValidAddress] = useState(false);
  const [pincode, setPincode] = useState();
  const [shippingEnabled, setShippingEnabled] = useState(false);

  useEffect(() => {
    if (validAddress) {
      setShippingEnabled(true);
    } else {
      setShippingEnabled(false);
    }
  }, [validAddress]);

  if (cartPriceDetails && cartPriceDetails.total == 0) {
    // router.push("/cart");
  }

  return (
    <CheckoutStyle>
      <div style={{ textAlign: "center" }}>Login</div>
      <Address setValidAddress={setValidAddress} setPincode={setPincode} />
      {cartItemSellers && (
        <ShippingMethods
          enabled={shippingEnabled}
          pincode={pincode}
          cartItemSellers={cartItemSellers}
        />
      )}
      <Cart />
    </CheckoutStyle>
  );
};

export default Checkout;
