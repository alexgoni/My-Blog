import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { atom } from "recoil";

const auth = getAuth(app);

export type UserObjType = User | null;
export const currentUserObj = atom<UserObjType>({
  key: "currentUserObj",
  default: null,
  dangerouslyAllowMutability: true,
});

export const isUserAdminState = atom({
  key: "isUserAdminState",
  default: auth.currentUser?.uid === process.env.REACT_APP_ADMIN_UID,
});
