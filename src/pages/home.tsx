import CategoryInfo from "components/post/CategoryInfo";
import PostList from "components/post/PostList";
import Layout from "components/layout/Layout";

export default function Home() {
  return (
    <>
      <Layout>
        <CategoryInfo />
        <PostList />
      </Layout>
    </>
  );
}
