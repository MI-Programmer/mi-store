"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { JsonValue } from "@prisma/client/runtime/library";

import AddInputForm from "@/components/products/AddInputForm";
import FormRow from "@/components/ui/FormRow";
import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import useStatusAction from "@/hooks/useStatusAction";
import { createProduct, updateProduct } from "@/actions/products";

interface DataProps {
  name: string;
  price: number;
  image: FileList;
  category: string;
  description: string;
}

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    price: number;
    colors: string[];
    sizes: JsonValue;
    category: string;
    description: string;
  } | null;
}

const ProductForm = ({ product }: ProductFormProps) => {
  const { id, name, price, colors, sizes, category, description } =
    product ?? {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>({
    defaultValues: { name, price, category, description },
  });
  const [inputColors, setInputColors] = useState(colors ?? ([] as string[]));
  const [inputSizes, setInputSizes] = useState(
    (sizes as { name: string; inStock: boolean }[]) ??
      ([] as { name: string; inStock: boolean }[]),
  );

  const handleActionWithData = product
    ? updateProduct.bind(
        null,
        {
          colors: inputColors,
          sizes: inputSizes,
        },
        id as string,
      )
    : createProduct.bind(null, {
        colors: inputColors,
        sizes: inputSizes,
      });

  const { isPending, handleAction } = useStatusAction(
    handleActionWithData,
    product
      ? "Successfully updated a product"
      : "Successfully created a new product",
    product ? "Updating..." : "Creating...",
  );

  const onSubmit = async (data: DataProps, e: any) => {
    const formData = new FormData(e.target);
    await handleAction(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl space-y-4 text-left"
    >
      <div className="-mb-4 flex items-center justify-end">
        <BackButton />
      </div>

      <div className="flex gap-4">
        <FormRow label="Name :" errors={errors?.name?.message as string}>
          <input
            type="text"
            placeholder="Product name"
            {...register("name", { required: "This field is required" })}
            className="input"
            disabled={isPending}
          />
        </FormRow>

        <FormRow label="Price :" errors={errors?.price?.message as string}>
          <input
            type="number"
            placeholder="10"
            {...register("price", { required: "This field is required" })}
            className="input"
            disabled={isPending}
          />
        </FormRow>
      </div>

      <AddInputForm
        inputColors={inputColors}
        inputSizes={inputSizes}
        setInputColors={setInputColors}
        setInputSizes={setInputSizes}
        disabled={isPending}
      />

      <div className="flex gap-4">
        <FormRow label="Images :" errors={errors?.image?.message as string}>
          <input
            type="file"
            {...register("image", {
              required: product ? false : "This field is required",
            })}
            className="inputFile"
            accept="image/*"
            disabled={isPending}
          />
        </FormRow>

        <FormRow
          label="Category :"
          errors={errors?.category?.message as string}
        >
          <select
            {...register("category", { required: "This field is required" })}
            className="inputSelect"
            disabled={isPending}
          >
            <option selected value="">
              Choose a category...
            </option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </FormRow>
      </div>

      <FormRow
        label="Description :"
        errors={errors?.description?.message as string}
      >
        <textarea
          {...register("description", { required: "This field is required" })}
          placeholder="Write description product here..."
          className="input h-32 resize-none"
          disabled={isPending}
        />
      </FormRow>

      <div className="flex justify-end gap-2">
        <Button disabled={isPending}>
          {isPending
            ? product
              ? "Updating..."
              : "Creating..."
            : product
              ? "Update product"
              : "Create product"}
        </Button>

        <Button
          as="Link"
          type="danger"
          href="/account/products"
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
