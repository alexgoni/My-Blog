import { Pagination } from "@mui/material";
import { useMobileDetector } from "module/useMobileDetector";
import { useState } from "react";
import styles from "styles/post.module.scss";

export default function PaginationComponent() {
  const isMobileWidth = useMobileDetector();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className={styles.paginationContainer}>
      <Pagination
        count={10}
        color="primary"
        size={isMobileWidth ? "small" : "large"}
        page={currentPage}
        onChange={onChange}
      />
    </div>
  );
}
