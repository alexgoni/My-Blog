import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { currentUserObj, isUserAdminState } from "recoil/user";

export default function CheckingAuth() {
  const auth = getAuth(app);

  const initialAuthPass = IsInitialAuthPass(auth);
  CheckIsUserAdmin(auth);

  return { initialAuthPass };
}

function IsInitialAuthPass(auth: Auth): boolean {
  const [initialAuthPass, setInitialAuthPass] = useState<boolean>(false);
  const setUser = useSetRecoilState(currentUserObj);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitialAuthPass(true);
    });
  }, [auth]);

  return initialAuthPass;
}

function CheckIsUserAdmin(auth: Auth) {
  const setIsUserAdmin = useSetRecoilState(isUserAdminState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsUserAdmin(user?.uid === process.env.REACT_APP_ADMIN_UID);
    });
  }, [auth]);
}
