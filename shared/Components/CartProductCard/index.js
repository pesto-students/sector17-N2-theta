import CartProductCardStyle from "./Style";
import { RemoveCartItemButton } from "../../Utils/RemoveCartItem";
import { MoveToWishlistButton } from "shared/Utils/MoveToWishlist";

const CartProductCard = (props) => {
  const { sku } = props;

  return <CartProductCardStyle>
    <div className="image-wrapper">
      <img src="" alt="" />
    </div>
    <div className="details-wrapper">
      <div className="name">Canon EOS 3000D DSLR Camera 1 Camera Body, 18 - 55 mm Lens, Battery, Canon EOS 3000D DSLR Camera 1 Camera Body, 18 - 55 mm Lens, Battery</div>
      <div className="details">
        <span className="label">Sku:</span> 
        <span className="value">{ sku }</span>
      </div>
      <div className="price">
        <span className="main-price">Rs. 911</span>
        <span className="strike-off-price">Rs. 2,399</span>
        <span className="discount">(62% OFF)</span>
      </div>
      <div className="actions">
        <MoveToWishlistButton productSku={sku} />
        <RemoveCartItemButton productSku={sku} />
      </div>
    </div>
      
  </CartProductCardStyle>
}

export default CartProductCard;