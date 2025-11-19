"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddCampaignPage() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [status, setStatus] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    try {
      // ambil token login FE
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("location", location);
      formData.append("target_amount", targetAmount);
      formData.append("status", status.join(","));
      formData.append("start_date", startDate);
      formData.append("end_date", endDate);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("http://127.0.0.1:8000/api/campaigns", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal membuat campaign");
        return;
      }

      alert("Campaign berhasil ditambahkan!");
      window.location.href = "/admin/campaign";

    } catch (err: any) {
      setError("Terjadi kesalahan koneksi");
    }
  }

  function toggleStatus(option: string) {
    setStatus((prev) =>
      prev.includes(option)
        ? prev.filter((s) => s !== option)
        : [...prev, option]
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Link
        href="/admin/campaign"
        className="flex items-center w-fit gap-2 text-gray-700 hover:text-black mb-6"
      >
        <ArrowLeft size={20} />
        Kembali
      </Link>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold">Tambah Campaign Baru</h1>
        <p className="text-gray-500 mb-6">
          Lengkapi detail campaign untuk dipublikasikan
        </p>

        <div className="bg-white p-6 rounded-xl shadow-sm border">

          {/* ❗ Tambahkan onSubmit */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* JUDUL */}
            <div>
              <label className="font-medium">Judul Campaign</label>
              <input
                type="text"
                placeholder="Maksimal 100 karakter"
                className="mt-2 p-3 w-full border rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* START DATE */}
            <div>
              <label className="font-medium">Tanggal Mulai</label>
              <input
                type="date"
                className="mt-2 p-3 w-full border rounded-lg"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* DESKRIPSI */}
            <div className="md:col-span-2">
              <label className="font-medium">Deskripsi Campaign</label>
              <textarea
                rows={4}
                placeholder="Jelaskan tujuan dan manfaat campaign"
                className="mt-2 p-3 w-full border rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* END DATE */}
            <div>
              <label className="font-medium">Tanggal Berakhir</label>
              <input
                type="date"
                className="mt-2 p-3 w-full border rounded-lg"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* KATEGORI */}
            <div>
              <label className="font-medium">Kategori Campaign</label>
              <select
                className="mt-2 p-3 w-full border rounded-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Pilih Kategori</option>
                <option>Kesehatan</option>
                <option>Pendidikan</option>
                <option>Bencana Alam</option>
              </select>
            </div>

            {/* LOKASI */}
            <div>
              <label className="font-medium">Lokasi Campaign</label>
              <input
                type="text"
                placeholder="Kota atau wilayah campaign"
                className="mt-2 p-3 w-full border rounded-lg"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* FOTO */}
            <div className="md:col-span-2">
              <label className="font-medium">Foto Campaign</label>

              <label className="mt-2 w-full h-40 border rounded-lg border-dashed flex flex-col items-center justify-center text-gray-500 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) setImage(e.target.files[0]);
                  }}
                />

                {image ? (
                  <p>{image.name}</p>
                ) : (
                  <>
                    <p className="text-3xl">📤</p>
                    <p>Tarik dan lepas gambar atau klik untuk upload</p>
                    <p className="text-xs">PNG, JPG hingga 5MB</p>
                  </>
                )}
              </label>
            </div>

            {/* TARGET DONASI */}
            <div className="md:col-span-2">
              <label className="font-medium">Target Donasi (Rp)</label>
              <input
                type="number"
                placeholder="Masukkan nominal dalam rupiah"
                className="mt-2 p-3 w-full border rounded-lg"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
            </div>

            {/* STATUS */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <label className="font-medium">Status Campaign</label>

              <div className="flex flex-col gap-2 mt-3 text-gray-700">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={status.includes("dikumpulkan")}
                    onChange={() => toggleStatus("dikumpulkan")}
                  />
                  Donasi dikumpulkan
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={status.includes("ditutup")}
                    onChange={() => toggleStatus("ditutup")}
                  />
                  Donasi ditutup
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={status.includes("disalurkan")}
                    onChange={() => toggleStatus("disalurkan")}
                  />
                  Donasi disalurkan
                </label>
              </div>
            </div>
          </form>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 mt-6">
            <button className="px-6 py-2 border rounded-lg">
              Batal
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg text-white bg-[#8A239E] hover:bg-[#7A1F8D]"
            >
              Simpan Campaign
            </button>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}
