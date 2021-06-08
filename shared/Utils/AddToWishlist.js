import GlobalContext from "context/GlobalContext";
import { useContext } from "react";
import getWishlistItems from "./getWishlistItems";
import saveWishlistItems from "./saveWishlistItems";

const handleWishlistItems = (productSku) => {
  let action = '';
  let currentWishlistItems = getWishlistItems();
  const itemIndex = currentWishlistItems.indexOf(productSku);
  if(itemIndex < 0){
    currentWishlistItems.push(productSku);
    action = 'add';
  }else{
    currentWishlistItems = currentWishlistItems.filter((item) => item !== productSku);
    action = 'remove';
  }

  saveWishlistItems(currentWishlistItems);

  return {
    items : currentWishlistItems,
    action
  }
};

const AddToWishlistButton = (props) => {
  const { productSku } = props;

  const {
    wishlistItems,
    setWishlistItems,
    setNotificationMessage,
    setNotificationVisibility,
  } = useContext(GlobalContext);

  const handleClick = async () => {
    let message = "";

    const wishlist = await handleWishlistItems(productSku);
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
      {!wishlistItems || wishlistItems && wishlistItems.indexOf(productSku) < 0 ? (
        <i class='fa fa-heart-o' aria-hidden='true'></i>
      ) : (
        <i class='fa fa-heart' aria-hidden='true'></i>
      )}
    </button>
  );
}

export default handleWishlistItems;
export { AddToWishlistButton };
