import GlobalContext from "@/appContext";
import { useContext } from "react";
import ProfileSidebar from "../../shared/Components/ProfileSidebar";
import WishlistStyle from "./Style";

const Wishlists = () => {
  const {
    isLogin,
    currentUser: user,
    setWishlistItems,
  } = useContext(GlobalContext);

  return (
    <WishlistStyle>
      {!!user && (
        <div className="row_group">
          <ProfileSidebar />
          <div className="dashboard">
            {isLogin && <div>Hello</div>}
          </div>
        </div>
      )}
    </WishlistStyle>
  );
};

export default Wishlists;
