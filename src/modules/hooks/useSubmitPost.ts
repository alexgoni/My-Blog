import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostInterface } from "models/post";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface useSubmitPostArg {
  title: string;
  summary: string;
  content: string;
  category: string;
  keyWords: string[];
  post: PostInterface | null;
}

export default function useSubmitPost({
  title,
  summary,
  content,
  category,
  keyWords,
  post,
}: useSubmitPostArg) {
  const navigate = useNavigate();

  const createPost = async () => {
    await addDoc(collection(db, "posts"), {
      title,
      summary,
      content,
      createdAt: new Date(),
      category,
      keyWords,
      views: 0,
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

  return onSubmit;
}
