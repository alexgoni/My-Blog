import React, { useEffect, useState } from "react";
import Router from "components/Router";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "components/layout/Loading";
import { useSetRecoilState } from "recoil";
import { isUserAdminState, userInfoObj } from "recoil/user";
import { RecoilEnv } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

function App() {
  const auth = getAuth(app);
  const [initialAuthPass, setInitialAuthPass] = useState<boolean>(false);
  const setIsUserAdmin = useSetRecoilState(isUserAdminState);
  const setUser = useSetRecoilState(userInfoObj);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsUserAdmin(user?.uid === process.env.REACT_APP_ADMIN_UID);
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
