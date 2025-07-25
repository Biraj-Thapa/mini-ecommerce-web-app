"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts } from "@/lib/getProducts";

type Order = {
  id: string;
  totalAmount: number;
};

const getOrders = (): Promise<Order[]> => {
  return new Promise((resolve) => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    resolve(orders);
  });
};

export default function SummaryCards() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts();
      setTotalProducts(products.length);

      const orders = await getOrders();
      setTotalOrders(orders.length);

      const revenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
      setTotalRevenue(revenue);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">Rs {totalRevenue}</p>
        </CardContent>
      </Card>
    </div>
  );
}
