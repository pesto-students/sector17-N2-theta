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
          
    localStorage.setItem("recentViewed", JSON.stringify(prevViewedProduct));
  }

  return <></>
};

export default AddToRecentlyViewed;
