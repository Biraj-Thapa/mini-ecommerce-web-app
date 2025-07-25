"use client";

import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/getProducts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 && <p>Loading products...</p>}
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              <p className="text-lg font-bold mt-2">Rs {product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
