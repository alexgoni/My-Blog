import React, { ReactNode } from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import styles from "styles/layout.module.scss";
import { useMobileDetector } from "modules/hooks/useMobileDetector";

function MainLayout({ children }: { children: ReactNode }) {
  return <div className={styles.main}>{children}</div>;
}

export default function Layout({ children }: { children: ReactNode }) {
  const isMobileWidth = useMobileDetector();

  return (
    <>
      <Navbar isMobileWidth={isMobileWidth} />
      <MainLayout>{children}</MainLayout>
      <Footer isMobileWidth={isMobileWidth} />
    </>
  );
}
