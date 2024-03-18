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
import { db } from "firebaseApp";
import { PostInterface } from "models/post";
import { useEffect, useState } from "react";
import useInfiniteScroll from "./useInfiniteScroll";
import { toast } from "react-toastify";

const POSTS_PER_PAGE = 10;
const POSTS_REF = collection(db, "posts");

export function useGetAllPosts(sentinelRef: React.RefObject<HTMLDivElement>) {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [isFirstPageRender, setIsFirstPageRender] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastPostSnapshot, setLastPostSnapshot] =
    useState<QueryDocumentSnapshot | null>(null);

  const getFirstPagePosts = async () => {
    const postsQuery = query(
      POSTS_REF,
      orderBy("createdAt", "desc"),
      limit(POSTS_PER_PAGE)
    );

    const datas = await getDocs(postsQuery);
    const newPosts = datas.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PostInterface[];
    setPosts(newPosts);
    setLastPostSnapshot(datas.docs[datas.docs.length - 1]);
    setIsFirstPageRender(true);
  };

  const getMorePosts = async () => {
    setLoading(true);
    if (!lastPostSnapshot) return;

    const postsQuery = query(
      POSTS_REF,
      orderBy("createdAt", "desc"),
      startAfter(lastPostSnapshot),
      limit(POSTS_PER_PAGE)
    );

    const datas = await getDocs(postsQuery);
    const newPosts = datas.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PostInterface[];
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setLastPostSnapshot(datas.docs[datas.docs.length - 1]);
    setLoading(false);
  };

  useInfiniteScroll({
    lastPostSnapshot,
    loading,
    sentinelRef,
    loadMoreData: getMorePosts,
  });

  useEffect(() => {
    getFirstPagePosts();
  }, []);

  return { posts, isFirstPageRender };
}

export function useGetCategoryPosts(
  sentinelRef: React.RefObject<HTMLDivElement>,
  category: string | null
) {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [isFirstPageRender, setIsFirstPageRender] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastPostSnapshot, setLastPostSnapshot] =
    useState<QueryDocumentSnapshot | null>(null);

  const getFirstPagePosts = async () => {
    const postsQuery = query(
      POSTS_REF,
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
    setLastPostSnapshot(datas.docs[datas.docs.length - 1]);
    setIsFirstPageRender(true);
  };

  const getMorePosts = async () => {
    setLoading(true);
    if (!lastPostSnapshot) return;

    const postsQuery = query(
      POSTS_REF,
      where("category", "==", category),
      orderBy("createdAt", "desc"),
      startAfter(lastPostSnapshot),
      limit(POSTS_PER_PAGE)
    );

    const datas = await getDocs(postsQuery);
    const newPosts = datas.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PostInterface[];
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setLastPostSnapshot(datas.docs[datas.docs.length - 1]);
    setLoading(false);
  };

  useInfiniteScroll({
    lastPostSnapshot,
    loading,
    sentinelRef,
    loadMoreData: getMorePosts,
  });

  useEffect(() => {
    getFirstPagePosts();
  }, [category]);

  return { posts, isFirstPageRender };
}

export function useGetSearchPosts(searchWord: string) {
  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    const getPosts = async (searchWord: string) => {
      try {
        const postsQuery = query(
          POSTS_REF,
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

  return posts;
}
