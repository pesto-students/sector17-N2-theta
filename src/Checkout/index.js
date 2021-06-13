import GlobalContext from "@/appContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import Address from "shared/Components/Address";

const Checkout = () => {
  const router = useRouter();
  const { cartPriceDetails, isLogin, currentUser } = useContext(GlobalContext);

  if (cartPriceDetails && cartPriceDetails.total == 0) {
    // router.push("/cart");
  }

  return (
    <div>{isLogin && <Address user={currentUser} />}</div>
  );
};

export default Checkout;
