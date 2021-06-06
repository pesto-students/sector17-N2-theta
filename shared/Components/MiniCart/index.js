import Link from "next/link";

const { default: ItemsCount } = require("./ItemsCount");

const MiniCart = (props) => {
  const { dropMenu, handleDropMenu } = props;

  const handleClick = () => {
    handleDropMenu(dropMenu === "minicart" ? "" : "minicart");
  };

  return (
    <div className='header__action-item mini-cart'>
      <Link href="/cart">
        <div className='clickable'>
              <span className='icon'>
                <i className='fa fa-shopping-bag' />
                <ItemsCount />
              </span>
              <span className='label'>Bag</span>
        </div>
      </Link>
      {dropMenu === "minicart" && (
        <div className='header__dropmenu'>
          <ul>
            <li>My Profile</li>
            <li>Orders</li>
            <li>Wishlist</li>
            <li>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
