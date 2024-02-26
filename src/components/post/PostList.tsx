import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "styles/post.module.scss";
import { CommentsInterface } from "./Comments";
import { toast } from "react-toastify";
import PaginationComponent from "./pagination";
import { getDocumentCount } from "module/getDocumentCount";

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
        <h1 className="category">{category ? category : "All"}</h1>
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
  category: string;
  comments?: CommentsInterface[];
  keyWords: string[];
}

const POSTS_PER_PAGE = 10;

export function HomePostList() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsRef = collection(db, "posts");

  // 프로젝트 커질 시 url query나 무한 스크롤 방법으로 변환
  const getPageFirstDoc = async (page: number) => {
    const postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    const datas = await getDocs(postsQuery);
    return datas.docs[(page - 1) * POSTS_PER_PAGE];
  };

  const getPosts = async (page: number) => {
    setPosts([]);

    const pageFirstDoc = await getPageFirstDoc(page);
    if (!pageFirstDoc) return;

    const postsQuery = query(
      postsRef,
      orderBy("createdAt", "desc"),
      startAt(pageFirstDoc),
      limit(POSTS_PER_PAGE)
    );
    const datas = await getDocs(postsQuery);
    const newPosts = datas.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PostProps[];

    setPosts(newPosts);
  };

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

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
      {posts?.length > 0 ? (
        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </>
  );
}

export function CategoryPostList() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [category, setCategory] = useState<string | null>(null);
  const params = useParams();
  const postsRef = collection(db, "posts");

  useEffect(() => {
    if (params?.category) {
      setCategory(params.category);
    }
  }, []);

  const getPageFirstDoc = async (page: number) => {
    const postsQuery = query(
      postsRef,
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    const datas = await getDocs(postsQuery);
    return datas.docs[(page - 1) * POSTS_PER_PAGE];
  };

  const getPosts = async (page: number) => {
    setPosts([]);

    const pageFirstDoc = await getPageFirstDoc(page);
    if (!pageFirstDoc) return;

    const postsQuery = query(
      postsRef,
      where("category", "==", category),
      orderBy("createdAt", "desc"),
      startAt(pageFirstDoc),
      limit(POSTS_PER_PAGE)
    );
    const datas = await getDocs(postsQuery);
    const newPosts = datas.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PostProps[];

    setPosts(newPosts);
  };

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage, category]);

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
  const [posts, setPosts] = useState<PostProps[]>([]);

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
          datas.docs.map((doc) => ({ id: doc.id, ...doc.data() } as PostProps))
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
