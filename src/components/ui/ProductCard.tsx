"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/getProducts";
import {Card,CardContent} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const item = { ...product, quantity: 1 };
    addToCart(item);
    console.log("Added to cart:", item);
  };

  return (
    <div className="max-w-sm mx-auto">
      <Card>
        <CardContent className="p-4 flex flex-col gap-4 items-center">
          <Link
            href={`/product/${product.id}`}
            className="w-full flex flex-col items-center"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-32 w-32 object-contain"
            />
            <h2 className="text-lg font-semibold text-center">
              {product.title}
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              {product.description}
            </p>
            <p className="font-bold text-blue-600">Rs {product.price}</p>
          </Link>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </CardContent>
      </Card>
    </div>
  );
};
