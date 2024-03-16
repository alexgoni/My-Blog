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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading) {
            console.log("hi");
            loadMoreData();
          }
        });
      },
      { threshold: 0.5 } // 화면에 반 이상 들어왔을 때 로딩 시작
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading]);

  const loadMoreData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setData((prev) => [...prev, ...Array.from({ length: 12 }, () => 1)]);
    }, 1000);
  };

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
