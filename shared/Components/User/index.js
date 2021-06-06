import SocialLogin from "../SocialLogin";
import { fbAuth } from "@/auth";
import { useContext } from "react";
import GlobalContext from "@/appContext";

const User = (props) => {
  const { dropMenu, handleDropMenu } = props;
  const { isLogin } = useContext(GlobalContext);

  const handleClick = () => {
    handleDropMenu(dropMenu === "user" ? "" : "user");
  };

  return (
    <div className="header__action-item user">
      <div className="clickable" onClick={handleClick}>
        <span className="icon">
          <i className="fa fa-user" />
        </span>
        <span className="label">Login</span>
      </div>
      {dropMenu === "user" && (
        <div className="header__dropmenu">
          <ul>
            <SocialLogin />
            {isLogin && (
              <>
                <li>My Profile</li>
                <li>Orders</li>
                <li>Wishlist</li>
                <li>
                  <a onClick={() => fbAuth().signOut()}>Logout</a>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default User;
