import { useContext, useEffect } from "react";
import GlobalContext from "context/GlobalContext"

const MiniCart = (props) => {
  const { dropMenu, handleDropMenu} = props;
  const { cartItemsCount, setCartItemsCount } = useContext(GlobalContext);

  const handleClick = () => {
    handleDropMenu(dropMenu === 'minicart' ? '' : 'minicart');
  }

  const getCartItemsCount = () => {
    let ItemsInCart = localStorage.getItem('cartItem');
    return ItemsInCart 
      ? Object.keys(
          JSON.parse(ItemsInCart)
        ).length
      : 0;
  }

  useEffect(() => {
    const itemsCount = getCartItemsCount();
    setCartItemsCount(itemsCount);
  }, []);

  return <div className="header__action-item mini-cart">
    <div className="clickable" onClick={handleClick}>
      <span className="icon">
        <i className="fa fa-shopping-bag"/>
        <span className="count">{ cartItemsCount }</span>
      </span>
      <span className="label">
        Bag
      </span>
    </div>
    {
      dropMenu === 'minicart' &&  <div className="header__dropmenu">
        <ul>
          <li>My Profile</li>
          <li>Orders</li>
          <li>Wishlist</li>
          <li>Logout</li>
        </ul>
      </div>
    }
  </div>
}

export default MiniCart;