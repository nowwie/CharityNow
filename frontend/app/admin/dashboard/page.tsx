"use client";

import Header from "@/app/component/headeradmin";
import Footer from "@/app/component/footer";
import Image from "next/image";

export default function AdminDashboard() {
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

        {/* Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          <StatCard title="Campaign Aktif" value="24" icon="🟢" />
          <StatCard title="Campaign Selesai" value="156" icon="☑️" />
          <StatCard title="Total Donasi" value="Rp 2.4M" icon="💰" />
          <StatCard title="Total Donatur" value="8,432" icon="👥" />
        </div>

        {/* Tombol Tambah */}
        <div className="mt-8">
          <button className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition">
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
              {/* Row 1 */}
              <CampaignRow
                image="/img/campaign1.jpg"
                title="Bantuan Gizi Anak Maluku"
                subtitle="Dibuat 2 hari lalu"
                category="Gizi Anak & Balita"
                target="Rp 50,000,000"
                collected="Rp 32,500,000"
                progress={65}
                status="Aktif"
              />

              {/* Row 2 */}
              <CampaignRow
                image="/img/campaign2.jpg"
                title="Sembako untuk Keluarga Prasejahtera"
                subtitle="Dibuat 5 hari lalu"
                category="Paket Sembako"
                target="Rp 25,000,000"
                collected="Rp 25,000,000"
                progress={100}
                status="Selesai"
              />

              {/* Row 3 */}
              <CampaignRow
                image="/img/campaign3.jpg"
                title="Pendidikan Anak Dhuafa"
                subtitle="Dibuat 1 minggu lalu"
                category="Pendidikan"
                target="Rp 100,000,000"
                collected="Rp 15,750,000"
                progress={15}
                status="Aktif"
              />
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end items-center p-4 gap-2 text-sm">
            <button className="px-3 py-1 bg-gray-200 rounded">Previous</button>
            <button className="px-3 py-1 bg-primary text-white rounded">1</button>
            <button className="px-3 py-1 bg-gray-200 rounded">2</button>
            <button className="px-3 py-1 bg-gray-200 rounded">3</button>
            <button className="px-3 py-1 bg-gray-200 rounded">Next</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ===== COMPONENTS ===== */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-xl p-5 shadow flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="font-bold text-xl">{value}</p>
      </div>
    </div>
  );
}

function CampaignRow({
  image,
  title,
  subtitle,
  category,
  target,
  collected,
  progress,
  status,
}: any) {
  return (
    <tr className="border-b">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <Image
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
            status === "Aktif"
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
        <button className="text-red-500 text-lg">🗑</button>
      </td>
    </tr>
  );
}
