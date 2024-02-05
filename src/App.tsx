import React, { useEffect, useState } from "react";
import Router from "components/Router";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "components/layout/Loading";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserAdminState, currentUserObj } from "recoil/user";
import { RecoilEnv } from "recoil";
import { themeState } from "recoil/theme";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

function App() {
  const auth = getAuth(app);
  const [initialAuthPass, setInitialAuthPass] = useState<boolean>(false);
  const setIsUserAdmin = useSetRecoilState(isUserAdminState);
  const setUser = useSetRecoilState(currentUserObj);
  const theme = useRecoilValue(themeState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsUserAdmin(user?.uid === process.env.REACT_APP_ADMIN_UID);
      setInitialAuthPass(true);
    });
  }, [auth]);

  return (
    <div className={theme === "light" ? "white" : "dark"}>
      <ToastContainer autoClose={500} hideProgressBar newestOnTop />
      {initialAuthPass ? <Router /> : <Loading />}
    </div>
  );
}

export default App;
