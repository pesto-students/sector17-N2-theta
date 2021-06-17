import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import Address from "../../shared/Components/Address";
import Cart from "../Cart";
import ShippingMethods from "./ShippingMethods";
import CheckoutStyle from "./Style";

const Checkout = () => {
  const router = useRouter();
  const { cartPriceDetails, cartItemSellers } = useContext(GlobalContext);
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

  useEffect(() => {
    if (cartPriceDetails && cartPriceDetails.total === 0) {
      router.push("/cart");
    }
  }, [cartPriceDetails])

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
