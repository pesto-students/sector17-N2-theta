import GlobalContext from "@/appContext";
import { useContext, useEffect, useState } from "react";
import Address from "shared/Components/Address";
import Grid from "shared/Styles/Grid";
import ProfileSidebar from "../../shared/Components/ProfileSidebar";
import MyAccountStyle from "./Style";

const MyAccount = () => {
  const [isEdit, setIsEdit] = useState(false);
  const {
    isLogin,
    currentUser: user,
    setWishlistItems,
  } = useContext(GlobalContext);

  useEffect(()=>{
  },[isLogin]);

  const onClickHandler = () => {
    isLogin ? setIsEdit(true) : setIsEdit(false);
  }
  return (
    <MyAccountStyle>
      {!!user && (
        <div className="row_group">
          <ProfileSidebar />
          <div className="dashboard">
            <Address isEdit={isEdit} onClick={onClickHandler} />
          </div>
        </div>
      )}
    </MyAccountStyle>
  );
};

export default MyAccount;
