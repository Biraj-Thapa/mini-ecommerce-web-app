"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Order = {
  id: number;
  customer: {
    fullName: string;
    email: string;
    address: string;
  };
  items: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail?: string;
  }[];
  totalAmount: number;
  createdAt: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {orders.length === 0 && <p>No orders placed yet.</p>}
        {orders.map((order) => (
          <Card key={order.id} className="shadow-md">
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Placed: {new Date(order.createdAt).toLocaleString()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="font-semibold">Customer Info</h3>
                <p>{order.customer.fullName}</p>
                <p>{order.customer.email}</p>
                <p>{order.customer.address}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Ordered Products</h3>
                <ul className="space-y-2 max-h-40 overflow-auto">
                  {order.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 border-b pb-1"
                    >
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p>{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">Rs {item.price * item.quantity}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-lg font-bold text-right">
                Total: Rs {order.totalAmount.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
