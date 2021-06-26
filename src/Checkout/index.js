import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import Address from "../../shared/Components/Address";
import Cart from "../Cart";
import ShippingMethods from "./ShippingMethods";
import CheckoutStyle from "./Style";

const Checkout = () => {
  const { cartProducts, cartItemSellers } = useContext(GlobalContext);
  const [validAddress, setValidAddress] = useState(false);
  const [pincode, setPincode] = useState();
  const [shippingEnabled, setShippingEnabled] = useState(false);
  const [summaryEnabled, setSummaryEnabled] = useState(false);

  useEffect(() => {
    if (validAddress) {
      setShippingEnabled(true);
    } else {
      setShippingEnabled(false);
    }
  }, [validAddress]);

  return (
    <CheckoutStyle>
      <Address setValidAddress={setValidAddress} setSummaryEnabled={setSummaryEnabled} setPincode={setPincode} />
      {cartItemSellers && (
        <ShippingMethods
          enabled={shippingEnabled}
          pincode={pincode}
          cartItemSellers={cartItemSellers}
          cartProducts={cartProducts}
          summaryEnabled={summaryEnabled}
          setSummaryEnabled={setSummaryEnabled}
        />
      )}
      
      <Cart showSummary={summaryEnabled}/>
    </CheckoutStyle>
  );
};

export default Checkout;
