import React, { ReactNode } from "react";
import styles from "styles/main.module.scss";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <div className={styles.main}>{children}</div>;
}
