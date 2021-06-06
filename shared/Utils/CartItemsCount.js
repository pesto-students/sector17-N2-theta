import { useContext, useEffect } from "react";
import GlobalContext from "context/GlobalContext"

const CartItemsCount = () => {
  const { cartItemsCount, setCartItemsCount } = useContext(GlobalContext);

  const getCartItemsCount = () => {
    let ItemsInCart = localStorage.getItem('cartItem');
    return ItemsInCart 
      ? Object.keys(
          JSON.parse(ItemsInCart)
        ).length
      : 0;
  }

  useEffect(() => {
    const itemsCount = getCartItemsCount();
    setCartItemsCount(itemsCount);
  }, []);

  return <span className="count">
    { cartItemsCount }
  </span>
}

export default CartItemsCount;