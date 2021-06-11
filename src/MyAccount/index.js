import GlobalContext from "@/appContext";
import { getAddress } from "@/data/firestore/address";
import useAddress from "@/data/hooks/use-address";
import { useContext, useEffect, useState } from "react";
import Address from "shared/Components/Address";
import Grid from "shared/Styles/Grid";
import ProfileSidebar from "../../shared/Components/ProfileSidebar";
import MyAccountStyle from "./Style";

const MyAccount = () => {
  const [isEdit, setIsEdit] = useState(true);
  const [address, setAddress] = useState([]);
  const [userId, setUserId] = useState();
  const {
    isLogin,
    currentUser: user,
    setWishlistItems,
  } = useContext(GlobalContext);

  const { isLoading, data: userAddress } = useAddress(userId);

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
      setAddress(userAddress);
    }
    console.log(userId);
  }, [address]);

  const onClickHandler = () => {
    isLogin ? setIsEdit(true) : setIsEdit(false);
  };
  return (
    <MyAccountStyle>
      {!!user && (
        <div className="row_group">
          <ProfileSidebar />
          <div className="dashboard">
            {!isLoading && console.log(address)}
            <Address isEdit={isEdit} onClick={onClickHandler} user={user} />
          </div>
        </div>
      )}
    </MyAccountStyle>
  );
};

export default MyAccount;
