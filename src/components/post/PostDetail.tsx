import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserAdminState } from "recoil/user";
import styles from "styles/post.module.scss";

const TITLE = "Firestore DB";
const DATE = "2024. 1. 25. 오후 03:54:47";
const CATEGORY = "Web";
const INTRODUCTION =
  "데이터베이스 구조 Firestore는 NoSQL 형식의 데이터베이스다. 기존 SQL 데이터베이스와 달리 테이블이나 행이 없으며 컬렉션과 문서 두가지로 데이터를 저장한다.";

export default function PostDetail() {
  const isUserAdmin = useRecoilValue(isUserAdminState);

  return (
    <div className={styles.postDetail}>
      <div className={styles.title}>{TITLE}</div>
      <div className={styles.info}>
        <div>
          <span className={styles.category}>{CATEGORY}</span>
          <span className={styles.date}>{DATE}</span>
        </div>
        {isUserAdmin && (
          <div className={styles.utils}>
            <Link to="/edit/1" className={styles.edit}>
              수정
            </Link>
            <Link to="/edit/1" className={styles.delete}>
              삭제
            </Link>
          </div>
        )}
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
