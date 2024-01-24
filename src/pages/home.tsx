import Navbar from "components/Navbar";
import React from "react";
import Category from "./category";
import CategoryInfo from "components/CategoryInfo";
import PostList from "components/PostList";

export default function Home() {
  const categoryInfo = {
    category: "All",
    postNum: 0,
  };

  return (
    <div>
      <Navbar />
      <CategoryInfo />
      <PostList />
    </div>
  );
}
