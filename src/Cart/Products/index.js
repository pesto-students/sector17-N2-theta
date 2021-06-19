import { useContext, useState } from "react";
import CartProductCard from "../../../shared/Components/CartProductCard";
import GlobalContext from "../../../context/GlobalContext";

const CartProducts = (props) => {
  const { products } = props;
  const { cartItems } = useContext(GlobalContext);
  const [qtyUpdate, setQtyUpdate] = useState(false);
  
  if(!cartItems){ 
    return null; 
  }

  return (
    products && cartItems 
      ? Object.keys(cartItems).map((sku, index) => (
          products[sku] && <CartProductCard
            key={index}
            id={sku}
            {...products[sku]}
            quantity={cartItems[sku].qty}
            setQtyUpdate={setQtyUpdate}
          />
        ))
      : null
  )
}

export default CartProducts;