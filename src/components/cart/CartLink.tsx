"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

import { useCart } from "@/contexts/CartContext";

const CartLink = () => {
  const { amountCart } = useCart();

  return (
    <Link href="/cart" className="relative text-orange-600">
      <span className="absolute -right-2 -top-2 rounded-full bg-white px-1.5 py-1 text-xs font-medium text-red-600">
        {amountCart}
      </span>

      <ShoppingCartIcon className="h-8 w-8" />
    </Link>
  );
};

export default CartLink;
