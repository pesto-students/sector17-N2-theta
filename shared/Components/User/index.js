import GlobalContext from "context/GlobalContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import getWishlistItems from "shared/Utils/getWishlistItems";
import SocialLogin from "../SocialLogin";
import { fbAuth } from "@/auth";
import UserStyle from "./Style";

const User = (props) => {
  const { dropMenu, handleDropMenu } = props;

  const { isLogin } = useContext(GlobalContext);

  const handleClick = () => {
    handleDropMenu(dropMenu === "user" ? "" : "user");
  };

  return (
    <UserStyle>
      <div className="header__action-item user">
        <div className="clickable" onClick={handleClick}>
          <span className="icon">
            <i className="fa fa-user" />
          </span>

          <span className="label"> {isLogin ? "My Account" : "Login"}</span>
        </div>
        {dropMenu === "user" && (
          <div className="header__dropmenu">
            <ul>
              <SocialLogin />
              {isLogin && (
                <>
                  <li>
                    <Link href="/profile"> My Profile</Link>
                  </li>
                  <li>
                    <Link href="/profile/orders">Orders</Link>
                  </li>
                  <li>
                    <Link href="/profile/wishlist"> Wishlist</Link>
                  </li>
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
