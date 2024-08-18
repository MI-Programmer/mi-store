import { Metadata } from "next";

import FormProduct from "@/components/products/ProductForm";

export const metadata: Metadata = { title: "Create product" };

const CreateProduct = () => {
  return (
    <div className="rounded-lg border border-gray-200 px-8 py-6 shadow-md">
      <h1 className="mb-6 text-center text-4xl font-bold">
        Create a new product
      </h1>

      <FormProduct />
    </div>
  );
};

export default CreateProduct;
