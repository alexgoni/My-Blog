import React from "react";
import CategoryBlock from "./CategoryBlock";
import styles from "styles/category.module.scss";

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
