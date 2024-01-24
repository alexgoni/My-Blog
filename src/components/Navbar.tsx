import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "styles/home.module.scss";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.nav__title}>
        <Link to="/">Problem Solver</Link>
      </h1>
      <div className={styles.nav__tabList}>
        <div className={styles.write}>새 글 작성</div>
        <div className={styles.category}>Category</div>
        <div className={styles.lightMode}>
          <BsSunFill size={20} />
        </div>
        <div className={styles.search}>
          <CiSearch size={20} />
        </div>
      </div>
    </nav>
  );
}
