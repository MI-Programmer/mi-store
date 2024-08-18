import { Suspense } from "react";

import ProductItem from "@/components/products/ProductItem";
import Pagination from "@/components/ui/Pagination";
import Spinner from "@/components/ui/Spinner";
import Filter from "@/components/ui/Filter";
import Button from "@/components/ui/Button";
import Empty from "@/components/ui/Empty";
import { getProductsLength } from "@/actions/products";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
}

interface ProductsPageProps {
  products: Product[];
  enableMutations?: boolean;
  filter: string;
  page: number;
}

const filters = [
  { value: "all", label: "All" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
];

const ProductsPage = ({
  products,
  enableMutations,
  page,
  filter,
}: ProductsPageProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 shadow-md sm:px-8 sm:py-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold sm:text-4xl">
          <span className="capitalize">{filter}</span> products
        </h1>

        <Filter filterOptions={filters} />
      </div>

      {enableMutations && (
        <div className="mt-6 text-center">
          <div className="inline-block w-full max-w-xs">
            <Button as="Link" href="/admin/products/new">
              Create product
            </Button>
          </div>
        </div>
      )}

      <Suspense fallback={<Spinner mini={false} />} key={page + filter}>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {products.length ? (
            products.map(({ id, name, price, image, colors }) => (
              <ProductItem
                key={name}
                product={{ id, name, price, image, colors }}
                enableMutations={enableMutations}
              />
            ))
          ) : (
            <Empty>products</Empty>
          )}
        </div>

        <Pagination
          page={page}
          filter={filter}
          getItemsLength={getProductsLength}
        />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
