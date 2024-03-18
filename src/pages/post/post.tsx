import Layout from "components/layout/Layout";
import PostDetail from "components/post/PostDetail";
import useScrollToTop from "modules/hooks/useScrollToTop";

export default function Post() {
  useScrollToTop();
  return (
    <>
      <Layout>
        <PostDetail />
      </Layout>
    </>
  );
}
