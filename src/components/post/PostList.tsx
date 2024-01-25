import React from "react";
import PostBlock from "./PostBlock";
import styles from "styles/post.module.scss";

function CategoryInfo() {
  return (
    <>
      <div className={styles.categoryInfo}>
        <h1 className="category">All</h1>
        <div className="postNum">0 posts</div>
      </div>
    </>
  );
}

export default function PostList() {
  return (
    <>
      <CategoryInfo />
      <div className={styles.postList}>
        <PostBlock />
        <PostBlock />
        <PostBlock />
        <PostBlock />
        <PostBlock />
        <PostBlock />
        <PostBlock />
        <PostBlock />
      </div>
    </>
  );
}
