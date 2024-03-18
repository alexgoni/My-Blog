import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserAdminState } from "recoil/user";
import styles from "styles/post.module.scss";
import { db, storage } from "firebaseApp";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import Comments from "./Comments";
import Loading from "components/layout/Loading";
import { themeState } from "recoil/theme";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import { deleteObject, listAll, ref } from "firebase/storage";
import { PostInterface } from "models/post";
import { useMobileDetector } from "modules/hooks/useMobileDetector";
import useGetPostDetail from "modules/hooks/post_detail/useGetPostDetail";
import useUpdatePostDetail from "modules/hooks/post_detail/useUpdatePostDetail";

export default function PostDetail() {
  const [post, setPost] = useState<PostInterface | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const isUserAdmin = useRecoilValue(isUserAdminState);
  const theme = useRecoilValue(themeState);
  const params = useParams();
  const navigate = useNavigate();
  const isMobileWidth = useMobileDetector();

  const getPost = useGetPostDetail(setPost);
  const { updateViews, updatePinned } = useUpdatePostDetail();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (params?.id) updatePinned(params.id, event.target.checked);
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
    (async () => {
      if (!params?.id) return;
      await updateViews(params.id);
      await getPost(params.id);
    })();
  }, []);

  useEffect(() => {
    if (post?.pinned) setIsChecked(true);
  }, [post]);

  return (
    <>
      {post ? (
        <>
          <div className={styles.postDetail}>
            <div className={styles.title}>{post?.title}</div>
            <div className={styles.info}>
              <div className={styles.infoLeft}>
                <span className={styles.category}>{post?.category}</span>
                {!isMobileWidth && (
                  <span className={styles.date}>
                    {post?.createdAt.toDate().toLocaleDateString("ko", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hourCycle: "h11",
                    })}
                  </span>
                )}
              </div>
              <div className={styles.views}>조회수 {post?.views}</div>
              {isUserAdmin && (
                <>
                  <div className={styles.utils}>
                    <Link to={`/edit/${post?.id}`} className={styles.edit}>
                      수정
                    </Link>
                    <span onClick={handleDelete} className={styles.delete}>
                      삭제
                    </span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </>
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
