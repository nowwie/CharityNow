"use client";
import { useState } from "react";

const categories = [
  { label: "Semua", value: "" },
  { label: "Paket Sembako", value: "sembako" },
  { label: "Gizi Anak & Balita", value: "gizi" },
  { label: "Makanan Siap Saji", value: "siap saji" },
  { label: "Pangan Darurat", value: "darurat" },
];

export default function FilterPills({ onChange }: { onChange: (c: string) => void }) {
  const [active, setActive] = useState("Semua");

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat.label}
          onClick={() => {
            setActive(cat.label);
            onChange(cat.value);
          }}
          className={`px-4 py-2 rounded-full border text-sm transition 
            ${active === cat.label ? "bg-primary text-white" : "bg-white text-black border-gray-100"}`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
