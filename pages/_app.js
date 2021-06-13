import Root from "../shared/Root";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalContextProvider } from "context/GlobalContext";
import { useLoginStatus } from "@/auth";
import { useEffect, useState } from "react";
import Notification from "shared/Components/Notification";
import getCartItems from "shared/Utils/getCartItems";
import firebase from "../data/firebase";
import "firebase/firestore";
import saveCartItems from "shared/Utils/saveCartItems";
import getWishlistItems from "shared/Utils/getWishlistItems";

const db = firebase.firestore();

const deleteCollectionFromDb = async ({ collection, userId}) => {
  await db.collection(collection).doc(userId).delete();
  return;
}

const MyApp = ({ Component, pageProps }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { isLogin, user } = useLoginStatus();
  const [currentUser, setCurrentUser] = useState(user);
  const [cartItems, setCartItems] = useState();
  const [wishlistItems, setWishlistItems] = useState(null);
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

  const handleCartItems = async (items, sessionId, user) => {
    if(sessionId){
      const localItems = await getCartItems(sessionId);
      const cartItems = {
        ...items,
        ...localItems
      }
      setCartItems(cartItems);
      saveCartItems(cartItems, user.uid);
      
      sessionStorage.removeItem('_s17');

      deleteCollectionFromDb({
        collection : 'carts',
        userId : sessionId
      })
    }else{
      setCartItems(items);
    }
  }

  const handleWishlistData = async (userId) => {
    const items = await getWishlistItems(userId);
    
    console.log('items items  items items items  itemsitems items items items');
    console.log(items);
    
    setWishlistItems(items);
  }

  const contextData = {
    cartPriceDetails,
    setCartPriceDetails,
    cartItemsCount,
    setCartItemsCount,
    isLogin,
    currentUser,
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
    setNotificationMessage,
    setNotificationVisibility
  };

  useEffect(async () => {
    let sessionId = sessionStorage.getItem('_s17');

    if(user){
      const items = await getCartItems(user.uid);

      handleCartItems(items, sessionId, user);
      handleWishlistData(user.uid);

      setCurrentUser({
        ...user
      })
    }else{
      if(!isLogin){
        if(!sessionId){
          sessionId = '_' + Math.random().toString(36).substr(2, 9);
          sessionStorage.setItem('_s17', sessionId);
        }
        
        const items = await getCartItems(sessionId);
        setCartItems(items);

        setCurrentUser({
          uid : sessionId
        })
      }
    }
  }, [isLogin, user])

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
              {
                isLogin 
                  ? <Component {...pageProps} />
                  : <Component {...pageProps} />
              }
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
