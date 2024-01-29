import React from "react";
import styles from "styles/post.module.scss";

export default function PostForm() {
  return (
    <form className={styles.form}>
      <div className={styles.form__block}>
        <label htmlFor="title">제목</label>
        <input type="text" name="title" id="title" required />
      </div>
      <div className={styles.form__block}>
        <label htmlFor="summary">요약</label>
        <input type="text" name="summary" id="summary" required />
      </div>
      <div className={styles.form__block}>
        <label htmlFor="content">내용</label>
        <textarea name="content" id="content" required />
      </div>
      <div className={styles.form__block}>
        <input type="submit" value="제출" className={styles.form__submitBtn} />
      </div>
    </form>
  );
}
