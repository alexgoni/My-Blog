import LoginForm from "components/user/LoginForm";
import Layout from "components/layout/Layout";
import React from "react";
import Navbar from "components/layout/navbar/Navbar";
import Footer from "components/layout/Footer";
import { useMobileDetector } from "module/useMobileDetector";

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