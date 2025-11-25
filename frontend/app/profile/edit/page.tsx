"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function load() {
      const res = await fetch("http://127.0.0.1:8000/api/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      setName(data.name);
      setEmail(data.email);

      setLoading(false);
    }

    load();
  }, []);

  async function handleSave(e: any) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const token = localStorage.getItem("token");

    const res = await fetch("http://127.0.0.1:8000/api/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, email })
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.message || "Gagal memperbarui profil");
      setSaving(false);
      return;
    }

    alert("Profil berhasil diperbarui!");
    router.push("/profile");
  }

  if (loading) return <div className="p-10">Memuat...</div>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <button
        className="flex items-center gap-2 text-gray-700 mb-5"
        onClick={() => router.push("/profile")}
      >
        <ArrowLeft size={20} /> Kembali
      </button>

      <h2 className="text-2xl font-semibold mb-4">Edit Profil</h2>

      <form onSubmit={handleSave} className="space-y-4 bg-white p-6 rounded-xl border">

        <div>
          <label className="text-sm font-medium">Nama Lengkap</label>
          <input
            className="w-full border rounded-lg p-2 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            className="w-full border rounded-lg p-2 mt-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className={`w-full py-2 text-white rounded-lg ${
            saving ? "bg-gray-400" : "bg-primary hover:bg-primary/90"
          }`}
        >
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
