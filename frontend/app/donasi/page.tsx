"use client";
import { useState } from "react";
import FilterPills from "./component/filter";
import SearchBar from "./component/search";
import CampaignList from "./component/campaignlist";
import { donationCampaigns } from "./data";
import Header from "../component/header";
import Footer from "../component/footer";


export default function DonasiPage() {
  const [filtered, setFiltered] = useState(donationCampaigns);

  const handleFilter = (category: string) => {
    if (category === "Semua") {
      setFiltered(donationCampaigns);
    } else {
      setFiltered(
        donationCampaigns.filter((item) => item.title.toLowerCase().includes(category.toLowerCase()))
      );
    }
  };

  const handleSearch = (query: string) => {
    setFiltered(
      donationCampaigns.filter((item) =>
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
        Menampilkan {filtered.length} dari {donationCampaigns.length} campaign
      </span>

      <CampaignList data={filtered} />

      <div className="flex justify-center gap-3 py-6">
        <button className="px-4 py-2 rounded-md border">1</button>
        <button className="px-4 py-2 rounded-md border bg-primary text-white">2</button>
        <button className="px-4 py-2 rounded-md border">3</button>
      </div>

      
    </div>
    <Footer />
    </div>
  );
}
