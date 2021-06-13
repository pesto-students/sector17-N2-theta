import Root from "../shared/Root";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalContextProvider } from "context/GlobalContext";
import { useLoginStatus } from "@/auth";
import { useEffect, useState } from "react";
import Notification from "shared/Components/Notification";


const MyApp = ({ Component, pageProps }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { isLogin, user } = useLoginStatus();
  const [cartItems, setCartItems] = useState();
  const [wishlistItems, setWishlistItems] = useState();
  const [notificationVisibility, setNotificationVisibility] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [cartPriceDetails, setCartPriceDetails] = useState({
    subTotal : 0,
    discount : 0,
    couponDiscount : 0,
    total : 0
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const contextData = {
    cartPriceDetails,
    setCartPriceDetails,
    cartItemsCount,
    setCartItemsCount,
    isLogin,
    currentUser: user,
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
    setNotificationMessage,
    setNotificationVisibility
  };

  useEffect(() => {
    if(notificationMessage !== ''){
      let timer1 = setTimeout(() => setNotificationVisibility(false), 3000);
      let timer2 = setTimeout(() => setNotificationMessage(""), 5000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      }
    }
  }, [notificationMessage, notificationVisibility])

  return (
    <GlobalContextProvider value={contextData}>
          <QueryClientProvider client={queryClient}>
            <Root>
              <Component {...pageProps} />
            </Root>
          </QueryClientProvider>

          <Notification 
            visible={notificationVisibility}
            message={notificationMessage} 
            setNotificationVisibility={setNotificationVisibility}
          />
    </GlobalContextProvider>
  );
};

export default MyApp;
