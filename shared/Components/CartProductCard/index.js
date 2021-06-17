import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { MoveToWishlistButton } from "../../Utils/MoveToWishlist";
import GlobalContext from "../../../context/GlobalContext";
import { updateCart } from "../../Utils/AddToCart";
import saveCartItems from "../../Utils/saveCartItems";
import Quantity from "../Quantity";
import { RemoveCartItemButton } from "../../Utils/RemoveCartItem";
import CartProductCardStyle from "./Style";

const CartProductCard = (props) => {
  const router = useRouter();
  const {
    name,
    sku,
    price,
    image,
    manufacturer,
    model,
    quantity,
    category,
    setQtyUpdate,
  } = props;

  const {
    currentUser,
    wishlistItems,
    setCartItems,
    setNotificationMessage,
    setNotificationVisibility,
  } = useContext(GlobalContext);

  const [qty, setQty] = useState(quantity);

  

  useEffect(() => {
    const updateProductQuantity = async () => {
      if (sku) {
        const updatedCartItems = await updateCart(sku, qty, currentUser);
        setCartItems(updatedCartItems);
        saveCartItems(updatedCartItems, currentUser ? currentUser.uid : null);
        setNotificationVisibility(true);
        setNotificationMessage("Quantity update successfully");
      }
    };
    updateProductQuantity();
  }, [qty, currentUser, setCartItems, setNotificationMessage, setNotificationVisibility, sku]);

  return (
    <CartProductCardStyle>
      <div className='image-wrapper'>
        <Link href={`/categories/${category}/${sku}`}>
          <a>
            <img src={image} alt={name} />
          </a>
        </Link>
      </div>
      <div className='details-wrapper'>
        {router.asPath !== "/checkout" ? (
          <>
            <div className='name'>
              <Link href={`/categories/${category}/${sku}`}>
                <a>{name}</a>
              </Link>
            </div>
            <div className='details'>
              <div>
                <span className='label'>Sku:</span>
                <span className='value'>{sku}</span>
              </div>
              <div>
                <span className='label'>Manufacturer:</span>
                <span className='value'>{manufacturer}</span>
              </div>
              <div>
                <span className='label'>Model:</span>
                <span className='value'>{model}</span>
              </div>
            </div>
          </>
        ) : (
          <div className='name'>
            {name}
          </div>
        )}
        
        <div className='price'>
          <span className='main-price'>Rs.{(price * qty).toFixed(2)}</span>
        </div>

        {router.asPath !== "/checkout" && (
          <>
            <Quantity
              onQtyUpdate={setQty}
              quantity={qty}
              from='cart'
              sku={sku}
              setQtyUpdate={setQtyUpdate}
            />

            <div className='actions'>
              {wishlistItems && wishlistItems.indexOf(sku) < 0 ? (
                <>
                  <MoveToWishlistButton productSku={sku} />
                  <span> | </span>
                </>
              ) : null}

              <RemoveCartItemButton productSku={sku} />
            </div>
          </>
        )}
      </div>
    </CartProductCardStyle>
  );
};

export default CartProductCard;
