import Navbar from "components/Navbar";
import React from "react";
import CategoryInfo from "components/CategoryInfo";
import PostList from "components/PostList";
import MainLayout from "components/MainLayout";

export default function Home() {
  return (
    <>
      <Navbar />
      <MainLayout>
        <CategoryInfo />
        <PostList />
      </MainLayout>
    </>
  );
}
