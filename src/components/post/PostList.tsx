import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "styles/post.module.scss";
import { CategoryType } from "./CategoryList";

function CategoryInfo() {
  const [documentCount, setDocumentCount] = useState<number>(0);

  const getDocumentCount = async () => {
    const collectionRef = collection(db, "posts");
    const querySnapshot = await getDocs(collectionRef);
    setDocumentCount(querySnapshot.size);
  };

  useEffect(() => {
    getDocumentCount();
  }, []);

  return (
    <>
      <div className={styles.categoryInfo}>
        <h1 className="category">All</h1>
        <div className="postNum">{documentCount} posts</div>
      </div>
    </>
  );
}

interface PostBlockProps {
  data: PostProps;
}

function PostBlock({ data }: PostBlockProps) {
  return (
    <Link to={`/post/${data?.id}`} className={styles.postBlock}>
      <h1 className={styles.title}>{data?.title}</h1>
      <div className={styles.summary}>{data?.summary}</div>
    </Link>
  );
}

export interface PostProps {
  id?: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  category: CategoryType;
}

export default function PostList() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const getPosts = async () => {
    let postsRef = collection(db, "posts");
    let postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    const datas = await getDocs(postsQuery);

    datas?.forEach((doc) => {
      const dataObj = { id: doc.id, ...doc.data() };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <CategoryInfo />
      <div className={styles.postList}>
        {posts?.length > 0 ? (
          posts?.map((postData) => (
            <PostBlock key={postData?.id} data={postData} />
          ))
        ) : (
          <div className={styles.noPost}>게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
