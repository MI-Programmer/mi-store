import { ReactNode } from "react";

interface ButtonIconProps {
  children: ReactNode;
  onClick?: () => void;
}

const ButtonIcon = ({ children, onClick }: ButtonIconProps) => {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-center font-semibold text-white hover:bg-indigo-500 focus:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
