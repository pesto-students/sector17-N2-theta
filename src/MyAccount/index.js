import GlobalContext from "@/appContext";
import { getAddress } from "@/data/firestore/address";
import useAddress from "@/data/hooks/use-address";
import { useContext, useEffect, useState } from "react";
import Address from "shared/Components/Address";
import Grid from "shared/Styles/Grid";
import ProfileSidebar from "../../shared/Components/ProfileSidebar";
import MyAccountStyle from "./Style";

const MyAccount = () => {
  const {
    isLogin,
    currentUser: user,
    setWishlistItems,
  } = useContext(GlobalContext);

  const onClickHandler = () => {
    setIsEdit(!!isLogin);
  };
  return (
    <MyAccountStyle>
      {!!user && (
        <div className="row_group">
          <ProfileSidebar />
          <div className="dashboard">
            {isLogin && <Address onClick={onClickHandler} user={user} />}
          </div>
        </div>
      )}
    </MyAccountStyle>
  );
};

export default MyAccount;
