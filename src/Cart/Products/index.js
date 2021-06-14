import GlobalContext from "@/appContext";
import { useProductsBySKU } from "@/data";
import { useContext, useEffect, useState, useMemo } from "react";
import CartProductCard from "shared/Components/CartProductCard";

const CartProducts = (props) => {
  const { cartPriceDetails, setCartPriceDetails, cartItems } = useContext(GlobalContext);
  const {cartItemsSku, preparePriceDetails} = props;
  const [dataLimit, setDataLimit] = useState(10);
  const [products, setProducts] = useState({});
  const [qtyUpdate, setQtyUpdate] = useState(false);
  
  const { data, status, isLoading, isError } = useProductsBySKU(
    0,
    dataLimit,
    [...cartItemsSku]
  );

  useEffect(async () => {
    if(data){
      preparePriceDetails(data);
    }
  }, [cartItems])

  useEffect(() => {
    if (status === "success") {
      setProducts({ ...data });
      preparePriceDetails(data);
    }
  }, [status]);

  return (
    !isError && Object.keys(cartItems).map((sku, index) => (
      products[sku] && <CartProductCard
        key={index}
        id={sku}
        {...products[sku]}
        quantity={cartItems[sku].qty}
        setQtyUpdate={setQtyUpdate}
      />
    ))
  )
}

export default CartProducts;