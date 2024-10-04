"use client";

import { useForm } from "react-hook-form";

import FormRow from "@/components/ui/FormRow";
import Button from "@/components/ui/Button";
import { createOrder } from "@/actions/order";
import { useCart } from "@/contexts/CartContext";
import { UserTypes } from "@/app/cart/page";
import useStatusAction from "@/hooks/useStatusAction";
import { DISCOUNT, SHIPPING_PRICE, TAX_PRICE } from "@/utils/constants";
import { formatCurrency } from "@/utils/helper";

const CartCheckout = ({ user }: { user: UserTypes }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserTypes>({ defaultValues: user });
  const { cart, totalPrice, clearCart } = useCart();
  const { isPending, handleAction } = useStatusAction(
    createOrder,
    "Checkout successful! Your order has been placed",
    "Checking out...",
  );

  const total = totalPrice + SHIPPING_PRICE + TAX_PRICE - DISCOUNT;

  const onSubmit = async (userData: UserTypes) => {
    const orderItems = cart.map(
      ({ id, quantity, selectedColor, selectedSize }) => ({
        id,
        quantity,
        selectedColor,
        selectedSize: selectedSize?.name,
      }),
    );

    await handleAction({ userData, orderItems, totalPrice: total });
    clearCart();
  };

  return (
    <div className="h-max rounded-md border border-gray-200 bg-gray-100 p-4 shadow-md md:w-[40%]">
      <h3 className="border-b border-gray-300 pb-2 text-lg font-bold text-gray-800 max-sm:text-base">
        Order Summary
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div>
          <h3 className="mb-4 text-base font-semibold text-gray-800">
            Enter Details
          </h3>

          <div className="space-y-3">
            <FormRow label="Name :" errors={errors?.name?.message as string}>
              <input
                type="text"
                className="input"
                {...register("name", { required: "This field is required" })}
                placeholder="Enter your name"
                disabled={isPending}
              />
            </FormRow>

            <FormRow label="Phone :" errors={errors?.phone?.message as string}>
              <input
                type="number"
                className="input"
                {...register("phone", { required: "This field is required" })}
                placeholder="Enter your phone number"
                disabled={isPending}
              />
            </FormRow>

            <FormRow
              label="Shipping address :"
              errors={errors?.shippingAddress?.message as string}
            >
              <input
                type="text"
                className="input"
                {...register("shippingAddress", {
                  required: "This field is required",
                })}
                placeholder="Enter your shipping address"
                disabled={isPending}
              />
            </FormRow>
          </div>
        </div>

        <ul className="mt-6 space-y-3 text-gray-800">
          <li className="flex flex-wrap gap-2 text-sm">
            Payment method{" "}
            <span className="ml-auto font-bold md:text-xs lg:text-sm">
              Cash on Delivery
            </span>
          </li>

          <li className="flex flex-wrap gap-4 text-sm">
            Subtotal{" "}
            <span className="ml-auto font-bold">
              {formatCurrency(totalPrice)}
            </span>
          </li>

          {totalPrice ? (
            <>
              <li className="flex flex-wrap gap-4 text-sm">
                Shipping{" "}
                <span className="ml-auto font-bold">
                  {formatCurrency(SHIPPING_PRICE)}
                </span>
              </li>

              <li className="flex flex-wrap gap-4 text-sm">
                Tax{" "}
                <span className="ml-auto font-bold">
                  {formatCurrency(TAX_PRICE)}
                </span>
              </li>

              <li className="flex flex-wrap gap-4 text-sm">
                Discount{" "}
                <span className="ml-auto font-bold">
                  {formatCurrency(DISCOUNT)}
                </span>
              </li>

              <hr className="border-gray-300" />
              <li className="flex flex-wrap gap-4 text-sm font-bold">
                Total <span className="ml-auto">{formatCurrency(total)}</span>
              </li>
            </>
          ) : null}
        </ul>

        <div className="mt-6 flex flex-col space-y-3">
          {totalPrice ? <Button disabled={isPending}>Checkout</Button> : null}

          <Button type="outline" as="Link" href="/products">
            Continue Shopping
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CartCheckout;
