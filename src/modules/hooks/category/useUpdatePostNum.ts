import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "firebaseApp";
import { CategoryInterface } from "models/category";
import { useEffect } from "react";

export default function useUpdatePostNum(categories: CategoryInterface[]) {
  const updatePostNum = async () => {
    const collectionRef = collection(db, "posts");
    for (const category of categories) {
      let postsQuery = query(
        collectionRef,
        where("category", "==", category.category)
      );
      try {
        const querySnapshot = await getDocs(postsQuery);
        const postNum = querySnapshot.size;

        const postRef = doc(db, "category", category.id);
        await updateDoc(postRef, {
          postNum,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    updatePostNum();
  }, [categories]);
}
