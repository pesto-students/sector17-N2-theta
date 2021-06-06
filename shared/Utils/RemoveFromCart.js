import GlobalContext from "context/GlobalContext";
import { useContext } from "react";
import getCartItems  from "./getCartItems";

const RemoveFromCart = (props) => {
  const { productSku } = props;
  const { setCartItems, setNotificationMessage, setNotificationVisibility } = useContext(GlobalContext);

  const handleClick = () => {
    const cartItems = getCartItems();
    delete cartItems[productSku];

    setCartItems(cartItems);
    setNotificationVisibility(true);
    setNotificationMessage('Successfully Removed from Cart');
  }

  return <button className="remove-from-cart" onClick={handleClick}>
    Remove
  </button>
}

export default RemoveFromCart;