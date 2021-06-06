import GlobalContext from "context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import getCartItems from "../../../Utils/getCartItems";
import saveCartItems from "../../../Utils/saveCartItems";

const ItemsCount = () => {
  const {cartItems, setCartItems} = useContext(GlobalContext);
  const [count, setCount] = useState();

  useEffect(() => {
    if(cartItems){
      saveCartItems(cartItems);
      setCount(Object.keys(cartItems).length)
    }
  }, [cartItems])

  useEffect(() => {
    const itemsInCart = getCartItems();
    setCartItems(itemsInCart);
    setCount(Object.keys(itemsInCart).length)
  }, [])

  return (
    count > 0 && <span className='count'>{count}</span>
  )
}

export default ItemsCount;