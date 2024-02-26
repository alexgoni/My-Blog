import { Pagination } from "@mui/material";
import { db } from "firebaseApp";
import { getDocumentCount } from "module/getDocumentCount";
import { useMobileDetector } from "module/useMobileDetector";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "styles/post.module.scss";

interface PaginationComponentProps {
  currentPage: number;
  setCurrentPage: (newValue: number) => void;
}

// 게시물이 없을 경우 pagination 삭제
export default function PaginationComponent({
  currentPage,
  setCurrentPage,
}: PaginationComponentProps) {
  const [documentCount, setDocumentCount] = useState<number>(0);
  const params = useParams();
  const isMobileWidth = useMobileDetector();

  const onChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const updatePostsNum = async () => {
    const count = await getDocumentCount(db, params);
    setDocumentCount(count);
  };

  useEffect(() => {
    updatePostsNum();
  }, [params]);

  return (
    <div className={styles.paginationContainer}>
      <Pagination
        count={Math.ceil(documentCount / 10)}
        color="primary"
        size={isMobileWidth ? "small" : "large"}
        page={currentPage}
        onChange={onChange}
      />
    </div>
  );
}
