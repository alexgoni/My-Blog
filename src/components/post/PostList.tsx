import React from "react";
import { Link } from "react-router-dom";
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

const TITLE = "Firestore DB";

const INTRODUCTION =
  "데이터베이스 구조 Firestore는 NoSQL 형식의 데이터베이스다. 기존 SQL 데이터베이스와 달리 테이블이나 행이 없으며 컬렉션과 문서 두가지로 데이터를 저장한다.";

function PostBlock() {
  return (
    <Link to="/post/1" className={styles.blockContainer}>
      <div className={styles.postBlock}>
        <div className={styles.postBlock__firstRow}>
          <h1 className={styles.title}>{TITLE}</h1>
          <div className={styles.utils}>
            <Link to="/edit/1" className={styles.edit}>
              수정
            </Link>
            <Link to="/edit/1" className={styles.delete}>
              삭제
            </Link>
          </div>
        </div>
        <div className={styles.introduction}>{INTRODUCTION}</div>
      </div>
    </Link>
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
