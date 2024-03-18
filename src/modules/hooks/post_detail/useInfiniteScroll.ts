import { QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect } from "react";

interface useInfiniteScrollProps {
  lastPostSnapshot: QueryDocumentSnapshot | null;
  loading: boolean;
  sentinelRef: React.RefObject<HTMLDivElement>;
  loadMoreData: () => Promise<void>;
}

export default function useInfiniteScroll({
  lastPostSnapshot,
  loading,
  sentinelRef,
  loadMoreData,
}: useInfiniteScrollProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading && lastPostSnapshot) {
            loadMoreData();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [lastPostSnapshot]);
}
