"use client";

import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import FormRow from "@/components/ui/FormRow";

import { loginCreds, registerCreds } from "@/actions/auth";
import useStatusAction from "@/hooks/useStatusAction";
import { emailRegrex, passwordRegrex } from "@/utils/regrex";
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/utils/constants";

interface onSubmitProps {
  email?: string;
  password?: string;
}

const AuthForm = ({ isLogin }: { isLogin?: Boolean }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const action = isLogin ? loginCreds : registerCreds;
  const success = isLogin
    ? "Login successful! Welcome back"
    : "Registration successful! Please log in to continue";
  const pending = isLogin ? "Logging In..." : "Registering...";
  const { isPending, handleAction } = useStatusAction(action, success, pending);

  const onSubmit = ({ email, password }: onSubmitProps) => {
    handleAction({ email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormRow label="Email address" errors={errors?.email?.message as string}>
        <input
          {...register("email", {
            required: "Email is required",
            maxLength: {
              value: EMAIL_MAX_LENGTH,
              message: `Email address cannot exceed ${EMAIL_MAX_LENGTH} characters`,
            },
            pattern: { value: emailRegrex, message: "Invalid email address" },
          })}
          type="text"
          autoComplete="email"
          className="input mt-2"
        />
      </FormRow>

      <FormRow
        labelComponent={
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>

            {isLogin && (
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            )}
          </div>
        }
        errors={errors?.password?.message as string}
      >
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: PASSWORD_MIN_LENGTH,
              message: `Password must be ${PASSWORD_MIN_LENGTH} characters`,
            },
            maxLength: {
              value: PASSWORD_MAX_LENGTH,
              message: `Password cannot exceed ${PASSWORD_MAX_LENGTH} characters`,
            },
            pattern: {
              value: passwordRegrex,
              message: "Password must include 1 uppercase, lowercase, & number",
            },
          })}
          type="password"
          autoComplete="current-password"
          className="input mt-2"
        />
      </FormRow>

      {!isLogin && (
        <FormRow
          label="Confirm password"
          errors={errors?.confirmPassword?.message as string}
        >
          <input
            {...register("confirmPassword", {
              validate: (value: any) =>
                value === getValues().password || "Passwords do not match",
            })}
            type="password"
            autoComplete="current-password"
            className="input mt-2"
          />
        </FormRow>
      )}

      <Button className="w-full" disabled={isPending}>
        {isPending ? pending : isLogin ? "Login" : "Register"}
      </Button>
    </form>
  );
};

export default AuthForm;
