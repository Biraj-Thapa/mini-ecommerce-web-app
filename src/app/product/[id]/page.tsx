"use client";

import React from "react";
import { getProducts, Product } from "@/lib/getProducts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = React.useState<Product | null>(null);
  const { addToCart } = useCart();

  React.useEffect(() => {
    getProducts().then((products) => {
      const found = products.find((p) => p.id === productId) ?? null;
      setProduct(found);
    });
  }, [productId]);

  if (!product)
    return <div className="p-6 text-center">Loading or Product not found</div>;

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardContent className="p-6 flex flex-col gap-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-64 object-contain bg-white rounded"
        />
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-muted-foreground">{product.description}</p>
        <p className="text-xl font-semibold text-blue-600">
          Rs {product.price}
        </p>
        <Button onClick={() => addToCart(product)}>Add to Cart</Button>
      </CardContent>
    </Card>
  );
}
