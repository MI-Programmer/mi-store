import Link from "next/link";
import Image from "next/image";

import GoogleLogo from "/public/google.png";
import AuthForm from "@/components/auth/AuthForm";
import ButtonAction from "@/components/ui/ButtonAction";
import { loginProvider } from "@/actions/auth";

const AuthPage = ({ isLogin }: { isLogin?: Boolean }) => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
          {isLogin ? "Login to your account" : "Resgister account"}
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthForm isLogin={isLogin} />
        <p className="my-5 text-center text-sm text-gray-500">
          or login with provider
        </p>

        <ButtonAction
          type="outline"
          action={loginProvider}
          data={{ provider: "google" }}
          success="Logging in with Google"
          pending="Please wait..."
        >
          <Image src={GoogleLogo} className="h-8 w-8" alt="Google logo" />
          Sign in with Google
        </ButtonAction>

        {!isLogin && (
          <div className="my-5 border-t pt-5 text-center text-sm text-gray-500">
            Existing account?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 underline"
            >
              Login here &raquo;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
