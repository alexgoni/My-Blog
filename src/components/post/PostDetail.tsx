import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserAdminState } from "recoil/user";
import styles from "styles/post.module.scss";
import { PostProps } from "./PostList";
import { db } from "firebaseApp";
import { doc, getDoc } from "firebase/firestore";
import Loading from "components/layout/Loading";

const CATEGORY = "Web";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const isUserAdmin = useRecoilValue(isUserAdminState);
  const params = useParams();

  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, []);

  return (
    <div className={styles.postDetail}>
      {post ? (
        <>
          <div className={styles.title}>{post?.title}</div>
          <div className={styles.info}>
            <div>
              <span className={styles.category}>{CATEGORY}</span>
              <span className={styles.date}>{post?.createdAt}</span>
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
          <div className={styles.summary}>
            <h1>Introduction</h1>
            {post?.summary}
          </div>
          <div className={styles.content}>
            <p>{post?.content}</p>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
