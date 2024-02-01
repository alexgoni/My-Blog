import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "styles/post.module.scss";
import { PostProps } from "./PostList";

export default function PostForm() {
  const [title, setTitle] = useState<string>("");
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("Free");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [post, setPost] = useState<PostProps | null>(null);
  const navigate = useNavigate();
  const params = useParams();

  const getCategoryList = async () => {
    const cateogriesRef = collection(db, "category");
    const cateogriesQuery = query(cateogriesRef, orderBy("createdAt", "asc"));
    const datas = await getDocs(cateogriesQuery);

    datas?.forEach((doc) => {
      console.log(doc.data().category);
      setCategoryList((prev) => [...prev, doc.data().category]);
    });
  };

  const createPost = async () => {
    await addDoc(collection(db, "posts"), {
      title,
      summary,
      content,
      createdAt: new Date()?.toLocaleDateString("ko", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      category,
    });

    toast.success("게시글을 생성했습니다.");
    navigate("/");
  };

  const updatePost = async (postId: string) => {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      title,
      summary,
      content,
      updatedAt: new Date()?.toLocaleDateString("ko", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      category,
    });

    toast.success("게시글을 수정했습니다.");
    navigate(`/post/${postId}`);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post && post.id) {
        await updatePost(post.id);
      } else {
        await createPost();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.code);
    }
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "title") setTitle(value);
    if (name === "summary") setSummary(value);
    if (name === "content") setContent(value);
    if (name === "category") setCategory(value);
  };

  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, []);

  useEffect(() => {
    if (!post) return;
    setTitle(post?.title);
    setSummary(post?.summary);
    setContent(post?.content);
    setCategory(post?.category);
  }, [post]);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.form__block}>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={onChange}
          required
        />
      </div>
      <div className={styles.form__block}>
        <label htmlFor="category">카테고리</label>
        <select
          name="category"
          id="category"
          onChange={onChange}
          value={category}
        >
          {categoryList?.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.form__block}>
        <label htmlFor="summary">요약</label>
        <textarea
          name="summary"
          id="summary"
          value={summary}
          onChange={onChange}
          className={styles.summary}
          required
        />
      </div>
      <div className={styles.form__block}>
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={onChange}
          required
        />
      </div>
      <div className={styles.form__block}>
        <input
          type="submit"
          value={post ? "수정" : "제출"}
          className={styles.form__submitBtn}
        />
      </div>
    </form>
  );
}
