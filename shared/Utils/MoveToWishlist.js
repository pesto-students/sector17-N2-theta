import GlobalContext from "context/GlobalContext";
import { useContext } from "react";
import handleWishlistItems from "./AddToWishlist";
import RemoveCartItem from "./RemoveCartItem";

const moveToWishlist = (productSku, currentUser) => {
  const cartItems = RemoveCartItem(productSku, currentUser)
  const wishlistItems = handleWishlistItems(productSku, currentUser);
  
  return {
    cartItems,
    wishlistItems
  }
}

const MoveToWishlistButton = (props) => {
  const { productSku } = props;
  const { currentUser, setWishlistItems, setCartItems, setNotificationMessage, setNotificationVisibility } = useContext(GlobalContext);

  const handleClick = async () => {
    const { cartItems, wishlistItems } = await moveToWishlist(productSku, currentUser);

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