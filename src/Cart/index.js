import { useProductsBySKU } from "@/data";
import GlobalContext from "context/GlobalContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CartProductCard from "shared/Components/CartProductCard";
import CartStyle from "./Style";

const Cart = () => {
  const [dataLimit, setDataLimit] = useState(10);
  const [products, setProducts] = useState({});
  const { cartItems, setCartItems } = useContext(GlobalContext);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const carItemsSku = Object.keys(cartItems).map((sku) => {
    return parseInt(sku);
  })

  const { data, status, isLoading, isError } = useProductsBySKU(
    0,
    dataLimit,
    [...carItemsSku]
  );

  useEffect(() => {
    cartItems && setCartItemsCount(Object.keys(cartItems).length);
  }, [cartItems])
  
  useEffect(() => {
    if (status === "success") {
      setProducts({ ...products, ...data });
    }
  }, [status]);

  return (
    cartItemsCount > 0 ? <CartStyle>
      <div className="products">
        <h1>My Cart ({cartItemsCount})</h1>

        {!isError && Object.keys(cartItems).map((sku, index) => (
          <CartProductCard
            key={index}
            id={sku}
            {...products[sku]}
          />
        ))}

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