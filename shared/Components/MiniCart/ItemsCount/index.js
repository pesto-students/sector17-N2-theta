import GlobalContext from "context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import getCartItems from "../../../Utils/getCartItems";

const ItemsCount = () => {
  const {currentUser, cartItems, setCartItems} = useContext(GlobalContext);
  const [count, setCount] = useState();

  useEffect(() => {
    if(cartItems){
      setCount(Object.keys(cartItems).length)
    }
  }, [cartItems])

  useEffect(() => {
    const itemsInCart = getCartItems(currentUser ? currentUser.uid : null);
    setCartItems(itemsInCart);
    setCount(Object.keys(itemsInCart).length)
  }, [])

  return (
    count > 0 && <span className='count'>{count}</span>
  )
}

export default ItemsCount;