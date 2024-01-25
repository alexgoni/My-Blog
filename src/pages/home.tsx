import CategoryInfo from "components/CategoryInfo";
import PostList from "components/PostList";
import Layout from "components/Layout";

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
