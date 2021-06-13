import GlobalContext from "@/appContext";
import { useRouter } from "next/router";
import { useContext } from "react";

const Checkout = () => {
  const router = useRouter();
  const { cartPriceDetails } = useContext(GlobalContext);

  if(cartPriceDetails && cartPriceDetails.total == 0){
    router.push('/cart');
  }

  return <div>Checkout</div>
}

export default Checkout;