import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserAdminState } from "recoil/user";
import styles from "styles/post.module.scss";
import { db, storage } from "firebaseApp";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Comments from "./Comments";
import Loading from "components/layout/Loading";
import { themeState } from "recoil/theme";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import { deleteObject, listAll, ref } from "firebase/storage";
import { PostInterface } from "models/post";

export default function PostDetail() {
  const [post, setPost] = useState<PostInterface | null>(null);
  const isUserAdmin = useRecoilValue(isUserAdminState);
  const theme = useRecoilValue(themeState);
  const params = useParams();
  const navigate = useNavigate();

  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    setPost({ id: docSnap.id, ...(docSnap.data() as PostInterface) });
  };

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));

      const storageRef = ref(storage, `postsImg/${post?.title}`);
      const files = await listAll(storageRef);
      await Promise.all(files.items.map((fileRef) => deleteObject(fileRef)));

      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, []);

  return (
    <>
      {post ? (
        <>
          <div className={styles.postDetail}>
            <div className={styles.title}>{post?.title}</div>
            <div className={styles.info}>
              <div>
                <span className={styles.category}>{post?.category}</span>
                <span className={styles.date}>
                  {post?.createdAt.toDate().toLocaleDateString("ko", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hourCycle: "h11",
                  })}
                </span>
              </div>
              {isUserAdmin && (
                <div className={styles.utils}>
                  <Link to={`/edit/${post?.id}`} className={styles.edit}>
                    수정
                  </Link>
                  <span onClick={handleDelete} className={styles.delete}>
                    삭제
                  </span>
                </div>
              )}
            </div>
            <div className={styles.summary}>
              <h1>Introduction</h1>
              {post?.summary}
            </div>
            <div className={styles.viewerContainer}>
              <Viewer
                initialValue={post?.content}
                theme={theme}
                plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                linkAttributes={{
                  target: "_blank",
                  rel: "noopener noreferrer",
                }}
              />
            </div>

            <Comments post={post} getPost={getPost} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
