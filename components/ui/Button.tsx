import Link from "next/link";
import { MouseEventHandler } from "react";

import Spinner from "@/components/ui/Spinner";
import { classNames } from "@/utils/helper";

const style: any = {
  primary:
    "items-center justify-center gap-2 rounded-md bg-indigo-600 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-500",
  secondary:
    "flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-700 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-100 disabled:bg-gray-200 disabled:hover:text-gray-900 disabled:cursor-not-allowed",
  outline:
    "mb-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-black py-2 text-sm font-medium text-black focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed",
  danger:
    "items-center justify-center gap-2 rounded-md bg-red-700 font-medium text-white hover:bg-red-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-300 disabled:cursor-not-allowed disabled:bg-red-800",
  small: "flex px-2.5 py-1 text-xs",
  base: "flex px-3 py-2 text-sm sm:px-5 md:px-8",
  large: "inline-flex px-8 py-3 text-base",
};

interface ButtonProps {
  children: any;
  type?: string;
  size?: string;
  spinner?: boolean;
  className?: string;
  as?: string;
  href?: string;
  submit?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  type = "primary",
  size = "base",
  spinner = true,
  className,
  as,
  href,
  submit = true,
  disabled,
  onClick,
}: ButtonProps) => {
  if (as === "Link")
    return (
      <Link
        href={href ?? ""}
        className={classNames(className, style[type], style[size])}
      >
        {children}
      </Link>
    );

  return (
    <button
      type={submit ? "submit" : "button"}
      className={classNames(className, style[type], style[size])}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled && spinner && <Spinner />} {children}
    </button>
  );
};

export default Button;
