import LoginForm from "components/user/LoginForm";
import Navbar from "components/layout/navbar/Navbar";
import Footer from "components/layout/Footer";
import { useMobileDetector } from "modules/hooks/useMobileDetector";
import useScrollToTop from "modules/hooks/useScrollToTop";

export default function Login() {
  const isMobileWidth = useMobileDetector();
  useScrollToTop();

  return (
    <>
      <Navbar isMobileWidth={isMobileWidth} />
      <LoginForm />
      <Footer isMobileWidth={isMobileWidth} />
    </>
  );
}
