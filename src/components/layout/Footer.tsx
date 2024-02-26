import { SiVelog } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import styles from "styles/layout.module.scss";

interface FooterProps {
  isMobileWidth: boolean;
}

export default function Footer({ isMobileWidth }: FooterProps) {
  const handleOpenNewTab = (url: string) => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footer__title}>
        <h1>{isMobileWidth ? `PS` : `Problem Solver`}</h1>
      </div>
      <div className={styles.footer__links}>
        <FaGithub
          size={24}
          onClick={() => handleOpenNewTab("https://github.com/alexgoni")}
          className={styles.footer__icon}
        />
        <SiVelog
          size={24}
          onClick={() => handleOpenNewTab("https://velog.io/@alexgoni/posts")}
          className={styles.footer__icon}
        />
      </div>
      <div className={styles.footer__copyright}>
        © 2024 Problem Solver. All Rights Reserved.
      </div>
    </div>
  );
}
