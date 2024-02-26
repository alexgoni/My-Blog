import {
  doc,
  getDoc,
  collection,
  getDocs,
  Firestore,
} from "firebase/firestore";
import { Params } from "react-router-dom";

export const getDocumentCount = async (
  db: Firestore,
  params: Params
): Promise<number> => {
  if (params?.id) {
    const docRef = doc(db, "category", params?.id);
    const docSnap = await getDoc(docRef);
    return docSnap.data()?.postNum;
  } else {
    const collectionRef = collection(db, "posts");
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.size;
  }
};
