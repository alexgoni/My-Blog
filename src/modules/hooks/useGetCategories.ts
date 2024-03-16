import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { CategoryInterface } from "models/category";
import { useEffect, useState } from "react";

export function useGetCategories() {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  const getCategories = async () => {
    setCategories([]);

    const cateogriesRef = collection(db, "category");
    const cateogriesQuery = query(cateogriesRef, orderBy("createdAt", "desc"));
    const datas = await getDocs(cateogriesQuery);

    datas?.forEach((doc) => {
      const dataObj = { id: doc.id, ...doc.data() };
      setCategories((prev) => [...prev, dataObj as CategoryInterface]);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}

export function useUpdatePostNum(categories: CategoryInterface[]) {
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
