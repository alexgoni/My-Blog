import { HookCallback } from "@toast-ui/editor/types/editor";
import { Editor } from "@toast-ui/react-editor";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "firebaseApp";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

interface useWritePostArg {
  title: string;
  editorRef: RefObject<Editor | null>;
  setTitle: Dispatch<SetStateAction<string>>;
  setSummary: Dispatch<SetStateAction<string>>;
  setCategory: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
  setKeyWords: Dispatch<SetStateAction<string[]>>;
}

export default function useWritePost({
  title,
  editorRef,
  setTitle,
  setSummary,
  setCategory,
  setContent,
  setKeyWords,
}: useWritePostArg) {
  const titleRef = useRef<string>(title);

  const onUploadImage = async (blob: any, callback: HookCallback) => {
    if (!titleRef.current.trim()) {
      toast.error("제목을 작성하세요.");
      return;
    }
    const storageRef = ref(storage, `postsImg/${titleRef.current}/${uuidv4()}`);
    await uploadBytes(storageRef, blob);

    const imgUrl = await getDownloadURL(storageRef);
    callback(imgUrl);
  };

  const onEditorChange = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown();
    if (markdown) setContent(markdown);
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

  useEffect(() => {
    titleRef.current = title;
    setKeyWords(title.split(/\s+/));
  }, [title]);

  return { onUploadImage, onEditorChange, onChange };
}
