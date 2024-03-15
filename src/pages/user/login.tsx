import LoginForm from "components/user/LoginForm";
import Navbar from "components/layout/navbar/Navbar";
import Footer from "components/layout/Footer";
import { useMobileDetector } from "modules/hooks/useMobileDetector";

export default function Login() {
  const isMobileWidth = useMobileDetector();
  return (
    <>
      <Navbar isMobileWidth={isMobileWidth} />
      <LoginForm />
      <Footer isMobileWidth={isMobileWidth} />
    </>
  );
}
