import { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import ProductsPage from "@/components/products/ProductsPage";
import { getAllProducts } from "@/actions/products";

export const metadata: Metadata = { title: "Products" };

const Products = async ({ searchParams }: { searchParams: Params }) => {
  const page = Number(searchParams.page) || 1;
  const filter = searchParams.filter ?? "all";

  const products = await getAllProducts(page, filter);

  return <ProductsPage products={products} page={page} filter={filter} />;
};

export default Products;
