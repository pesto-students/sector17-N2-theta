import { useEffect, useState } from "react";
import fbAuth from "../auth";

const fbAuthObj = fbAuth();

const useLoginStatus = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const setAuthState = (user) => {
    setUser(user);
    setIsLogin(!!user);
  };

  useEffect(() => {
    const removeAuthEvent = fbAuthObj.onAuthStateChanged(setAuthState);
    setAuthState(fbAuthObj.currentUser);

    return () => removeAuthEvent();
  }, []);

  return { user, isLogin };
};

export default useLoginStatus;
