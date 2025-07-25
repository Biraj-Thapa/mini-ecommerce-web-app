"use client";
import React from "react";
import { CartIcon } from "./CartIcon";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
      <div className="text-xl font-bold">Mini E-Commerce</div>
      <input
        type="text"
        placeholder="Search..."
        className="border px-3 py-1 rounded w-1/3"
        disabled
      />
      <CartIcon />
    </nav>
  );
}
