import Footer from "components/Footer";
import MainLayout from "components/MainLayout";
import Navbar from "components/Navbar";
import PostDetail from "components/PostDetail";
import { useMobileDetector } from "module/useMobileDetector";
import React from "react";

export default function Post() {
  const isMobileWidth = useMobileDetector();
  return (
    <>
      <Navbar isMobileWidth={isMobileWidth} />
      <MainLayout>
        <PostDetail />
      </MainLayout>
      <Footer isMobileWidth={isMobileWidth} />
    </>
  );
}
