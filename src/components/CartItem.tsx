"use client";

import React from "react";
import { Button } from "./ui/button";
import { Product } from "@/lib/getProducts";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: Product & { quantity: number };
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, addToCart, decreaseQty } = useCart();

  return (
    <div className="flex justify-between items-center border p-4 rounded mb-2">
      <div className="flex gap-4 items-center">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h4 className="font-bold">{item.title}</h4>
          <p className="text-sm text-muted-foreground">Rs {item.price}</p>
          <div className="flex items-center mt-1 space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => decreaseQty(item)}
              disabled={item.quantity <= 1}
            >
              −
            </Button>
            <span className="text-sm">{item.quantity}</span>
            <Button size="sm" variant="outline" onClick={() => addToCart(item)}>
              +
            </Button>
          </div>
        </div>
      </div>
      <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
        Remove
      </Button>
    </div>
  );
};

export default CartItem;
