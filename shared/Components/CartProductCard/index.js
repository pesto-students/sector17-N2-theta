import CartProductCardStyle from "./Style";
import { RemoveCartItemButton } from "../../Utils/RemoveCartItem";
import { MoveToWishlistButton } from "shared/Utils/MoveToWishlist";
import { useContext } from "react";
import GlobalContext from "context/GlobalContext";

const CartProductCard = (props) => {
  const { name, sku, price, image, manufacturer, model } = props;
  const { wishlistItems } = useContext(GlobalContext);

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
        <span className="main-price">Rs. { price }</span>
        {/*<span className="strike-off-price">Rs. 2,399</span>
        <span className="discount">(62% OFF)</span>*/}
      </div>
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