"use client";

import { useAdminAuth } from "@/context/AdminAuthContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const { register, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAdminAuth();
  const router = useRouter();

  const onSubmit = (data: LoginForm) => {
    const success = login(data.email, data.password);
    if (success) {
      router.push("/admin/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto mt-20 space-y-4">
      <Input type="email" {...register("email")} placeholder="Email" />
      <Input type="password" {...register("password")} placeholder="Password" />
      <Button type="submit" className="w-full">Login</Button>
    </form>
  );
}
