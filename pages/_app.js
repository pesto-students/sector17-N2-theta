import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useLoginStatus } from "../auth";
import { GlobalContextProvider } from "../context/GlobalContext";
import Root from "../shared/Root";
import Notification from "../shared/Components/Notification";
import getCartItems from "../shared/Utils/getCartItems";
import "firebase/firestore";
import saveCartItems from "../shared/Utils/saveCartItems";
import getWishlistItems from "../shared/Utils/getWishlistItems";
import firebase from "../data/firebase";
import Error from "../shared/Components/Error";
import { useRouter } from "next/router";

const db = firebase.firestore();

const deleteCollectionFromDb = async ({ collection, userId }) => {
  await db.collection(collection).doc(userId).delete();
};

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const { isLogin, user } = useLoginStatus();
  const [currentUser, setCurrentUser] = useState(user);
  const [cartItems, setCartItems] = useState();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartItemSellers, setCartItemSellers] = useState();
  const [cartPriceDetails, setCartPriceDetails] = useState({
    subTotal: 0,
    discount: 0,
    couponDiscount: 0,
    total: 0,
  });
  const [finalPriceToPay, setFinalPriceToPay] = useState();
  const [cartProducts, setCartProducts] = useState();

  const [wishlistItems, setWishlistItems] = useState(null);
  const [notificationVisibility, setNotificationVisibility] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [globalManufacturerFilter, setGlobalManufacturerFilter] = useState([]);
  const [globalPriceFilter, setGlobalPriceFilter] = useState([]);
  const [clearFilter, setClearFilter] = useState(false);
  const [userInfo, setUserInfo] = useState();
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const handleCartItems = async (items, sessionId, { uid }) => {
    if (sessionId) {
      const localItems = await getCartItems(sessionId);
      const tempCartItems = {
        ...items,
        ...localItems,
      };
      setCartItems(tempCartItems);
      saveCartItems(tempCartItems, uid);

      console.log('sdsdfsdfsdfsdf')

      localStorage.removeItem("_s17");

      deleteCollectionFromDb({
        collection: "carts",
        userId: sessionId,
      });
    } else {
      setCartItems(items);
    }
  };

  const handleWishlistData = async (userId) => {
    const items = await getWishlistItems(userId);
    setWishlistItems(items);
  };

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
    setNotificationVisibility,
    globalManufacturerFilter,
    globalPriceFilter,
    setGlobalManufacturerFilter,
    setGlobalPriceFilter,
    clearFilter,
    setClearFilter,
    cartItemSellers, 
    setCartItemSellers,
    cartProducts, 
    setCartProducts,
    finalPriceToPay, 
    setFinalPriceToPay,
    userInfo,
    setUserInfo,
  };

  useEffect(async () => {
    let sessionId = localStorage.getItem('_s17');
    
    if(isLogin){
      if(router.asPath.indexOf('/order-status') >= 0 && router.query.status === 'success'){
        await db.collection('carts').doc(user.uid).delete();
      }

      const items = await getCartItems(user.uid);

      handleCartItems(items, sessionId, user);
      handleWishlistData(user.uid);

      setCurrentUser({
        ...user
      })

    } else {
      if(!sessionId){
        sessionId = `_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('_s17', sessionId);
      }
      if(router.asPath.indexOf('/order-status') >= 0 && router.query.status === 'success'){
        await db.collection('carts').doc(sessionId).delete();
      }
      
      const items = await getCartItems(sessionId);
      setCartItems(items);

      setCurrentUser({
        uid : sessionId
      });
    }
  }, [isLogin])

  useEffect(() => {
    if (notificationMessage !== "") {
      const timer1 = setTimeout(() => setNotificationVisibility(false), 3000);
      const timer2 = setTimeout(() => setNotificationMessage(""), 5000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
    return false;
  }, [notificationMessage, notificationVisibility]);

  return (
    <Error>
      <GlobalContextProvider value={contextData}>
        <QueryClientProvider client={queryClient}>
          <Root>
            {isLogin ? (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Component {...pageProps} />
            ) : (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Component {...pageProps} />
            )}
          </Root>
        </QueryClientProvider>
        <Notification
          visible={notificationVisibility}
          message={notificationMessage}
          setNotificationVisibility={setNotificationVisibility}
        />
      </GlobalContextProvider>
    </Error>
  );
};

export default MyApp;
