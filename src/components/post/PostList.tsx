import {
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import React, { memo, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "styles/post.module.scss";
import { toast } from "react-toastify";
import PaginationComponent from "./Pagination";
import { PostInterface } from "models/post";
import { getDocumentCount } from "modules/utils/getDocumentCount";
import useInfiniteScroll from "modules/hooks/useInfiniteScroll";
import { useGetHomePosts } from "modules/hooks/useGetPosts";
import useIntersection from "modules/hooks/useIntersection";

interface CategoryInfoProps {
  category?: string | null;
}

function CategoryInfo({ category }: CategoryInfoProps) {
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

interface PostBlockProps {
  data: PostInterface;
}

function PostBlock({ data }: PostBlockProps) {
  return (
    <Link to={`/post/${data?.id}`} className={styles.postBlock}>
      <h1 className={styles.title}>{data?.title}</h1>
      <div className={styles.summary}>{data?.summary}</div>
    </Link>
  );
}

const POSTS_PER_PAGE = 10;

export function HomePostList() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const postBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { posts, isFirstPageRender } = useGetHomePosts(sentinelRef);

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
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [category, setCategory] = useState<string | null>(null);
  const params = useParams();
  const postsRef = collection(db, "posts");

  const [loading, setLoading] = useState(false);
  const lastPostRef = useRef<any>(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (params?.category) {
      setCategory(params.category);
    }
  }, []);

  useEffect(() => {
    getFirstPagePosts();
  }, []);

  const getFirstPagePosts = async () => {
    const postsQuery = query(
      postsRef,
      where("category", "==", category),
      orderBy("createdAt", "desc"),
      limit(POSTS_PER_PAGE)
    );

    const datas = await getDocs(postsQuery);
    const newPosts = datas.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PostInterface[];

    setPosts(newPosts);

    lastPostRef.current = datas.docs[datas.docs.length - 1];
  };

  const getMorePosts = async () => {
    setLoading(true);
    if (!lastPostRef.current) return;

    const postsQuery = query(
      postsRef,
      where("category", "==", category),
      orderBy("createdAt", "desc"),
      startAt(lastPostRef.current),
      limit(POSTS_PER_PAGE)
    );
    const datas = await getDocs(postsQuery);
    const newPosts = datas.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PostInterface[];

    setLoading(false);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    lastPostRef.current = datas.docs[datas.docs.length - 1];
  };

  // useInfiniteScroll(loading, sentinelRef, getMorePosts);

  return (
    <>
      <CategoryInfo category={category} />
      <div className={styles.postList}>
        {posts?.length > 0 ? (
          posts?.map((postData) => (
            <PostBlock key={postData?.id} data={postData} />
          ))
        ) : (
          <div className={styles.noPost}>게시글이 없습니다.</div>
        )}
      </div>
      {posts?.length > 0 ? (
        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </>
  );
}

interface SearchPostListProps {
  searchWord: string;
}

export function SearchPostList({ searchWord }: SearchPostListProps) {
  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    const getPosts = async (searchWord: string) => {
      try {
        const postsRef = collection(db, "posts");
        const postsQuery = query(
          postsRef,
          where("keyWords", "array-contains-any", searchWord.split(/\s+/)),
          orderBy("createdAt", "desc")
        );
        const datas = await getDocs(postsQuery);

        setPosts(
          datas.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as PostInterface)
          )
        );
      } catch (error: any) {
        console.log(error);
        toast.error(error.code);
      }
    };

    getPosts(searchWord);
  }, [searchWord]);

  return (
    <>
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
