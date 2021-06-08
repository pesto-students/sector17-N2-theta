import dynamic from 'next/dynamic'

const CartItemsCount = dynamic(() => import('../../Utils/CartItemsCount'), {
  ssr: false
});

const MiniCart = (props) => {
  const { dropMenu, handleDropMenu} = props;
  
  const handleClick = () => {
    handleDropMenu(dropMenu === 'minicart' ? '' : 'minicart');
  }

  return <div className="header__action-item mini-cart">
    <div className="clickable" onClick={handleClick}>
      <span className="icon">
        <i className="fa fa-shopping-bag"/>
        <CartItemsCount />
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