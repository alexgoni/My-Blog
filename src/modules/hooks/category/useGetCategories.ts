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

export default function useGetCategories() {
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
