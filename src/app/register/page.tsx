import { Metadata } from "next";

import AuthPage from "@/components/auth/AuthPage";

export const metadata: Metadata = { title: "Register" };

const Register = () => {
  return <AuthPage />;
};

export default Register;
