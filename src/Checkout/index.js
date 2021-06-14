import GlobalContext from "@/appContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import Address from "shared/Components/Address";
import CheckoutStyle from './Style';

const Checkout = () => {
  const router = useRouter();
  const { cartPriceDetails, isLogin, currentUser:user } = useContext(GlobalContext);

  if (cartPriceDetails && cartPriceDetails.total == 0) {
    // router.push("/cart");
  }

  return (
    <CheckoutStyle>
      <div>{isLogin && <Address user={user} />}</div>
    </CheckoutStyle>
  );
};

export default Checkout;
