import SocialLogin from "../SocialLogin";
import { fbAuth } from "@/auth";
import { useContext, useState } from "react";
import GlobalContext from "@/appContext";
import UserStyle from "./Style";

const User = (props) => {
  const { dropMenu, handleDropMenu } = props;
  const { isLogin, currentUser: user } = useContext(GlobalContext);

  const handleClick = () => {
    handleDropMenu(dropMenu === "user" ? "" : "user");
  };

  return (
    <UserStyle>
      <div className="header__action-item user">
        <div className="clickable" onClick={handleClick}>
          {isLogin ? (
            <span className="profile_pic">
              <img src={user.photoURL} />
            </span>
          ) : (
            <span className="icon">
              <i className="fa fa-user" />
            </span>
          )}

          <span className="label"> {isLogin ? "My Account" : "Login"}</span>
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
    </UserStyle>
  );
};

export default User;
