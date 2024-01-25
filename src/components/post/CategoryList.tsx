import React from "react";
import { Link } from "react-router-dom";
import styles from "styles/category.module.scss";

function CategoryBlock() {
  const imagePath = process.env.PUBLIC_URL + "/vim.jpg";

  return (
    <Link to={"/category/1"} className={styles.categoryBlock}>
      <img src={imagePath} alt="img" className={styles.categoryImg} />
      <div className={styles.categoryInfo}>
        <h1 className={styles.title}>HTML</h1>
        <span className={styles.postNum}>3개의 포스트</span>
      </div>
    </Link>
  );
}

export default function CategoryList() {
  return (
    <>
      <h1 className={styles.listTitle}>Category List</h1>
      <div className={styles.categoryList}>
        <CategoryBlock />
        <CategoryBlock />
        <CategoryBlock />
        <CategoryBlock />
        <CategoryBlock />
        <CategoryBlock />
        <CategoryBlock />
      </div>
    </>
  );
}
