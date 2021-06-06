import Root from "../shared/Root";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalContextProvider } from "context/GlobalContext";
import { useEffect, useState } from "react";
import Notification from "shared/Components/Notification";

const MyApp = ({ Component, pageProps }) => {
  const [cartItems, setCartItems] = useState();
  const [wishlistItems, setWishlistItems] = useState();
  const [notificationVisibility, setNotificationVisibility] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const contextData = {
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
    setNotificationMessage,
    setNotificationVisibility
  }

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
  )
}

export default MyApp;
