import addCollectionToDb from '@/data/firestore/cart';
import GlobalContext from '@/appContext';
import { useContext, useState, useEffect } from 'react';

const getRecentlyViewedIProduct = productSku => {
  let viewedProducts = localStorage.getItem('recentViewed');
  viewedProducts = viewedProducts
    ? JSON.parse(viewedProducts).filter(product => product !== productSku)
    : [];

  return viewedProducts;
};

const AddToRecentlyViewed = ({ productSku }) => {
  const [loggedUserId, setLoggedUserId] = useState("");
  const { user, isLogin, wishlistItems } = useContext(GlobalContext);

  useEffect(() => {
    if (user) {
      setLoggedUserId(user.uid);
    }
  }, [user]);

  if (productSku) {
    const prevViewedProduct = getRecentlyViewedIProduct(productSku);
    prevViewedProduct.push(productSku);

    const currentViewedProducts = JSON.stringify(prevViewedProduct);
    localStorage.setItem('recentViewed', currentViewedProducts);
    if (loggedUserId) {
      addCollectionToDb({
        collection: 'recentViewed',
        userId: loggedUserId,
        data: JSON.stringify(currentViewedProducts)
      });
    }
  }

  return <></>;
};

export default AddToRecentlyViewed;
