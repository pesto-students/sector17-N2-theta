import GlobalContext from "context/GlobalContext";
import { useContext } from "react";

const AddToWishlist = (props) => {
  const { productSku } = props;

  const {
    wishlistItems,
    setWishlistItems,
    setNotificationMessage,
    setNotificationVisibility,
  } = useContext(GlobalContext);

  const handleClick = () => {
    let message = "Successfully Added to Wishlist";

    const currentWishlistItems = [...wishlistItems];
    const itemIndex = currentWishlistItems.indexOf(productSku);
    if(itemIndex < 0){
      currentWishlistItems.push(productSku);
    }else{
      currentWishlistItems = currentWishlistItems.splice(itemIndex, 0);
      message = "Successfully Removed to Wishlist";
    }

    setWishlistItems(currentWishlistItems);
    setNotificationVisibility(true);
    setNotificationMessage(message);
  };

  return (
    <button className='add-to-Wishlist' onClick={handleClick}>
      {!wishlistItems || wishlistItems.indexOf(productSku) < 0 ? (
        <i class='fa fa-plus-o' aria-hidden='true'></i>
      ) : (
        <i class='fa fa-plus' aria-hidden='true'></i>
      )}
    </button>
  );
};

export default AddToWishlist;
