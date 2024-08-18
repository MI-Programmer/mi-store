import Image from "next/image";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";

import DeleteProduct from "@/components/products/DeleteProduct";
import Button from "@/components/ui/Button";
import { Product } from "@/components/products/ProductsPage";
import { formatCurrency } from "@/utils/helper";

interface ProductItemProps {
  product: Product;
  enableMutations?: boolean;
}

const ProductItem = ({ product, enableMutations }: ProductItemProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className={enableMutations ? "flex gap-2" : "hidden"}>
        <Button
          type="secondary"
          size="small"
          as="Link"
          href={`/admin/products/${product.id}/edit`}
        >
          Edit <PencilIcon className="h-4 w-4" />
        </Button>

        <DeleteProduct name={product.name} id={product.id} />
      </div>

      <div className="group relative">
        <div
          className={`relative aspect-square w-full overflow-hidden rounded-md bg-gray-200 ${!enableMutations && "group-hover:opacity-75"}`}
        >
          <Image
            src={product.image}
            fill
            className="object-cover object-center"
            alt={product.name}
          />
        </div>

        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              {!enableMutations ? (
                <Link href={`/products/${product.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </Link>
              ) : (
                <p>{product.name}</p>
              )}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {product.colors.join(" ")}
            </p>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
