import GlobalContext from "@/appContext";
import { useContext } from "react";
import Grid from "shared/Styles/Grid";
import ProfileSidebar from "../../shared/Components/ProfileSidebar";
import MyAccountStyle from "./Style";

const MyAccount = () => {
  const {
    isLogin,
    currentUser: user,
    setWishlistItems,
  } = useContext(GlobalContext);
  return (
    <MyAccountStyle>
      {!!user && (
        <div className="row_group">
          <ProfileSidebar />
          <div className="dashboard">
              {user.displayName || user.email}
          </div>
        </div>
      )}
    </MyAccountStyle>
  );
};

export default MyAccount;
