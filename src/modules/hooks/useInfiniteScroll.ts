import { useEffect } from "react";

export default function useInfiniteScroll(
  loading: boolean,
  sentinelRef: React.RefObject<HTMLDivElement>,
  loadMoreData: () => Promise<void>
) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading) {
            loadMoreData();
          }
        });
      },
      { threshold: 0.5 }
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
}
