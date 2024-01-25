import React from "react";
import styles from "styles/post.module.scss";

const TITLE = "Firestore DB";
const DATE = "2024. 1. 25. 오후 03:54:47";
const CATEGORY = "Web";
const INTRODUCTION =
  "데이터베이스 구조 Firestore는 NoSQL 형식의 데이터베이스다. 기존 SQL 데이터베이스와 달리 테이블이나 행이 없으며 컬렉션과 문서 두가지로 데이터를 저장한다.";

export default function PostDetail() {
  return (
    <div className={styles.postDetail}>
      <div className={styles.title}>{TITLE}</div>
      <div className={styles.info}>
        <span className={styles.category}>{CATEGORY}</span>
        <span className={styles.date}>{DATE}</span>
      </div>
      <div className={styles.introduction}>
        <h1>Introduction</h1>
        {INTRODUCTION}
      </div>
      <div className={styles.content}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
          nulla iure, nisi, incidunt dolore sequi odit sit minus est velit
          dolores illum vero. Tempora ullam placeat quibusdam assumenda ut
          omnis.
        </p>
      </div>
    </div>
  );
}
