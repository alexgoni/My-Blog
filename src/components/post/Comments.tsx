import React, { useState } from "react";
import styles from "styles/post.module.scss";
import { PostProps } from "./PostList";
import { db } from "firebaseApp";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { UserObjType, currentUserObj } from "recoil/user";
import { toast } from "react-toastify";

interface CommentFormProps {
  post: PostProps;
  user: UserObjType;
}

export interface CommentsInterface {
  content: string;
  uid: string;
  email: string;
  createdAt: string;
}

function CommentForm({ post, user }: CommentFormProps) {
  const [comment, setComment] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post && post?.id && user?.uid) {
        const postRef = doc(db, "posts", post.id);

        const commentObj = {
          content: comment,
          uid: user.uid,
          email: user.email,
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };

        await updateDoc(postRef, {
          comments: arrayUnion(commentObj),
        });
        toast.success("댓글을 생성했습니다.");
        setComment("");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.code);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "comment") setComment(value);
  };

  return (
    <form onSubmit={onSubmit} className={styles.comments__form}>
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
  );
}

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

function CommentList() {
  return (
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
  );
}

interface CommentsProps {
  post: PostProps;
}

export default function Comments({ post }: CommentsProps) {
  const user = useRecoilValue(currentUserObj);

  return (
    <div className={styles.comments}>
      {user && <CommentForm post={post} user={user} />}
      <CommentList />
    </div>
  );
}
