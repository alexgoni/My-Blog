import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";

export default function useUpdatePostDetail() {
  const updateViews = async (id: string) => {
    const docRef = doc(db, "posts", id);

    await updateDoc(docRef, {
      views: increment(1),
    });
  };

  const updatePinned = async (id: string, pinned: boolean) => {
    const docRef = doc(db, "posts", id);

    await updateDoc(docRef, {
      pinned,
    });
  };

  return { updateViews, updatePinned };
}
