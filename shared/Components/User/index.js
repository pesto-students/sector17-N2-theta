import GlobalContext from "context/GlobalContext";
import { useContext, useEffect } from "react";
import getWishlistItems from "shared/Utils/getWishlistItems";
import SocialLogin from "../SocialLogin";

const User = (props) => {
  const { dropMenu, handleDropMenu} = props;
  const { setWishlistItems } = useContext(GlobalContext);

  const handleClick = () => {
    handleDropMenu(dropMenu === 'user' ? '' : 'user')
  }

  useEffect(() => {
    const currentWishlist = getWishlistItems();
    setWishlistItems(currentWishlist);
  }, [])

  return <div className="header__action-item user">
    <div className="clickable" onClick={handleClick}>
      <span className="icon">
        <i className="fa fa-user"/>
      </span>
      <span className="label">
        Login
      </span>
    </div>
    {
      dropMenu === 'user' &&  <div className="header__dropmenu">
        <SocialLogin />
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

export default User;