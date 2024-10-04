"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

import ButtonIcon from "@/components/ui/ButtonIcon";
import Empty from "@/components/ui/Empty";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/utils/helper";

const CartList = () => {
  const { cart, deleteCartItem, incCartItemQuantity, decCartItemQuantity } =
    useCart();

  const handleDelete = (id: string, name: string) => {
    deleteCartItem(id);
    toast.success(`Successfully deleted "${name}" from cart`);
  };

  return (
    <div className="grow space-y-4">
      {cart.length ? (
        cart.map((item) => (
          <div key={item.id} className="grid grid-cols-3 items-start gap-4">
            <div className="col-span-2 flex items-start gap-4">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-md bg-gray-100 p-2 max-sm:h-24 max-sm:w-24">
                <Image
                  src={item.image}
                  fill
                  alt={item.name}
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col">
                <h3 className="text-base font-bold text-gray-800">
                  {item.name}
                </h3>

                <p className="mt-0.5 text-xs font-semibold text-gray-500">
                  Color: {item.selectedColor}
                </p>

                <p className="mt-0.5 text-xs font-semibold text-gray-500">
                  Size: {item.selectedSize?.name}
                </p>

                <button
                  type="button"
                  className="mt-6 flex shrink-0 items-center gap-1 text-xs font-semibold text-red-500"
                  onClick={() => handleDelete(item.id, item.name)}
                >
                  <TrashIcon className="h-5 w-5" />
                  REMOVE
                </button>
              </div>
            </div>

            <div className="ml-auto flex h-full flex-col items-center justify-evenly">
              <h4 className="text-lg font-bold text-gray-800 max-sm:text-base">
                {formatCurrency(item.price * item.quantity)}
              </h4>

              <div className="flex items-center text-center">
                <ButtonIcon onClick={() => decCartItemQuantity(item.id)}>
                  <MinusIcon className="h-5 w-5" />
                </ButtonIcon>

                <span className="w-10 font-bold">{item.quantity}</span>

                <ButtonIcon onClick={() => incCartItemQuantity(item.id)}>
                  <PlusIcon className="h-5 w-5" />
                </ButtonIcon>
              </div>
            </div>

            <hr className="col-span-3 border-gray-300" />
          </div>
        ))
      ) : (
        <Empty>cart item</Empty>
      )}
    </div>
  );
};

export default CartList;
