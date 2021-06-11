import CartProductCardStyle from "./Style";
import { RemoveCartItemButton } from "../../Utils/RemoveCartItem";
import { MoveToWishlistButton } from "shared/Utils/MoveToWishlist";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "context/GlobalContext";
import Quantity from "../Quantity";
import { updateCart } from "shared/Utils/AddToCart";
import saveCartItems from "shared/Utils/saveCartItems";

const CartProductCard = (props) => {
  const { name, sku, price, image, manufacturer, model, quantity } = props;
  const { 
    wishlistItems,
    setCartItems,
    setNotificationMessage,
    setNotificationVisibility
  } = useContext(GlobalContext);
  const [qty, setQty] = useState(quantity);

  const updateProductQuantity = async () => {
    const updatedCartItems = await updateCart(sku, qty);

    setCartItems(updatedCartItems);
    saveCartItems(updatedCartItems);
    setNotificationVisibility(true);
    setNotificationMessage("Quantity update successfully");
  }

  useEffect(() => {
    updateProductQuantity();
  }, [qty])

  return <CartProductCardStyle>
    <div className="image-wrapper">
      <img src={image} alt={name} />
    </div>
    <div className="details-wrapper">
      <div className="name">{ name }</div>
      <div className="details">
        <div>
          <span className="label">Sku:</span> 
          <span className="value">{ sku }</span>
        </div>
        <div>
          <span className="label">Manufacturer:</span> 
          <span className="value">{ manufacturer }</span>
        </div>
        <div>
          <span className="label">Model:</span> 
          <span className="value">{ model }</span>
        </div>
      </div>
      <div className="price">
        <span className="main-price">Rs. { price*qty }</span>
        {/*<span className="strike-off-price">Rs. 2,399</span>
        <span className="discount">(62% OFF)</span>*/}
      </div>
      
      <Quantity onQtyUpdate={setQty} quantity={qty} from="cart" sku={sku}/>

      <div className="actions">
        {
          wishlistItems.indexOf(sku) < 0 ? (
            <>
              <MoveToWishlistButton productSku={sku} />
              <span> | </span>
            </>
          ) : null
        }
        
        <RemoveCartItemButton productSku={sku} />
      </div>
    </div>
      
  </CartProductCardStyle>
}

export default CartProductCard;