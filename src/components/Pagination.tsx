import useInfiniteScroll from "modules/hooks/useInfiniteScroll";
import React, { useState, useEffect, useRef } from "react";
import styles from "styles/post.module.scss";

function PostBlock() {
  return (
    <div className={styles.postBlock}>
      <h1 className={styles.title}>Post Title</h1>
      <div className={styles.summary}>Post Summary</div>
    </div>
  );
}

function Pagination() {
  const [data, setData] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);

  const loadMoreData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setData((prev) => [...prev, ...Array.from({ length: 12 }, () => 1)]);
    }, 1000);
  };

  // useInfiniteScroll(loading, sentinelRef, loadMoreData);

  return (
    <div className={styles.pagination}>
      {data.map((item, idx) => (
        <PostBlock key={idx} />
      ))}
      {/* 무한 스크롤을 위한 sentinel element */}
      <div className={styles.ref} ref={sentinelRef}></div>
      {loading && <div className={styles.loading}>Loading...</div>}
    </div>
  );
}

export default Pagination;
