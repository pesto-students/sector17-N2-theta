import { useEffect, useState } from "react";
import fbAuth from "../auth";

const useLoginStatus = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const removeAuthEvent = fbAuth().onAuthStateChanged((user) => {
      setUser(user);
      setIsLogin(!!user);
    });

    return () => removeAuthEvent();
  }, []);

  return { user, isLogin };
};

export default useLoginStatus;
