import React, { useState } from "react";
import styles from "styles/post.module.scss";

const COMMENTS = [
  {
    id: 1,
    email: "goni000211@gmail.com",
    content: "댓글입니다.",
    createdAt: "2023-10-23",
  },
  {
    id: 2,
    email: "goni000211@gmail.com",
    content: "댓글입니다.",
    createdAt: "2023-10-23",
  },
  {
    id: 3,
    email: "goni000211@gmail.com",
    content: "댓글입니다.",
    createdAt: "2023-10-23",
  },
];

export default function Comments() {
  const [comment, setComment] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "comment") setComment(value);
  };

  return (
    <div className={styles.comments}>
      <form className={styles.comments__form}>
        <label htmlFor="comment">댓글 입력</label>
        <textarea
          name="comment"
          id="comment"
          value={comment}
          onChange={onChange}
          required
        />

        <input type="submit" value="입력" className={styles.submitBtn} />
      </form>
      <div className={styles.comments__list}>
        {COMMENTS?.map((comment) => (
          <div key={comment.id} className={styles.commentBox}>
            <div className={styles.profileBox}>
              <div className={styles.email}>{comment?.email}</div>
              <div className={styles.date}>{comment?.createdAt}</div>
              <div className={styles.delete}>삭제</div>
            </div>
            <div className={styles.commentText}>{comment?.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
