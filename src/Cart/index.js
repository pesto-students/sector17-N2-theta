import GlobalContext from "context/GlobalContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CartProductCard from "shared/Components/CartProductCard";
import CartStyle from "./Style";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(GlobalContext);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    cartItems && setCartItemsCount(Object.keys(cartItems).length);
  }, [cartItems])

  return (
    cartItemsCount > 0 ? <CartStyle>
      <div className="products">
        <h1>My Cart ({cartItemsCount})</h1>

        {Object.keys(cartItems).map((item) => {
          return <CartProductCard sku={item} key={item} />
        })}

        <div className="continue-shopping">
          <Link href="/">
            <a>Continue Shopping</a>
          </Link>
        </div>
      </div>
      <div className="summary">
          order summary
      </div>
    </CartStyle> : <CartStyle emptyCart={true}>
      No Items in Your Cart
      <br />
      <Link href="/">
        <a>Explore Products</a>
      </Link>
    </CartStyle>
  )
}

export default Cart;