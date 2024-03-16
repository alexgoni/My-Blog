import {
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { PostInterface } from "models/post";
import { useEffect, useState } from "react";
import useInfiniteScroll from "./useInfiniteScroll";

const POSTS_PER_PAGE = 10;

export function useGetHomePosts(sentinelRef: React.RefObject<HTMLDivElement>) {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [isFirstPageRender, setIsFirstPageRender] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastPostSnapshot, setLastPostSnapshot] =
    useState<QueryDocumentSnapshot | null>(null);
  const postsRef = collection(db, "posts");

  const getFirstPagePosts = async () => {
    const postsQuery = query(
      postsRef,
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
      postsRef,
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
