import { useContext } from "react";
import GlobalContext from "@/appContext";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { fbAuth } from "@/auth";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    fbAuth.EmailAuthProvider.PROVIDER_ID,
    fbAuth.GoogleAuthProvider.PROVIDER_ID,
    fbAuth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

const fbAuthObj = fbAuth();

const SocialLogin = () => {
  const { isLogin, currentUser: user } = useContext(GlobalContext);

  if (isLogin && !!user) {
    return (
      <li style={{ textAlign: "center" }}>
        Welcome {user.displayName || user.email}
      </li>
    );
  }

  return (
    <li>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fbAuthObj} />
    </li>
  );
};

export default SocialLogin;
