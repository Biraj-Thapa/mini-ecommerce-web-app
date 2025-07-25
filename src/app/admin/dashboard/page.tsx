"use client";

import { useAdminAuth } from "@/context/AdminAuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SummaryCards from "@/components/admin/SummaryCards";

export default function AdminDashboard() {
  const { isAdminAuthenticated } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAdminAuthenticated, router]);

  if (!isAdminAuthenticated) return null;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>
      <SummaryCards />
    </div>
  );
}