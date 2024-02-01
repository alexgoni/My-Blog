import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "styles/category.module.scss";

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
        <span className={styles.postNum}>3개의 포스트</span>
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
}

export default function CategoryList() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const getCategories = async () => {
    let cateogriesRef = collection(db, "category");
    let cateogriesQuery = query(cateogriesRef, orderBy("createdAt", "desc"));
    const datas = await getDocs(cateogriesQuery);

    datas?.forEach((doc) => {
      const dataObj = { id: doc.id, ...doc.data() };
      setCategories((prev) => [...prev, dataObj as CategoryProps]);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h1 className={styles.listTitle}>Category List</h1>
      <div className={styles.categoryList}>
        {categories?.map((categoryData) => (
          <CategoryBlock key={categoryData?.id} data={categoryData} />
        ))}
      </div>
    </>
  );
}
