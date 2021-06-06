import GlobalContext from "context/GlobalContext";
import { useContext } from "react";
import { handleWishlistItems } from "./AddToWishlist";
import RemoveCartItem from "./RemoveCartItem";

const moveToWishlist = (productSku) => {
  const cartItems = RemoveCartItem(productSku)
  const wishlistItems = handleWishlistItems(productSku);
  
  return {
    cartItems,
    wishlistItems
  }
}

const MoveToWishlistButton = (props) => {
  const { productSku } = props;
  const { setWishlistItems, setCartItems, setNotificationMessage, setNotificationVisibility } = useContext(GlobalContext);

  const handleClick = async () => {
    const { cartItems, wishlistItems } = await moveToWishlist(productSku);

    setCartItems(cartItems);
    setWishlistItems(wishlistItems);
    setNotificationVisibility(true);
    setNotificationMessage('Successfully Removed from Cart and Added to Wishlist');
  }

  return <button className="move-to-wishlist" onClick={handleClick}>
    Move to Wishllist
  </button>
}


export default moveToWishlist;
export { MoveToWishlistButton };