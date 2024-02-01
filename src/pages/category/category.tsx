import Layout from "components/layout/Layout";
import { CategoryPostList } from "components/post/PostList";
import React from "react";

export default function Category() {
  return (
    <>
      <Layout>
        <CategoryPostList />
      </Layout>
    </>
  );
}
