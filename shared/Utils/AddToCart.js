import GlobalContext from "../../context/GlobalContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import getCartItems from "./getCartItems";
import saveCartItems from "./saveCartItems";

const updateCart = async (productSku, quantity, currentUser) => {
  const cartItems = await getCartItems(currentUser ? currentUser.uid : null);

  const updatedCartItems = {
    ...cartItems,
    [productSku]: { qty: quantity },
  }

  return updatedCartItems;
}

const AddToCart = (props) => {
  const { children, productSku, quantity } = props;
  const router = useRouter();
  const {
    currentUser,
    cartItems,
    setCartItems,
    setNotificationMessage,
    setNotificationVisibility,
  } = useContext(GlobalContext);

  const handleClick = async () => {
    let message = "Successfully Added to Cart";

    if (cartItems && cartItems[productSku]) {
      if(cartItems[productSku].qty == quantity){
        router.push("/cart");
        return false;
      }else{
        message = "Cart Updated Successfully";
      }
    }

    if (!productSku) {
      console.error("Product SKU is not available.");
      return false;
    }

    const updatedCartItems = await updateCart(productSku, quantity, currentUser);

    setCartItems(updatedCartItems);
    saveCartItems(updatedCartItems, currentUser ? currentUser.uid : null);
    setNotificationVisibility(true);
    setNotificationMessage(message);
  };

  return (
    <button className='add-to-cart' onClick={handleClick}>
      {cartItems && cartItems[productSku] ? (
        cartItems[productSku].qty == quantity ? (
          <>
            <span className='text'>Go To Cart</span>
            <span className='plus'>
              <i className='fa fa-external-link' aria-hidden='true'></i>
            </span>
          </>
        ) : (
          <>
            <span className='text'>Update Cart</span>
            <span className='plus'>
              <i className='fa fa-plus' aria-hidden='true'></i>
            </span>
          </>
        )
      ) : (
        <>
          <span className='text'>Add to Cart</span>
          <span className='plus'>
            <i className='fa fa-plus' aria-hidden='true'></i>
          </span>
        </>
      )}
    </button>
  );
};

export default AddToCart;
export { updateCart };
