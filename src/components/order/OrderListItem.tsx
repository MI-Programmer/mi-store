import Link from "next/link";
import { format } from "date-fns";

import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { formatCurrency } from "@/utils/helper";

interface OrderListItemProps {
  order: Order;
  isAdmin?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  totalPrice: number;
  status: keyof typeof statusColors;
  createdAt: Date;
  updatedAt: Date;
  user: { name: string | null; shippingAddress: string | null };
  items: {}[];
}

const statusColors = {
  PROCESSING: "yellow",
  SHIPPED: "blue",
  DELIVERED: "green",
  CANCELED: "red",
} as const;

const OrderListItem = ({ order, isAdmin }: OrderListItemProps) => {
  const { id, createdAt, totalPrice, status } = order ?? {};

  return (
    <div
      className={`grid grid-cols-2 items-center gap-y-4 rounded-md border bg-white px-6 py-4 shadow-sm sm:grid-cols-3 ${isAdmin ? "lg:grid-cols-6" : "lg:grid-cols-5"}`}
    >
      <div>
        <h3 className="text-base font-medium text-gray-500">Order ID:</h3>

        <p className="mt-1.5 text-base font-semibold text-gray-900">
          <Link
            href={
              isAdmin ? `/admin/user-orders/${id}` : `/account/orders/${id}`
            }
            className="hover:underline"
          >
            #{id.slice(0, 10)} ...
          </Link>
        </p>
      </div>

      {isAdmin && (
        <div>
          <h3 className="text-base font-medium text-gray-500">Username :</h3>

          <p className="mt-1.5 text-base font-semibold text-gray-900">
            {order.user.name}
          </p>
        </div>
      )}

      <div>
        <h3 className="text-base font-medium text-gray-500">Date:</h3>

        <p className="mt-1.5 text-base font-semibold text-gray-900">
          {format(createdAt, "dd/MM/yyyy")}
        </p>
      </div>

      <div>
        <h3 className="text-base font-medium text-gray-500">Total price :</h3>

        <p className="mt-1.5 text-base font-semibold text-gray-900">
          {formatCurrency(totalPrice)}
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-base font-medium text-gray-500">Status :</h3>

        <Badge color={statusColors[status]}>{status}</Badge>
      </div>

      <div
        className={`flex items-center justify-center lg:col-span-1 ${!isAdmin && "col-span-2"}`}
      >
        <div className="max-w-xs grow">
          <Button
            type="secondary"
            as="Link"
            href={
              isAdmin ? `/admin/user-orders/${id}` : `/account/orders/${id}`
            }
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderListItem;
