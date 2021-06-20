import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import getWishlistItems from "./getWishlistItems";
import saveWishlistItems from "./saveWishlistItems";

const handleWishlistItems = async (productSku, currentUser) => {
  let action = '';
  let currentWishlistItems = await getWishlistItems(currentUser.uid);

  if(currentWishlistItems == null){
    currentWishlistItems = [productSku];
  }else{
    const itemIndex = currentWishlistItems.indexOf(productSku);
    if(itemIndex < 0){
      currentWishlistItems.push(productSku);
      action = 'add';
    }else{
      currentWishlistItems = currentWishlistItems.filter((item) => item !== productSku);
      action = 'remove';
    }
  }
  
  saveWishlistItems(currentWishlistItems, currentUser.uid);

  return {
    items : currentWishlistItems,
    action
  }
};

const AddToWishlistButton = (props) => {
  const { productSku } = props;

  const {
    currentUser,
    isLogin,
    wishlistItems,
    setWishlistItems,
    setNotificationMessage,
    setNotificationVisibility,
  } = useContext(GlobalContext);

  const handleClick = async () => {
    let message = "";

    if(!isLogin){
      setNotificationVisibility(true);
      setNotificationMessage("Login / Register to create a wishlist");
      return false;
    }

    const wishlist = await handleWishlistItems(productSku, currentUser);
    
    if(wishlist.action == 'add'){
      message = "Successfully Added to Wishlist";
    }else{
      message = "Successfully Removed to Wishlist";
    }

    setWishlistItems(wishlist.items);
    setNotificationVisibility(true);
    setNotificationMessage(message);
  };

  return (
    <button className='add-to-wishlist' onClick={handleClick}>
      {
        wishlistItems == null ? (
          <i className='fa fa-heart-o' aria-hidden='true' />
        ) : (
          wishlistItems && wishlistItems.indexOf(productSku) >= 0 ? (
            <i className='fa fa-heart' aria-hidden='true' />
          ) : (
            <i className='fa fa-heart-o' aria-hidden='true' />
          )
        )
      }
    </button>
  );
}

export default handleWishlistItems;
export { AddToWishlistButton };
