import React from "react";
import styles from "styles/category_info.module.scss";

export default function CategoryInfo() {
  return (
    <>
      <div className={styles.categoryInfo}>
        <h1 className="category">All</h1>
        <div className="postNum">0 posts</div>
      </div>
    </>
  );
}
