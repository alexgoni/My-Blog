import React, { useEffect, useState } from "react";
import Router from "components/Router";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "components/layout/Loading";
import { useSetRecoilState } from "recoil";
import { userAuthState } from "recoil/user";

function App() {
  const auth = getAuth(app);
  const [initialAuthPass, setInitialAuthPass] = useState<boolean>(false);
  const setIsAuthenticated = useSetRecoilState(userAuthState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setInitialAuthPass(true);
    });
  }, [auth]);

  return (
    <>
      <ToastContainer />
      {initialAuthPass ? <Router /> : <Loading />}
    </>
  );
}

export default App;
