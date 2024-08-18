import Image from "next/image";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import AddProductToCart from "@/components/products/AddProductToCart";
import Breadcrumb from "@/components/products/Breadcrumb";
import BackButton from "@/components/ui/BackButton";
import Empty from "@/components/ui/Empty";
import { getProductById } from "@/actions/products";
import { formatCurrency } from "@/utils/helper";

interface ParamsProps {
  params: Params;
}

export const generateMetadata = async ({ params }: ParamsProps) => {
  const product = await getProductById(params.productId, ["name"]);
  return { title: product?.name ?? "Product" };
};

const Product = async ({ params: { productId } }: ParamsProps) => {
  const product = await getProductById(productId);

  const { name, image, price, category, description } = product ?? {};

  if (!product) return <Empty>product</Empty>;

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Breadcrumb name={name as string} category={category as string} />

        <BackButton />
      </div>

      <div className="mx-auto flex flex-col gap-8 rounded-lg bg-gray-100 p-8 shadow-md md:flex-row">
        <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg sm:h-[500px] md:w-1/2">
          <Image
            src={image ?? ""}
            alt={name ?? ""}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex w-full flex-col justify-between md:w-1/2">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              <span className="font-semibold text-gray-700">Name :</span> {name}
            </h2>

            <p className="mt-2 text-xl text-gray-600">
              <span className="font-semibold text-gray-700">Price : </span>
              {formatCurrency(price as number)}
            </p>

            <p className="text-md mt-1 capitalize text-gray-500">
              <span className="font-semibold text-gray-700">Category :</span>{" "}
              {category}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Description:
            </h3>

            <p className="text-gray-600">{description}</p>
          </div>

          <AddProductToCart product={product as any} />
        </div>
      </div>
    </div>
  );
};

export default Product;
