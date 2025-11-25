"use client";

import { useEffect, useState } from "react";
import Header from "@/app/component/headeradmin";
import Footer from "@/app/component/footer";
import Image from "next/image";

export default function AdminDashboard() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCampaigns() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/campaigns");
        const json = await res.json();
        setCampaigns(json.data || []);
      } catch (err) {
        console.error("Gagal load campaign:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCampaigns();
  }, []);

  async function handleDelete(id: number) {
  if (!confirm("Yakin ingin menghapus campaign ini?")) return;

  const token = localStorage.getItem("token");

  const res = await fetch(`http://127.0.0.1:8000/api/campaigns/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (res.ok) {
    alert("Campaign berhasil dihapus");

  
    window.location.reload();
  } else {
    alert(data.message || "Gagal menghapus campaign");
  }
}


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 px-6 md:px-14 py-10">
        {/* Judul */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Kelola Campaign Donasi
          </h1>
          <p className="text-gray-500 text-sm">
            Kelola semua campaign donasi yang ada di platform CharityNow
          </p>
        </div>

        {/* Tombol Tambah */}
        <div className="mt-8">
          <button
            onClick={() => (window.location.href = "/admin/campaign/add")}
            className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
          >
            + Tambah Campaign Baru
          </button>
        </div>

        {/* Tabel */}
        <div className="bg-white mt-6 rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr className="text-sm text-gray-600">
                <th className="py-3 px-4">Nama Campaign</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Target Donasi</th>
                <th className="py-3 px-4">Terkumpul</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Aksi</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td className="p-4 text-center" colSpan={6}>
                    Loading...
                  </td>
                </tr>
              ) : campaigns.length === 0 ? (
                <tr>
                  <td className="p-4 text-center" colSpan={6}>
                    Belum ada campaign
                  </td>
                </tr>
              ) : (
                campaigns.map((c) => (
                  <CampaignRow
                    key={c.id}
                    id={c.id}
                    image={`http://127.0.0.1:8000/storage/${c.image}`}
                    title={c.title}
                    subtitle={`Kategori: ${c.category}`}
                    category={c.category}
                    target={`Rp ${c.target_amount.toLocaleString()}`}
                    collected={`Rp ${c.collected_amount.toLocaleString()}`}
                    progress={
                      Math.floor(
                        (c.collected_amount / c.target_amount) * 100
                      ) || 0
                    }
                    status={c.status}
                    onDelete={() => handleDelete(c.id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}


function CampaignRow({
  id,
  image,
  title,
  subtitle,
  category,
  target,
  collected,
  progress,
  status,
  onDelete,
}: any) {
  return (
    <tr className="border-b">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt="img"
            width={50}
            height={50}
            className="rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{title}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>
      </td>

      <td className="py-4 px-4">
        <span className="text-xs bg-purple-100 text-primary px-2 py-1 rounded-lg">
          {category}
        </span>
      </td>

      <td className="py-4 px-4">{target}</td>

      <td className="py-4 px-4">
        <p>{collected}</p>
        <p className="text-xs text-gray-400">{progress}% tercapai</p>
        <div className="w-full bg-gray-200 rounded-full mt-1 h-2">
          <div
            className="h-2 rounded-full bg-primary"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </td>

      <td className="py-4 px-4">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            status === "aktif"
              ? "bg-green-100 text-green-600"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {status}
        </span>
      </td>

      <td className="py-4 px-4 flex gap-3">
        <button className="text-blue-600 text-lg">👁</button>
        <button className="text-yellow-500 text-lg">✏️</button>
        <button className="text-red-500 text-lg" onClick={() =>onDelete(id)}>🗑</button>
      </td>
    </tr>
  );
}
