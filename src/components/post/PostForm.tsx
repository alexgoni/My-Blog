import { Editor } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import { useRecoilValue } from "recoil";
import { themeState } from "recoil/theme";
import { useRef, useState } from "react";
import styles from "styles/post.module.scss";
import { PostInterface } from "models/post";
import { useMobileDetector } from "modules/hooks/useMobileDetector";
import useWritePost from "modules/hooks/useWritePost";
import useSetPostForm from "modules/hooks/useSetPostForm";
import useSubmitPost from "modules/hooks/useSubmitPost";

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

  useSetPostForm({
    post,
    editorRef,
    setTitle,
    setSummary,
    setCategory,
    setContent,
    setCategoryList,
    setPost,
  });

  const { onUploadImage, onEditorChange, onChange } = useWritePost({
    title,
    editorRef,
    setTitle,
    setSummary,
    setCategory,
    setContent,
    setKeyWords,
  });

  const onSubmit = useSubmitPost({
    title,
    summary,
    content,
    category,
    keyWords,
    post,
  });

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
