import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "styles/post.module.scss";

export default function PostForm() {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        title,
        summary,
        content,
        createAt: new Date()?.toLocaleDateString(),
      });

      toast.success("게시글을 생성했습니다.");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.code);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "title") setTitle(value);
    if (name === "summary") setSummary(value);
    if (name === "content") setContent(value);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.form__block}>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={onChange}
          required
        />
      </div>
      <div className={styles.form__block}>
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          value={summary}
          onChange={onChange}
          required
        />
      </div>
      <div className={styles.form__block}>
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={onChange}
          required
        />
      </div>
      <div className={styles.form__block}>
        <input type="submit" value="제출" className={styles.form__submitBtn} />
      </div>
    </form>
  );
}
