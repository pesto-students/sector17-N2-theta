import GlobalContext from "context/GlobalContext";
import { useContext, useEffect, useState } from "react";

const AddToCart = (props) => {
  const { children, productId, quantity } = props;
  const { setCartItemsCount } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  
  const getCartItems = () => {
    let ItemsInCart = localStorage.getItem('cartItem');
    return ItemsInCart ? JSON.parse(ItemsInCart) : {};
  }

  const setCartItems = (cartItems) => {
    localStorage.setItem('cartItem', cartItems);
  }

  const handleClick = async () => {
    setLoading(true);

    const cartItems = await getCartItems();
    const updatedCartItems = {
      ...cartItems,
      [productId] : { qty : quantity }
    }
    
    setCartItems(JSON.stringify(updatedCartItems));
    setCartItemsCount(Object.keys(updatedCartItems).length);
    setLoading(false);
  }

  return <button className="add-to-cart" onClick={handleClick}>
    { loading ? 'Adding...' :children }
  </button>
}

export default AddToCart;