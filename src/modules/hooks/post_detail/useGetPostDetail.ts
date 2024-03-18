import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostInterface } from "models/post";
import { Dispatch, SetStateAction } from "react";

export default function useGetPostDetail(
  setPost: Dispatch<SetStateAction<PostInterface | null>>
) {
  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    setPost({ id: docSnap.id, ...(docSnap.data() as PostInterface) });
  };

  return getPost;
}
