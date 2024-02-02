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
  getPost: (id: string) => Promise<void>;
}

export interface CommentsInterface {
  content: string;
  uid: string;
  email: string;
  createdAt: string;
}

function CommentForm({ post, user, getPost }: CommentFormProps) {
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
        await getPost(post.id);

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

interface CommentListProps {
  post: PostProps;
}

function CommentList({ post }: CommentListProps) {
  return (
    <div className={styles.comments__list}>
      {post?.comments
        ?.slice(0)
        ?.reverse()
        .map((comment) => (
          <div key={comment.createdAt} className={styles.commentBox}>
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
  getPost: (id: string) => Promise<void>;
}

export default function Comments({ post, getPost }: CommentsProps) {
  const user = useRecoilValue(currentUserObj);

  return (
    <div className={styles.comments}>
      {user && <CommentForm post={post} user={user} getPost={getPost} />}
      <CommentList post={post} />
    </div>
  );
}
