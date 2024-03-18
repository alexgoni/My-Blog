import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostInterface } from "models/post";
import { useEffect, useState } from "react";

const POSTS_REF = collection(db, "posts");

export default function useGetPinnedPosts() {
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const selectRandomPosts = (arr: any[], n: number) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const getPinnedPosts = async () => {
    const postsQuery = query(POSTS_REF, where("pinned", "==", true));
    const datas = await getDocs(postsQuery);
    const pinnedPosts = datas.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PostInterface[];

    const randomPosts = selectRandomPosts(pinnedPosts, 4);
    setPosts(randomPosts);
  };

  useEffect(() => {
    getPinnedPosts();
  }, []);

  return posts;
}
