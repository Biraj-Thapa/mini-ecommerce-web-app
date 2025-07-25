"use client";

import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "@/context/CartContext";

export function CartIcon() {
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce(
    (acc, item) => acc + (item.quantity ?? 1),
    0
  );

  return (
    <div className="relative">
      <Link href="/cart">
        <IoCartOutline className="text-3xl text-gray-800" />
      </Link>
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {totalQuantity}
        </span>
      )}
    </div>
  );
}
