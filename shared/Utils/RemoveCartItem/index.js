import GlobalContext from "context/GlobalContext";
import { useContext } from "react";
import getCartItems  from "../getCartItems";
import saveCartItems from "../saveCartItems";

const removeCartItem = async (productSku) => {
  const cartItems = getCartItems();
  delete cartItems[productSku];

  saveCartItems(cartItems);
  return cartItems;
}

const RemoveCartItemButton = (props) => {
  const { productSku } = props;
  const { setCartItems, setNotificationMessage, setNotificationVisibility } = useContext(GlobalContext);

  const handleClick = async () => {
    const cartItems = await removeCartItem(productSku)

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