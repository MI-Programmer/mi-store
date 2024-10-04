"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { cloneElement, ReactElement, useRef, useState } from "react";

interface FormRowProps {
  children: ReactElement<any, any>;
  label?: string;
  labelComponent?: ReactElement;
  errors?: string;
}

const FormRow = ({ children, label, labelComponent, errors }: FormRowProps) => {
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const inputType = useRef(children.props.type);

  const isHideInput =
    inputType.current === "password"
      ? { type: isOpenPassword ? "text" : "password" }
      : {};

  return (
    <div className="relative grow">
      {label && (
        <label htmlFor={children.props.name} className="label">
          {label}
        </label>
      )}
      {labelComponent && labelComponent}

      <div className="relative">
        {cloneElement(children, { id: children.props.name, ...isHideInput })}

        {inputType.current === "password" && (
          <div
            className="absolute right-4 top-[8%] z-10 translate-y-[15%] cursor-pointer"
            onClick={() => setIsOpenPassword((open) => !open)}
          >
            {isOpenPassword ? (
              <EyeIcon className="h-6 w-6" />
            ) : (
              <EyeSlashIcon className="h-6 w-6" />
            )}
          </div>
        )}
      </div>

      {errors && <p className="text-sm font-medium text-red-600">{errors}</p>}
    </div>
  );
};

export default FormRow;
