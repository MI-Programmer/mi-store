import { Suspense } from "react";

import OrderListItem, { Order } from "@/components/order/OrderListItem";
import Filter from "@/components/ui/Filter";
import Empty from "@/components/ui/Empty";
import Spinner from "@/components/ui/Spinner";
import Pagination from "@/components/ui/Pagination";
import { getOrdersLength, getOrdersUserLength } from "@/actions/order";

interface OrderListPageProps {
  orders: Order[];
  isAdmin?: boolean;
  page: number;
  filter: string;
}

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Canceled", value: "canceled" },
];

const OrderListPage = ({
  orders,
  isAdmin,
  page,
  filter,
}: OrderListPageProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 antialiased shadow-md sm:px-8 sm:py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-center text-3xl font-bold sm:text-4xl">
          {isAdmin ? "User orders" : "My Orders"}
        </h1>

        <Filter isSelect={true} name="Status :" filterOptions={filterOptions} />
      </div>

      <Suspense fallback={<Spinner mini={false} />} key={page + filter}>
        <div className="mt-6 flow-root space-y-4 sm:mt-8">
          {orders.length ? (
            orders.map((order) => (
              <OrderListItem isAdmin={isAdmin} key={order.id} order={order} />
            ))
          ) : (
            <Empty>orders</Empty>
          )}
        </div>

        <Pagination
          page={page}
          filter={filter}
          getItemsLength={isAdmin ? getOrdersLength : getOrdersUserLength}
        />
      </Suspense>
    </div>
  );
};

export default OrderListPage;
