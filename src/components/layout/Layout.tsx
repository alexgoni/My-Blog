import { useMobileDetector } from "module/useMobileDetector";
import React, { ReactNode } from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import styles from "styles/layout.module.scss";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return <div className={styles.main}>{children}</div>;
}

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isMobileWidth = useMobileDetector();

  return (
    <>
      <Navbar isMobileWidth={isMobileWidth} />
      <MainLayout>{children}</MainLayout>
      <Footer isMobileWidth={isMobileWidth} />
    </>
  );
}
