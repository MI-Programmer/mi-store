import Image from "next/image";

import { formatCurrency } from "@/utils/helper";

interface OrderItemProps {
  item: {
    product: { image: string; name: string; price: number };
    quantity: number;
    selectedSize: string;
    selectedColor: string;
  };
}

const OrderItem = ({ item }: OrderItemProps) => {
  const { product, quantity, selectedSize, selectedColor } = item;

  return (
    <div className="grid w-full grid-cols-7 border-y border-gray-300 py-6">
      <div className="relative col-span-7 min-[500px]:col-span-2 md:col-span-1">
        <Image
          src={product.image}
          alt="Skin Care Kit image"
          fill
          className="w-full rounded-xl object-cover"
        />
      </div>

      <div className="col-span-7 flex flex-col justify-center max-sm:mt-5 min-[500px]:col-span-5 min-[500px]:pl-5 md:col-span-6">
        <div className="flex flex-col justify-between min-[500px]:flex-row min-[500px]:items-center">
          <div className="">
            <h5 className="mb-4 text-2xl font-semibold leading-9 text-black">
              {product.name}
            </h5>

            <p className="text-xl font-normal leading-8 text-gray-500">
              Quantity :{" "}
              <span className="font-semibold text-black">{quantity}</span>
            </p>

            <p className="text-xl font-normal leading-8 text-gray-500">
              Size :{" "}
              <span className="font-semibold text-black">{selectedSize}</span>
            </p>

            <p className="text-xl font-normal leading-8 text-gray-500">
              Color :{" "}
              <span className="font-semibold text-black">{selectedColor}</span>
            </p>
          </div>

          <h5 className="mt-3 text-3xl font-semibold leading-10 text-black sm:text-right">
            {formatCurrency(quantity * product.price)}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
