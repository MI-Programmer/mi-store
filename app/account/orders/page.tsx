import { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { getAllOrdersUser } from "@/actions/order";
import OrderListPage from "@/components/order/OrderListPage";

export const metadata: Metadata = { title: "Orders" };

const Orders = async ({ searchParams }: { searchParams: Params }) => {
  const page = Number(searchParams.page) || 1;
  const filter = searchParams.filter ?? "all";

  const orders = await getAllOrdersUser(page, filter);

  return <OrderListPage orders={orders} page={page} filter={filter} />;
};

export default Orders;
