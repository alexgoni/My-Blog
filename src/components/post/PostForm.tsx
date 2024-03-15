import { Editor } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import { useRecoilValue } from "recoil";
import { themeState } from "recoil/theme";
import { useEffect, useRef, useState } from "react";
import styles from "styles/post.module.scss";
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
import { db, storage } from "firebaseApp";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { HookCallback } from "@toast-ui/editor/types/editor";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { PostInterface } from "models/post";
import { useMobileDetector } from "modules/utils/useMobileDetector";

export default function PostForm() {
  const [title, setTitle] = useState<string>("");
  const [keyWords, setKeyWords] = useState<string[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("Free");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [post, setPost] = useState<PostInterface | null>(null);
  const isMobileWidth = useMobileDetector();
  const theme = useRecoilValue(themeState);
  const editorRef = useRef<Editor | null>(null);
  const navigate = useNavigate();
  const params = useParams();
  const titleRef = useRef<string>(title);

  useEffect(() => {
    titleRef.current = title;

    setKeyWords(title.split(/\s+/));
  }, [title]);

  const onUploadImage = async (blob: any, callback: HookCallback) => {
    if (!titleRef.current.trim()) {
      toast.error("제목을 작성하세요.");
      return;
    }
    const storageRef = ref(storage, `postsImg/${titleRef.current}/${uuidv4()}`);
    console.log(storageRef);
    console.log(storageRef.fullPath);
    await uploadBytes(storageRef, blob);

    const imgUrl = await getDownloadURL(storageRef);
    callback(imgUrl);
  };

  const getCategoryList = async () => {
    const cateogriesRef = collection(db, "category");
    const cateogriesQuery = query(cateogriesRef, orderBy("createdAt", "asc"));
    const datas = await getDocs(cateogriesQuery);

    datas?.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data().category]);
    });
  };

  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    setPost({ id: docSnap.id, ...(docSnap.data() as PostInterface) });
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "title") setTitle(value);
    if (name === "summary") setSummary(value);
    if (name === "category") setCategory(value);
  };

  const onEditorChange = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown();
    if (markdown) setContent(markdown);
  };

  const createPost = async () => {
    await addDoc(collection(db, "posts"), {
      title,
      summary,
      content,
      createdAt: new Date(),
      category,
      keyWords,
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
      updatedAt: new Date(),
      category,
      keyWords,
    });

    toast.success("게시글을 수정했습니다.");
    navigate(`/post/${postId}`);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }

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

  useEffect(() => {
    getCategoryList();
    if (params?.id) getPost(params?.id);
  }, []);

  useEffect(() => {
    if (!post) return;
    setTitle(post?.title);
    setSummary(post?.summary);
    setCategory(post?.category);
    setContent(post?.content);

    editorRef.current?.getInstance().setMarkdown(post?.content);
  }, [post]);

  return (
    <>
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
          <Editor
            ref={editorRef}
            previewStyle={isMobileWidth ? "tab" : "vertical"}
            height="800px"
            initialEditType="markdown"
            useCommandShortcut={true}
            plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            theme={theme}
            onChange={onEditorChange}
            hooks={{
              addImageBlobHook: onUploadImage,
            }}
            autofocus={false}
          />
        </div>
        <div className={styles.form__btnContainer}>
          <input
            type="submit"
            value={post ? "수정" : "제출"}
            className={styles.form__submitBtn}
          />
        </div>
      </form>
    </>
  );
}
