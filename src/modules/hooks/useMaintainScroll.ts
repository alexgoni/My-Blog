import { useEffect, useState } from "react";

export default function useMaintainScroll() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition !== null) {
      window.scrollTo(0, parseInt(savedPosition));
      setScrollPosition(parseInt(savedPosition));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      sessionStorage.setItem("scrollPosition", currentPosition.toString());
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
