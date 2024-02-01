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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "styles/category.module.scss";
import { FiPlusCircle } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import { isUserAdminState } from "recoil/user";

interface CategoryBlockProps {
  data: CategoryProps;
}

function CategoryBlock({ data }: CategoryBlockProps) {
  const imagePath = process.env.PUBLIC_URL + "/vim.jpg";

  return (
    <Link
      to={`/category/${data?.category}/${data?.id}`}
      className={styles.categoryBlock}
    >
      <img src={imagePath} alt="img" className={styles.categoryImg} />
      <div className={styles.categoryInfo}>
        <h1 className={styles.title}>{data?.category}</h1>
        <span className={styles.postNum}>{data?.postNum}개의 포스트</span>
      </div>
    </Link>
  );
}

export type CategoryType = "Free" | "Frontend" | "Backend" | "Web" | "Native";
export const CATEGORIES: CategoryType[] = [
  "Free",
  "Frontend",
  "Backend",
  "Web",
  "Native",
];
interface CategoryProps {
  id: string;
  category: string;
  createdAt: string;
  postNum: number;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const isUserAdmin = useRecoilValue(isUserAdminState);

  const getCategories = async () => {
    let cateogriesRef = collection(db, "category");
    let cateogriesQuery = query(cateogriesRef, orderBy("createdAt", "desc"));
    const datas = await getDocs(cateogriesQuery);

    datas?.forEach((doc) => {
      const dataObj = { id: doc.id, ...doc.data() };
      setCategories((prev) => [...prev, dataObj as CategoryProps]);
    });
  };

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
    getCategories();
  }, []);

  useEffect(() => {
    updatePostNum();
  }, [categories]);

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.listTitle}>Category List</h1>
        <Link to="/category/admin">
          {isUserAdmin && <FiPlusCircle size={28} className={styles.plus} />}
        </Link>
      </div>
      <div className={styles.categoryList}>
        {categories?.map((categoryData) => (
          <CategoryBlock key={categoryData?.id} data={categoryData} />
        ))}
      </div>
    </>
  );
}