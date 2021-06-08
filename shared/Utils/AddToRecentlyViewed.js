import addCollectionToDb from "@/data/firestore/cart";

const getRecentlyViewedIProduct = (productSku) => {
  let viewedProducts = localStorage.getItem("recentViewed");
  viewedProducts = viewedProducts
    ? JSON.parse(viewedProducts).filter((product) => product !== productSku)
    : [];

  return viewedProducts;
};

const AddToRecentlyViewed = ({productSku}) => {
  if(productSku){
    const prevViewedProduct = getRecentlyViewedIProduct(productSku);
          prevViewedProduct.push(productSku);
          
    const currentViewedProducts = JSON.stringify(prevViewedProduct)
    localStorage.setItem("recentViewed", currentViewedProducts);

    addCollectionToDb({ 
      collection : 'recentViewed', 
      userId : 'X1tDHanwBCb1I8e7iEgdFAVBZdX2', 
      cart : JSON.stringify(currentViewedProducts)
    })
  }

  return <></>
};

export default AddToRecentlyViewed;
