import { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { getAllOrders } from "@/actions/order";
import OrderListPage from "@/components/order/OrderListPage";

export const metadata: Metadata = { title: "User orders" };

const UserOrders = async ({ searchParams }: { searchParams: Params }) => {
  const page = Number(searchParams.page) || 1;
  const filter = searchParams.filter ?? "all";

  const orders = await getAllOrders(page, filter);

  return (
    <OrderListPage isAdmin={true} orders={orders} page={page} filter={filter} />
  );
};

export default UserOrders;
