import { Link } from "react-router-dom";
import { SiVelog } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import styles from "styles/layout.module.scss";

interface FooterProps {
  isMobileWidth: boolean;
}

export default function Footer({ isMobileWidth }: FooterProps) {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__title}>
        <h1>{isMobileWidth ? `PS` : `Problem Solver`}</h1>
      </div>
      <div className={styles.footer__links}>
        <Link to="https://github.com/alexgoni">
          <FaGithub size={24} />
        </Link>
        <Link to="https://velog.io/@alexgoni/posts">
          <SiVelog size={24} />
        </Link>
      </div>
      <div className={styles.footer__copyright}>
        © 2024 Problem Solver. All Rights Reserved.
      </div>
    </div>
  );
}
