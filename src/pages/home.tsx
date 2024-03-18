import { AllPostList, PinnedPosts } from "components/post/PostList";
import Layout from "components/layout/Layout";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <Layout>
        <PinnedPosts />
        <AllPostList />
      </Layout>
    </>
  );
}
