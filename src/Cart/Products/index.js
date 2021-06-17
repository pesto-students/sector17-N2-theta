import GlobalContext from "@/appContext";
import { useProductsBySKU } from "@/data";
import firebase from "@/data/firebase";
import { getSellers } from "@/data/firestore/sellers";
import { useContext, useEffect, useState } from "react";
import CartProductCard from "shared/Components/CartProductCard";


const useSellersById = (offset = 0, limit = 10, id = []) => getSellers({
    offset,
    limit,
    orderBy: firebase.firestore.FieldPath.documentId(),
    id,
  })

const CartProducts = (props) => {
  const { cartItems, setCartItemSellers } = useContext(GlobalContext);

  if(!cartItems){ return null; }

  const {cartItemsSku, preparePriceDetails} = props;
  const [dataLimit, setDataLimit] = useState(10);
  const [products, setProducts] = useState({});
  const [qtyUpdate, setQtyUpdate] = useState(false);
  
  const { data, status, isLoading, isError } = useProductsBySKU(
    0,
    dataLimit,
    [...cartItemsSku]
  );

  const prepareSellers = async () => {
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

  useEffect(async () => {
    if(data){
      preparePriceDetails(data);
      prepareSellers();
    }
  }, [cartItems, data, preparePriceDetails, prepareSellers])

  useEffect(() => {
    if (status === "success") {
      setProducts({ ...data });
      preparePriceDetails(data);
    }
  }, [data, preparePriceDetails, status]);

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