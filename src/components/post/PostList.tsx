import { db } from "firebaseApp";
import React, { memo, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "styles/post.module.scss";
import { PostInterface } from "models/post";
import { getDocumentCount } from "modules/utils/getDocumentCount";
import {
  useGetCategoryPosts,
  useGetAllPosts,
  useGetSearchPosts,
} from "modules/hooks/useGetPosts";
import useIntersection from "modules/hooks/useIntersection";
import {
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

function CategoryInfo({ category }: { category?: string | null }) {
  const [documentCount, setDocumentCount] = useState<number>(0);
  const params = useParams();

  const updatePostsNum = async () => {
    const count = await getDocumentCount(db, params);
    setDocumentCount(count);
  };

  useEffect(() => {
    updatePostsNum();
  }, [params]);

  return (
    <>
      <div className={styles.categoryInfo}>
        <h1>{category ? category : "All"}</h1>
        <div>{documentCount} posts</div>
      </div>
    </>
  );
}

memo(CategoryInfo);

function PostBlock({ data }: { data: PostInterface }) {
  return (
    <Link to={`/post/${data?.id}`} className={styles.postBlock}>
      <h1 className={styles.title}>{data?.title}</h1>
      <div className={styles.summary}>{data?.summary}</div>
    </Link>
  );
}

const POSTS_REF = collection(db, "posts");

export function PinnedPosts() {
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const getPinnedPosts = async () => {
    const q = query(collection(db, "posts"), where("pinned", "==", true));
    const datas = await getDocs(q);
    const newPosts = datas.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PostInterface[];
    setPosts(newPosts);
  };

  useEffect(() => {
    getPinnedPosts();
  }, []);

  return (
    <div className={styles.pinnedPosts}>
      <h1 className={styles.pinnedTitle}>Pinned Posts</h1>
      <div className={styles.postList}>
        {posts?.length > 0 ? (
          posts?.map((postData) => (
            <div key={postData?.id} className={styles.pinnedPostBlockContainer}>
              <PostBlock data={postData} />
            </div>
          ))
        ) : (
          <div className={styles.noPost}>게시글이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export function AllPostList() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const postBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { posts, isFirstPageRender } = useGetAllPosts(sentinelRef);

  useIntersection(postBlockRefs, posts);
  return (
    <>
      <CategoryInfo />
      <div className={styles.postList}>
        {posts?.length > 0 ? (
          posts?.map((postData, idx) => (
            <div
              key={postData?.id}
              ref={(element) => (postBlockRefs.current[idx] = element)}
              className={styles.postBlockContainer}
            >
              <PostBlock data={postData} />
            </div>
          ))
        ) : (
          <div className={styles.noPost}>게시글이 없습니다.</div>
        )}
      </div>
      {isFirstPageRender && (
        <div className={styles.sentinelRef} ref={sentinelRef}></div>
      )}
    </>
  );
}

export function CategoryPostList() {
  const [category, setCategory] = useState<string | null>(null);
  const params = useParams();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const postBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { posts, isFirstPageRender } = useGetCategoryPosts(
    sentinelRef,
    category
  );

  useIntersection(postBlockRefs, posts);

  useEffect(() => {
    if (params?.category) {
      setCategory(params.category);
    }
  }, []);

  return (
    <>
      <CategoryInfo category={category} />
      <div className={styles.postList}>
        {posts?.length > 0 ? (
          posts?.map((postData, idx) => (
            <div
              key={postData?.id}
              ref={(element) => (postBlockRefs.current[idx] = element)}
              className={styles.postBlockContainer}
            >
              <PostBlock data={postData} />
            </div>
          ))
        ) : (
          <div className={styles.noPost}>게시글이 없습니다.</div>
        )}
      </div>
      {isFirstPageRender && (
        <div className={styles.sentinelRef} ref={sentinelRef}></div>
      )}
    </>
  );
}

export function SearchPostList({ searchWord }: { searchWord: string }) {
  const posts = useGetSearchPosts(searchWord);

  return (
    <>
      <div className={styles.postList}>
        {posts?.length > 0 ? (
          posts?.map((postData) => (
            <div
              key={postData?.id}
              className={`${styles.postBlockContainer} ${styles.visible}`}
            >
              <PostBlock key={postData?.id} data={postData} />
            </div>
          ))
        ) : (
          <div className={styles.noPost}>게시글이 없습니다.</div>
        )}
      </div>
      <div className={styles.sentinelRef} />
    </>
  );
}
