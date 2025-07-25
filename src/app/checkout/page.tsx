"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(5, "Address required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data: CheckoutFormData) => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }


    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");


    const newOrder = {
      id: Date.now(), 
      customer: data,
      items: cartItems,
      totalAmount: totalPrice,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    clearCart();
    router.push("/success");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Full Name" {...register("fullName")} />
        {errors.fullName && (
          <p className="text-red-600 text-sm">{errors.fullName.message}</p>
        )}

        <Input placeholder="Email" {...register("email")} />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}

        <Input placeholder="Address" {...register("address")} />
        {errors.address && (
          <p className="text-red-600 text-sm">{errors.address.message}</p>
        )}

        <Button type="submit" className="w-full mt-4">
          Place Order
        </Button>
      </form>
    </div>
  );
}
