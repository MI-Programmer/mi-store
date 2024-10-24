import { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import OrderItem from "@/components/order/OrderItem";
import OrderSummaryInfo, {
  statusColors,
} from "@/components/order/OrderSummaryInfo";
import OrderSummaryTotal from "@/components/order/OrderSummaryTotal";
import Empty from "@/components/ui/Empty";
import { getOrder } from "@/actions/order";

export const metadata: Metadata = { title: "Order summary" };

const OrderSummary = async ({ params }: { params: Params }) => {
  const order = await getOrder(params.orderId);
  const { id, createdAt, user, status, items, totalPrice } = order ?? {};

  if (!order) return <Empty>order</Empty>;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 px-8 antialiased shadow-md">
      <OrderSummaryInfo
        id={id as string}
        createdAt={createdAt as Date}
        status={status as keyof typeof statusColors}
        username={user?.name ?? ""}
        shippingAddress={user?.shippingAddress ?? ""}
      />

      {items?.map((item: any) => <OrderItem key={item.id} item={item} />)}

      <OrderSummaryTotal
        totalPrice={totalPrice as number}
        id={id as string}
        status={status as string}
      />
    </div>
  );
};

export default OrderSummary;
