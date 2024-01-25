import React from "react";
import PostBlock from "./PostBlock";
import styles from "styles/post.module.scss";

export default function PostList() {
  return (
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
  );
}
