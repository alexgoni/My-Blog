import { Editor } from "@toast-ui/react-editor";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { PostInterface } from "models/post";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { useParams } from "react-router-dom";

interface useSetPostFormArg {
  post: PostInterface | null;
  editorRef: RefObject<Editor | null>;
  setTitle: Dispatch<SetStateAction<string>>;
  setSummary: Dispatch<SetStateAction<string>>;
  setCategory: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
  setCategoryList: Dispatch<SetStateAction<string[]>>;
  setPost: Dispatch<SetStateAction<PostInterface | null>>;
}

export default function useSetPostForm({
  post,
  editorRef,
  setTitle,
  setSummary,
  setCategory,
  setContent,
  setCategoryList,
  setPost,
}: useSetPostFormArg) {
  const params = useParams();

  const getCategoryList = async () => {
    const cateogriesRef = collection(db, "category");
    const cateogriesQuery = query(cateogriesRef, orderBy("createdAt", "asc"));
    const datas = await getDocs(cateogriesQuery);

    datas?.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data().category]);
    });
  };

  const getPostDetail = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    setPost({ id: docSnap.id, ...(docSnap.data() as PostInterface) });
  };

  useEffect(() => {
    getCategoryList();
    if (params?.id) getPostDetail(params?.id);
  }, []);

  useEffect(() => {
    if (!post) return;
    setTitle(post?.title);
    setSummary(post?.summary);
    setCategory(post?.category);
    setContent(post?.content);

    editorRef.current?.getInstance().setMarkdown(post?.content);
  }, [post]);
}
