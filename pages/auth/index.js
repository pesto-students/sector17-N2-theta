import { useRouter } from "next/router";
import { useLoginStatus } from "@/auth";
import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { fbAuth } from "@/auth";
import Spinner from "shared/Components/Spinner";

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

const Auth = () => {
  const router = useRouter();
  const { isLogin } = useLoginStatus();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    isLogin && router.push("/");
    //isLogin && fbAuthObj.signOut();
  }, [isLogin]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isLogin) {
    return (
      <p style={{ textAlign: "center" }}>
        You are logged in, Redirecting to Home Page...
      </p>
    );
  }

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fbAuthObj} />;
};

export default Auth;
