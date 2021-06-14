import CartProductCardStyle from "./Style";
import Link from "next/link";
import { RemoveCartItemButton } from "../../Utils/RemoveCartItem";
import { MoveToWishlistButton } from "shared/Utils/MoveToWishlist";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "context/GlobalContext";
import Quantity from "../Quantity";
import { updateCart } from "shared/Utils/AddToCart";
import saveCartItems from "shared/Utils/saveCartItems";

const CartProductCard = (props) => {
  const { name, sku, price, image, manufacturer, model, quantity, category, setQtyUpdate } = props;

  const { 
    currentUser,
    wishlistItems, 
    setWishlistItems,
    setCartItems,
    setNotificationMessage,
    setNotificationVisibility
  } = useContext(GlobalContext);

  const [qty, setQty] = useState(quantity);

  const updateProductQuantity = async () => {
    if(sku){
      const updatedCartItems = await updateCart(sku, qty, currentUser);
      setCartItems(updatedCartItems);
      saveCartItems(updatedCartItems, currentUser ? currentUser.uid : null);
      setNotificationVisibility(true);
      setNotificationMessage("Quantity update successfully");
    }
  }

  useEffect(() => {
    updateProductQuantity();
  }, [qty])

  return <CartProductCardStyle>
    <div className="image-wrapper">
      <Link href={`/categories/${category}/${sku}`}>
        <a>
          <img src={image} alt={name} />
        </a>
      </Link>
    </div>
    <div className="details-wrapper">
      <div className="name">
        <Link href={`/categories/${category}/${sku}`}>
          <a>{ name }</a>
        </Link>
      </div>
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
        <span className="main-price">Rs.{ (price * qty).toFixed(2) }</span>
        {/*<span className="strike-off-price">Rs. 2,399</span>
        <span className="discount">(62% OFF)</span>*/}
      </div>
      
      <Quantity onQtyUpdate={setQty} quantity={qty} from="cart" sku={sku} setQtyUpdate={setQtyUpdate}/>

      <div className="actions">
        {
          wishlistItems && wishlistItems.indexOf(sku) < 0 ? (
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