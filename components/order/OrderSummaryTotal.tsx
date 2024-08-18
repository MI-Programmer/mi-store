import ActionsOrderModal from "@/components/order/ActionsOrderModal";

import { DISCOUNT, SHIPPING_PRICE, TAX_PRICE } from "@/utils/constants";
import { formatCurrency } from "@/utils/helper";

interface OrderSummaryTotalProps {
  id: string;
  totalPrice: number;
  status: string;
  isAdmin?: boolean;
}

const OrderSummaryTotal = ({
  id,
  totalPrice,
  status,
  isAdmin,
}: OrderSummaryTotalProps) => {
  const isCanceled = status === "CANCELED";

  return (
    <>
      <div className="my-6 flex w-full items-center justify-center sm:justify-end">
        <div className="w-full">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xl font-normal leading-8 text-gray-500">
              Subtotal
            </p>

            <p className="text-xl font-semibold leading-8 text-gray-900">
              {formatCurrency(totalPrice - TAX_PRICE - SHIPPING_PRICE)}
            </p>
          </div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xl font-normal leading-8 text-gray-500">
              Shipping Charge
            </p>

            <p className="text-xl font-semibold leading-8 text-gray-900">
              {formatCurrency(SHIPPING_PRICE)}
            </p>
          </div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xl font-normal leading-8 text-gray-500">Taxes</p>

            <p className="text-xl font-semibold leading-8 text-gray-900">
              {formatCurrency(TAX_PRICE)}
            </p>
          </div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xl font-normal leading-8 text-gray-500">
              Discount
            </p>
            <p className="text-xl font-semibold leading-8 text-gray-900">
              {formatCurrency(DISCOUNT)}
            </p>
          </div>
          <div className="flex items-center justify-between border-y border-gray-300 py-6">
            <p className="text-2xl font-semibold leading-9 text-gray-900">
              Total
            </p>
            <p className="text-2xl font-bold leading-9 text-indigo-600">
              {formatCurrency(totalPrice)}
            </p>
          </div>
        </div>
      </div>
      <div className="data">
        {!isAdmin && !isCanceled && (
          <>
            <p className="mb-11 text-lg font-normal leading-8 text-gray-500">
              We&apos;ll be sending a shipping confirmation email when the items
              shipped successfully.
            </p>

            <h6 className="mb-3 text-2xl font-bold leading-9 text-black">
              Thank you for shopping with us!
            </h6>

            <p className="inline text-xl font-medium leading-8 text-indigo-600">
              MI STORE
            </p>
          </>
        )}

        {!isCanceled && status !== "DELIVERED" && (
          <ActionsOrderModal id={id} status={status} isAdmin={isAdmin} />
        )}
      </div>
    </>
  );
};

export default OrderSummaryTotal;
