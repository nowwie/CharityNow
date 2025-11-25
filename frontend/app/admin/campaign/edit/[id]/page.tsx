"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function EditCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); 
  const router = useRouter();


  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [status, setStatus] = useState("draft");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/campaigns");
        const json = await res.json();

        const found = json.data.find((c: any) => c.id == id);
        if (!found) {
          alert("Campaign tidak ditemukan");
          router.push("/admin/dashboard");
          return;
        }

        setTitle(found.title);
        setDescription(found.description);
        setCategory(found.category);
        setLocation(found.location || "");
        setTargetAmount(found.target_amount);
        setStartDate(found.start_date || "");
        setEndDate(found.end_date || "");
        setStatus(found.status || "draft");
        setPreview(`http://127.0.0.1:8000/storage/${found.image}`);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("location", location);
      formData.append("target_amount", targetAmount);
      formData.append("status", status);

      if (startDate) formData.append("start_date", startDate);
      if (endDate) formData.append("end_date", endDate);
      if (image) formData.append("image", image);

      const res = await fetch(`http://127.0.0.1:8000/api/campaigns/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-HTTP-Method-Override": "PUT",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const msg = Object.values(data.errors).flat().join(", ");
          setError(msg);
        } else {
          setError(data.message || "Gagal update");
        }
        setSaving(false);
        return;
      }

      alert("Campaign berhasil diperbarui!");
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError("Error: " + err.message);
    }

    setSaving(false);
  }

  if (loading)
    return <div className="p-10 text-center text-lg">Memuat data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Link
        href="/admin/dashboard"
        className="flex items-center w-fit gap-2 text-gray-700 hover:text-black mb-6"
      >
        <ArrowLeft size={20} />
        Kembali
      </Link>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold">Edit Campaign</h1>
        <p className="text-gray-500 mb-6">Perbarui detail campaign kamu</p>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* JUDUL */}
            <div>
              <label className="font-medium">
                Judul Campaign <span className="text-red-500">*</span>
              </label>
              <input
                className="mt-2 p-3 w-full border rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
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
              />
            </div>

            {/* KATEGORI */}
            <div>
              <label className="font-medium">
                Kategori <span className="text-red-500">*</span>
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
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setImage(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />

                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <p className="text-3xl">📤</p>
                    <p>Upload Foto</p>
                  </>
                )}
              </label>
            </div>

            {/* TARGET DONASI */}
            <div className="md:col-span-2">
              <label className="font-medium">
                Target Donasi <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="mt-2 p-3 w-full border rounded-lg"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
              />
            </div>

            {/* STATUS */}
            <div className="md:col-span-2 bg-gray-100 p-4 rounded-lg">
              <label className="font-medium">Status Campaign</label>

              <div className="flex flex-col gap-2 mt-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={status === "draft"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Draft
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={status === "active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Aktif
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="status"
                    value="closed"
                    checked={status === "closed"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Ditutup
                </label>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 md:col-span-2">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <div className="md:col-span-2 flex justify-end gap-4">
              <Link
                href="/admin/dashboard"
                className="px-6 py-2 border rounded-lg hover:bg-gray-100"
              >
                Batal
              </Link>

              <button
                type="submit"
                disabled={saving}
                className={`px-6 py-2 rounded-lg text-white ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#8A239E] hover:bg-[#7A1F8D]"
                }`}
              >
                {saving ? "Menyimpan..." : "Update Campaign"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
