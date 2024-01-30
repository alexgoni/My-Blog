import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "styles/post.module.scss";

function CategoryInfo() {
  return (
    <>
      <div className={styles.categoryInfo}>
        <h1 className="category">All</h1>
        <div className="postNum">0 posts</div>
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

interface PostProps {
  id: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const getPosts = async () => {
    const datas = await getDocs(collection(db, "posts"));

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
