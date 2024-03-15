import { useEffect, useState } from "react";

const MOBILE_WIDTH = 648;

export const useMobileDetector = () => {
  const [isMobileWidth, setIsMobileWidth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileWidth(width <= MOBILE_WIDTH);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobileWidth;
};
