import GlobalContext from "context/GlobalContext";
import { useContext } from "react";
import getCartItems  from "../getCartItems";
import saveCartItems from "../saveCartItems";

const removeCartItem = async (productSku, currentUser) => {
  const cartItems = await getCartItems(currentUser.uid);
  delete cartItems[productSku];

  saveCartItems(cartItems, currentUser.uid);
  return cartItems;
}

const RemoveCartItemButton = (props) => {
  const { productSku } = props;
  const { currentUser, setCartItems, setNotificationMessage, setNotificationVisibility } = useContext(GlobalContext);

  const handleClick = async () => {
    const cartItems = await removeCartItem(productSku, currentUser)

    setCartItems(cartItems);
    
    setNotificationVisibility(true);
    setNotificationMessage('Successfully Removed from Cart');
  }

  return <button className="remove-from-cart" onClick={handleClick}>
    Remove
  </button>
}

export default removeCartItem;
export { RemoveCartItemButton };