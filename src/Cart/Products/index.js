import { useContext, useEffect, useState } from "react";
import { useProductsBySKU } from "../../../data";
import firebase from "../../../data/firebase";
import { getSellers } from "../../../data/firestore/sellers";
import CartProductCard from "../../../shared/Components/CartProductCard";
import GlobalContext from "../../../context/GlobalContext";

const CartProducts = (props) => {
  const { cartItems, setCartItemSellers } = useContext(GlobalContext);
  const {cartItemsSku, preparePriceDetails} = props;
  const dataLimit = 10;
  const [products, setProducts] = useState({});
  const [qtyUpdate, setQtyUpdate] = useState(false);
  
  const { data, status, isError } = useProductsBySKU(
    0,
    dataLimit,
    [...cartItemsSku]
  );

  const useSellersById = (offset = 0, limit = 10, id = []) => getSellers({
    offset,
    limit,
    orderBy: firebase.firestore.FieldPath.documentId(),
    id,
  })

  useEffect(() => {
    async function prepareSellers(){
      const sellers = [];
  
      Object.keys(cartItems).map((sku) => {
        const {seller} = data[sku];
        if(sellers.indexOf(seller) < 0){
          sellers.push(seller);
        }
      });
  
      const sellerData = await useSellersById(
        0,
        dataLimit,
        [...sellers]
      )
  
      setCartItemSellers(sellerData);
    }

    if(data){
      preparePriceDetails(data);
      prepareSellers();
    }
  }, [cartItems])

  useEffect(() => {
    if (status === "success") {
      setProducts({ ...data });
      preparePriceDetails(data);
    }
  }, [status]);

  if(!cartItems){ 
    return null; 
  }

  return (
    !isError && products && cartItems 
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