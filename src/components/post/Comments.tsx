import React, { useState } from "react";
import styles from "styles/post.module.scss";

import { db } from "firebaseApp";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { UserObjType, currentUserObj } from "recoil/user";
import { toast } from "react-toastify";
import { CommentInterface } from "models/comment";
import { PostInterface } from "models/post";

interface CommentProps {
  post: PostInterface;
  user: UserObjType;
  getPost: (id: string) => Promise<void>;
}

export default function Comments({
  post,
  getPost,
}: Omit<CommentProps, "user">) {
  const user = useRecoilValue(currentUserObj);

  return (
    <div className={styles.comments}>
      {user && <CommentForm post={post} user={user} getPost={getPost} />}
      <CommentList post={post} user={user} getPost={getPost} />
    </div>
  );
}

function CommentForm({ post, user, getPost }: CommentProps) {
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
          createdAt: new Date(),
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

function CommentList({ post, user, getPost }: CommentProps) {
  const handleDeleteComment = async (data: CommentInterface) => {
    const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");
    if (confirm && post.id) {
      const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef, {
        comments: arrayRemove(data),
      });

      toast.success("댓글을 삭제했습니다.");
      await getPost(post.id);
    }
  };

  return (
    <div className={styles.comments__list}>
      {post?.comments
        ?.slice(0)
        ?.reverse()
        .map((comment, idx) => (
          <div key={idx} className={styles.commentBox}>
            <div className={styles.profileBox}>
              <div className={styles.email}>{comment?.email}</div>
              <div className={styles.date}>
                {comment?.createdAt.toDate().toLocaleDateString("ko", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hourCycle: "h11",
                })}
              </div>
              {user?.uid === comment.uid && (
                <div
                  className={styles.delete}
                  onClick={() => handleDeleteComment(comment)}
                >
                  삭제
                </div>
              )}
            </div>
            <div className={styles.commentText}>{comment?.content}</div>
          </div>
        ))}
    </div>
  );
}
