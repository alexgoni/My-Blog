import Navbar from "components/Navbar";
import CategoryInfo from "components/CategoryInfo";
import PostList from "components/PostList";
import MainLayout from "components/MainLayout";
import Footer from "components/Footer";
import { useMobileDetector } from "module/useMobileDetector";

export default function Home() {
  const isMobileWidth = useMobileDetector();

  return (
    <>
      <Navbar isMobileWidth={isMobileWidth} />
      <MainLayout>
        <CategoryInfo />
        <PostList />
      </MainLayout>
      <Footer isMobileWidth={isMobileWidth} />
    </>
  );
}
