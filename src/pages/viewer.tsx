import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import Layout from "components/layout/Layout";
import { PostProps } from "components/post/PostList";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "components/layout/Loading";
import Comments from "components/post/Comments";
import styles from "styles/post.module.scss";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserAdminState } from "recoil/user";
import { toast } from "react-toastify";

export default function ViewerPage() {
  const [post, setPost] = useState<PostProps | null>(null);
  const isUserAdmin = useRecoilValue(isUserAdminState);
  const params = useParams();
  const navigate = useNavigate();

  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
  };

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));

      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, []);

  return (
    <Layout>
      {post ? (
        <>
          <div className={styles.postDetail}>
            <div className={styles.title}>{post?.title}</div>
            <div className={styles.info}>
              <div>
                <span className={styles.category}>{post?.category}</span>
                <span className={styles.date}>{post?.createdAt}</span>
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
            <Viewer initialValue={post?.content} />
            <Comments post={post} getPost={getPost} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
