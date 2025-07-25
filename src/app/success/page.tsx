"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        🎉 Thank you for your order!
      </h1>
      <p className="text-lg text-muted-foreground mb-6">
        We’ve received your order.
      </p>

      <Button onClick={() => router.push("/")}>Home</Button>
    </div>
  );
}
