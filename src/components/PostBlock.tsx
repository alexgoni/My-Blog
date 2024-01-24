import React from "react";
import styles from "styles/post.module.scss";

const TITLE = "Firestore DB";

const SUMMARY =
  "데이터베이스 구조 Firestore는 NoSQL 형식의 데이터베이스다. 기존 SQL 데이터베이스와 달리 테이블이나 행이 없으며 컬렉션과 문서 두가지로 데이터를 저장한다.";

export default function PostBlock() {
  return (
    <div className={styles.postBlock}>
      <h1 className={styles.title}>{TITLE}</h1>
      <div className={styles.summary}>{SUMMARY}</div>
    </div>
  );
}
