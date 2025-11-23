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
  const [status, setStatus] = useState("draft"); // ← Ubah jadi string, bukan array
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validasi sederhana
    if (!title || !description || !category || !targetAmount) {
      setError("Harap isi semua field yang wajib");
      setLoading(false);
      return;
    }

    try {
      // Ambil token (jika pakai auth)
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("location", location);
      formData.append("target_amount", targetAmount);
      formData.append("status", status); // ← Kirim sebagai string

      if (startDate) formData.append("start_date", startDate);
      if (endDate) formData.append("end_date", endDate);
      if (image) formData.append("image", image);

      console.log("Sending request...");

      const res = await fetch("http://127.0.0.1:8000/api/campaigns", {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      const data = await res.json();
      console.log("Response:", data);

      if (!res.ok) {
        // Handle validation errors
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(", ");
          setError(errorMessages);
        } else {
          setError(data.message || "Gagal membuat campaign");
        }
        setLoading(false);
        return;
      }

      alert("Campaign berhasil ditambahkan!");
      window.location.href = "/admin/dashboard";

    } catch (err: any) {
      console.error("Error:", err);
      setError("Terjadi kesalahan koneksi: " + err.message);
      setLoading(false);
    }
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
          {/* Form dengan onSubmit */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* JUDUL */}
            <div>
              <label className="font-medium">
                Judul Campaign <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Maksimal 100 karakter"
                className="mt-2 p-3 w-full border rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                required
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
              <label className="font-medium">
                Deskripsi Campaign <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Jelaskan tujuan dan manfaat campaign"
                className="mt-2 p-3 w-full border rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
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
                min={startDate} // Tidak bisa pilih tanggal sebelum start_date
              />
            </div>

            {/* KATEGORI */}
            <div>
              <label className="font-medium">
                Kategori Campaign <span className="text-red-500">*</span>
              </label>
              <select
                className="mt-2 p-3 w-full border rounded-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Pilih Kategori</option>
                <option value="sembako">Paket Sembako</option>
                <option value="gizi">Gizi Anak & Balita</option>
                <option value="siapsaji">Makanan Siap Saji</option>
                <option value="darurat">Pangan Darurat</option>

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

              <label className="mt-2 w-full h-40 border rounded-lg border-dashed flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-gray-400">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      // Validasi ukuran file (max 5MB)
                      if (file.size > 5 * 1024 * 1024) {
                        setError("Ukuran gambar maksimal 5MB");
                        return;
                      }
                      setImage(file);
                    }
                  }}
                />

                {image ? (
                  <div className="text-center">
                    <p className="font-medium text-green-600">✓ {image.name}</p>
                    <p className="text-xs mt-1">
                      {(image.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-3xl">📤</p>
                    <p>Tarik dan lepas gambar atau klik untuk upload</p>
                    <p className="text-xs">PNG, JPG, GIF hingga 5MB</p>
                  </>
                )}
              </label>
            </div>

            {/* TARGET DONASI */}
            <div className="md:col-span-2">
              <label className="font-medium">
                Target Donasi (Rp) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Masukkan nominal dalam rupiah"
                className="mt-2 p-3 w-full border rounded-lg"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                min="1"
                required
              />
            </div>

            {/* STATUS */}
            <div className="md:col-span-2 bg-gray-100 p-4 rounded-lg">
              <label className="font-medium">Status Campaign</label>

              <div className="flex flex-col gap-2 mt-3 text-gray-700">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={status === "draft"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Draft (belum dipublikasikan)
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={status === "active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Aktif (sedang berjalan)
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="closed"
                    checked={status === "closed"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Ditutup (selesai)
                </label>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="md:col-span-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {/* BUTTONS */}
            <div className="md:col-span-2 flex justify-end gap-4 mt-4">
              <Link
                href="/admin/campaign"
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Batal
              </Link>

              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg text-white ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#8A239E] hover:bg-[#7A1F8D]"
                  }`}
              >
                {loading ? "Menyimpan..." : "Simpan Campaign"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}