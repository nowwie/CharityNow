"use client";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="cari campaign"
        className="border rounded-md px-12 py-2 w-full text-sm"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="absolute left-4 top-2.5 text-gray-500" size={18} />
    </div>
  );
}
