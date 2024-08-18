import { format } from "date-fns";

import { SHIPPING_DAYS } from "@/utils/constants";
import BackButton from "@/components/ui/BackButton";
import Badge from "@/components/ui/Badge";

export interface OrderSummaryInfoProps {
  id: string;
  username: string;
  status: keyof typeof statusColors;
  createdAt: Date;
  shippingAddress: string;
  email?: string;
  phone?: string | null;
}

interface OrderDetailBoxProps {
  children: any;
  label: string;
  className?: string;
}

export const statusColors = {
  PROCESSING: "yellow",
  SHIPPED: "blue",
  DELIVERED: "green",
  CANCELED: "red",
} as const;

const OrderSummaryInfo = ({
  id,
  username,
  status,
  createdAt,
  shippingAddress,
  email,
  phone,
}: OrderSummaryInfoProps) => {
  const isDone = status === "CANCELED" || status === "DELIVERED";

  return (
    <>
      {!email && !isDone && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="mb-4 text-4xl font-bold leading-10 text-black sm:text-4xl">
              Your Order Confirmed
            </h1>

            <BackButton />
          </div>

          <h6 className="mb-2 text-xl font-medium leading-8 text-black">
            Hello, {username}
          </h6>

          <p className="mb-6 border-b border-gray-300 pb-6 text-lg font-normal leading-8 text-gray-500">
            Your order has been completed and be delivery in only{" "}
            {SHIPPING_DAYS} days.
          </p>
        </>
      )}

      {isDone && (
        <p
          className={`mb-6 border-b border-gray-300 pb-6 font-medium ${status === "CANCELED" ? "text-red-600" : "text-green-600"}`}
        >
          This order has already been {status}.
        </p>
      )}

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4">
        <OrderDetailBox className="lg:col-span-2" label="Order">
          #{id}
        </OrderDetailBox>

        <OrderDetailBox label="Delivery Date">
          {format(createdAt ?? 0, "dd MMM yyyy")}
        </OrderDetailBox>

        {email && (
          <>
            <OrderDetailBox label="Username :">{username}</OrderDetailBox>

            <OrderDetailBox label="Email :">{email}</OrderDetailBox>

            <OrderDetailBox label="Phone :">{phone}</OrderDetailBox>
          </>
        )}

        <OrderDetailBox label="Payment Method">Cash on Delivery</OrderDetailBox>

        <OrderDetailBox className="lg:col-span-2" label="Status">
          <Badge color={statusColors[status]}>{status}</Badge>
        </OrderDetailBox>

        <OrderDetailBox className="lg:col-span-2" label="Shipping address">
          {shippingAddress}
        </OrderDetailBox>
      </div>
    </>
  );
};

const OrderDetailBox = ({
  children,
  className,
  label,
}: OrderDetailBoxProps) => {
  return (
    <div className={`box group ${className}`}>
      <p className="mb-3 text-base font-normal leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
        {label}
      </p>

      <h6 className="text-lg font-semibold leading-9 text-black">{children}</h6>
    </div>
  );
};

export default OrderSummaryInfo;
