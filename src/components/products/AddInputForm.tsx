import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import Button from "@/components/ui/Button";

const optionSizes = ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];

interface AddInputFormProps {
  inputColors: string[];
  inputSizes: { name: string; inStock: boolean }[];
  setInputColors: React.Dispatch<React.SetStateAction<string[]>>;
  setInputSizes: React.Dispatch<
    React.SetStateAction<{ name: string; inStock: boolean }[]>
  >;
  disabled: boolean;
}

const AddInputForm = ({
  inputColors,
  inputSizes,
  setInputColors,
  setInputSizes,
  disabled,
}: AddInputFormProps) => {
  const [isOpenInput, setIsOpenInput] = useState({ colors: true, sizes: true });

  const handleToggleInput = (input: "colors" | "sizes") =>
    setIsOpenInput((curr) => ({ ...curr, [input]: !curr[input] }));

  const handleAddInputColor = () => setInputColors((curr) => [...curr, ""]);

  const handleAddInputSizes = () =>
    setInputSizes((curr) => [...curr, { name: "", inStock: true }]);

  const handleChangeInputColor = (updateValue: string, indexChange: Number) =>
    setInputColors((curr) =>
      curr.map((value, index) => (index === indexChange ? updateValue : value)),
    );

  const handleChangeSelect = (updateValue: string, indexChange: Number) => {
    setInputSizes((curr) =>
      curr.map((item, index) =>
        index === indexChange ? { ...item, name: updateValue } : item,
      ),
    );
  };

  const handleToggleCheckbox = (indexChange: Number) => {
    setInputSizes((curr) =>
      curr.map((item, index) =>
        index === indexChange ? { ...item, inStock: !item.inStock } : item,
      ),
    );
  };

  const handleDeleteInputColor = (indexDelete: Number) =>
    setInputColors((curr) => curr.filter((_, index) => index !== indexDelete));

  const handleDeleteInputSize = (indexDelete: Number) =>
    setInputSizes((curr) => curr.filter((_, index) => index !== indexDelete));

  return (
    <div className="flex items-start gap-4">
      <div className="max-h-72 w-full space-y-4 overflow-auto rounded-md bg-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h4 className="label">
            Colors {inputColors.length ? `(${inputColors.length})` : null} :
          </h4>

          <div className="flex items-center gap-2">
            <Button size="small" onClick={handleAddInputColor} submit={false}>
              Add color <PlusIcon className="-ml-1 h-5 w-5" />
            </Button>

            <button
              className="cursor-pointer"
              onClick={() => handleToggleInput("colors")}
              type="button"
            >
              {isOpenInput.colors ? (
                <ChevronUpIcon className="h-6 w-6" />
              ) : (
                <ChevronDownIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {inputColors.length && isOpenInput.colors
          ? inputColors.map((value, index) => (
              <div key={index} className="flex items-center gap-2">
                <h4 className="inline-block w-10">{index + 1} . </h4>
                <input
                  type="text"
                  onChange={(e) =>
                    handleChangeInputColor(e.target.value, index)
                  }
                  value={inputColors[index]}
                  className="input"
                  disabled={disabled}
                />
                <button
                  onClick={() => handleDeleteInputColor(index)}
                  type="button"
                >
                  <TrashIcon className="h-6 w-6 text-red-800" />
                </button>
              </div>
            ))
          : null}
      </div>

      <div className="max-h-72 w-full space-y-4 overflow-auto rounded-md bg-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h4 className="label">
            Sizes {inputSizes.length ? `(${inputSizes.length})` : null} :
          </h4>

          <div className="flex items-center gap-2">
            <Button size="small" onClick={handleAddInputSizes} submit={false}>
              Add size <PlusIcon className="-ml-1 h-5 w-5" />
            </Button>

            <button
              className="cursor-pointer"
              onClick={() => handleToggleInput("sizes")}
              type="button"
            >
              {isOpenInput.sizes ? (
                <ChevronUpIcon className="h-6 w-6" />
              ) : (
                <ChevronDownIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {inputSizes.length && isOpenInput.sizes
          ? inputSizes.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <h4 className="inline-block w-12">{index + 1} . </h4>

                <select
                  className="inputSelect"
                  onChange={(e) => handleChangeSelect(e.target.value, index)}
                  value={inputSizes[index].name}
                  disabled={disabled}
                >
                  <option selected>Choose a size</option>
                  {optionSizes.map((value) => {
                    const disabled = inputSizes.some(
                      (item) => item.name === value,
                    );

                    return (
                      <option key={value} value={value} disabled={disabled}>
                        {value}
                      </option>
                    );
                  })}
                </select>

                <div className="flex w-[70%] items-center">
                  <input
                    type="checkbox"
                    checked={inputSizes[index].inStock}
                    onChange={() => handleToggleCheckbox(index)}
                    id={"checked-checkbox" + index}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={"checked-checkbox" + index}
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    In stock
                  </label>
                </div>

                <button
                  onClick={() => handleDeleteInputSize(index)}
                  type="button"
                >
                  <TrashIcon className="h-6 w-6 text-red-800" />
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AddInputForm;
