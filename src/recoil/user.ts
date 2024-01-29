import { getAuth } from "firebase/auth";
import { app } from "firebaseApp";
import { atom } from "recoil";

const auth = getAuth(app);

export const userAuthState = atom({
  key: "userAuthState",
  default: !!auth?.currentUser,
});

export const isUserAdminState = atom({
  key: "isUserAdminState",
  default: auth.currentUser?.uid === process.env.REACT_APP_ADMIN_UID,
});
