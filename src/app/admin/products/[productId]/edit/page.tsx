import { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import ProductForm from "@/components/products/ProductForm";
import Empty from "@/components/ui/Empty";
import { getProductById } from "@/actions/products";

export const metadata: Metadata = { title: "Edit product" };

const ProductEdit = async ({ params: { productId } }: { params: Params }) => {
  const product = await getProductById(productId, [
    "id",
    "name",
    "price",
    "colors",
    "sizes",
    "category",
    "description",
  ]);

  if (!product) return <Empty>product</Empty>;

  return (
    <div className="rounded-lg border border-gray-200 px-8 py-6 shadow-md">
      <h1 className="mb-6 text-center text-4xl font-bold">
        Update product &quot;{product?.name}&quot;
      </h1>

      <ProductForm product={product} />
    </div>
  );
};

export default ProductEdit;
