import { PostInterface } from "models/post";
import { useEffect } from "react";
import styles from "styles/post.module.scss";

export default function useIntersection(
  ref: React.RefObject<(HTMLDivElement | null)[]>,
  posts: PostInterface[]
) {
  useEffect(() => {
    const postBlocks = ref.current?.filter((block) => block !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          } else {
            entry.target.classList.remove(styles.visible);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (postBlocks) {
      postBlocks.forEach((postBlock) =>
        observer.observe(postBlock as HTMLDivElement)
      );
    }

    return () => {
      if (postBlocks) {
        postBlocks.forEach((postBlock) =>
          observer.unobserve(postBlock as HTMLDivElement)
        );
      }
    };
  }, [posts]);
}
