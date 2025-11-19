"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, onPageChange }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  
  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 py-6">
      
      <button
        className={`p-2 rounded-md border text-gray-500 hover:bg-gray-100 transition ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => currentPage > 1 && handleClick(currentPage - 1)}
      >
        <ChevronLeft size={18} />
      </button>

      
      {getPages().map((page, i) => (
        <button
          key={i}
          disabled={page === "..."}
          onClick={() => typeof page === "number" && handleClick(page)}
          className={`px-3 py-2 rounded-md border text-sm transition ${
            currentPage === page
              ? "bg-primary text-white border-primary"
              : page === "..."
              ? "cursor-default border-transparent text-gray-400"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      
      <button
        className={`p-2 rounded-md border text-gray-500 hover:bg-gray-100 transition ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => currentPage < totalPages && handleClick(currentPage + 1)}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
