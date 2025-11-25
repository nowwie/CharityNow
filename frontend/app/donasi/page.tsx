"use client";

import { useState, useEffect } from "react";
import FilterPills from "./component/filter";
import SearchBar from "./component/search";
import CampaignList from "./component/campaignlist";
import Header from "../component/header";
import Footer from "../component/footer";
import Pagination from "./component/pagination";

export default function DonasiPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(campaigns.length / itemsPerPage);

  const paginatedData = campaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  useEffect(() => {
    async function load() {
      const res = await fetch("http://127.0.0.1:8000/api/campaigns");
      const json = await res.json();

      const campaignsData = json.data ?? [];

      setCampaigns(campaignsData);
      setFiltered(campaignsData);
    }
    load();
  }, []);

 const handleFilter = (category: string) => {
  if (category === "") {
    setFiltered(campaigns);
  } else {
    setFiltered(
      campaigns.filter((item) =>
        item.category.toLowerCase() === category.toLowerCase()
      )
    );
  }

  setCurrentPage(1); // reset pagination ke halaman 1
};


  const handleSearch = (query: string) => {
    setFiltered(
      campaigns.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div>
      <Header />

      <div className="px-12 py-8 space-y-8">

        <div className="text-left space-y-2 mb-4">
          <h1 className="text-3xl font-bold text-black">
            Pilih campaign yang ingin kamu bantu hari ini 🌱
          </h1>
          <p className="text-gray-600 text-sm">
            Bersama-sama kita bisa membuat perubahan nyata untuk mereka yang membutuhkan
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <FilterPills onChange={handleFilter} />
          <SearchBar onSearch={handleSearch} />
        </div>

        <span className="text-sm text-gray-600">
          Menampilkan {filtered.length} dari {campaigns.length} campaign
        </span>

        <CampaignList data={filtered} />

        <Pagination
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />


      </div>

      <Footer />
    </div>
  );
}
