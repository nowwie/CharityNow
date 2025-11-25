"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";

export default function KonfirmasiDonasi({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  console.log("Nominal dari FE:", amount);

  const isAnonymous = searchParams.get("anonymous") === "1";
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("http://127.0.0.1:8000/api/campaigns", {
        cache: "no-store",
      });
      const json = await res.json();

      const campaigns = json.data || [];

      const found = campaigns.find((item: any) => item.slug === slug);

      setCampaign(found || null);
      setLoading(false);
    }

    load();
  }, [slug]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

    useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("http://127.0.0.1:8000/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

 const donorName = isAnonymous
    ? "Hamba Allah"
    : (user?.name || "Donatur");

  if (loading) return <div className="p-20 text-center">Loading...</div>;

  if (!campaign)
    return <div className="p-20 text-center">Campaign tidak ditemukan 😢</div>;

  async function submitDonasi() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:8000/api/admin/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        campaign_id: campaign.id,
        amount: amount,
        payment_method: "QRIS",
        message: "",
        status: "success",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = `/donasi/${slug}/berhasil?amount=${amount}`;
    } else {
      alert("Gagal memproses donasi: " + data.message);
    }
  }
  
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">

      <Link
        href={`/donasi/${slug}`}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
      >
        <ChevronLeft size={18} /> Kembali ke Campaign
      </Link>

      <h1 className="text-center text-2xl font-bold">Konfirmasi Donasi</h1>
      <p className="text-center text-gray-600 text-sm">
        Silakan periksa kembali detail donasi kamu sebelum melanjutkan ke pembayaran
      </p>

      {/* Countdown */}
      <div className="text-center py-3 bg-orange-100 border border-orange-300 rounded-lg text-orange-700 font-medium">
        Selesaikan pembayaran dalam{" "}
        <span className="font-bold">{formatTime(timeLeft)}</span>
      </div>

      {/* CARD DETAIL */}
      <div className="bg-white border rounded-xl shadow-sm p-6 space-y-5">

        {/* Header campaign */}
        <div className="bg-primary rounded-lg p-4 text-white">
          <p className="font-semibold text-sm">{campaign.title}</p>
          <p className="text-xs opacity-90">Yayasan Peduli Anak Indonesia</p>
          <p className="text-xs mt-1">{campaign.progress || 0}% tercapai</p>
        </div>

        {/* Info donor */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-500">Nama Donatur</p>
            <p className="font-medium">{donorName}</p>
          </div>
          <div>
            <p className="text-gray-500">Nominal Donasi</p>
            <p className="font-semibold text-primary">Rp {Number(amount || 0).toLocaleString("id-ID")}</p>
          </div>
          <div>
            <p className="text-gray-500">Tanggal Donasi</p>
            <p className="font-medium">{new Date().toLocaleDateString("id-ID")}</p>
          </div>
          <div>
            <p className="text-gray-500">Metode Pembayaran</p>
            <p className="font-medium">QRIS</p>
          </div>
        </div>

        {/* QRIS */}
        <div className="bg-gray-50 border rounded-lg p-6 text-center">
          <p className="text-sm font-medium mb-3">Scan QR Code untuk Pembayaran</p>

          <img src="/assets/qr.jpg" className="mx-auto w-40 h-40" />

          <p className="text-xs text-gray-600 mt-3">
            Scan menggunakan aplikasi mobile banking atau e-wallet
          </p>
        </div>

        {/* Total */}
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <p>Nominal Donasi</p>
            <p>Rp {Number(amount || 0).toLocaleString("id-ID")}</p>
          </div>
          <div className="flex justify-between">
            <p>Biaya Admin</p>
            <p className="text-green-600">Gratis</p>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t">
            <p>Total Pembayaran</p>
            <p className="text-primary">Rp {Number(amount || 0).toLocaleString("id-ID")}</p>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={submitDonasi}
          className="flex-1 bg-primary/80 text-white py-2 rounded-lg font-medium hover:bg-primary transition"
        >
          Bayar Sekarang
        </button>

        <Link
          href={`/donasi/${slug}`}
          className="flex-1 border border-primary text-primary py-2 rounded-lg font-medium text-center hover:bg-primary/10 transition"
        >
          Edit Data
        </Link>
      </div>

      {/* Footer info */}
      <div className="bg-purple-50 text-center text-xs text-gray-600 p-4 rounded-lg border border-primary/20">
        <p className="font-semibold text-primary mb-1">💜 Jaminan Transparansi</p>
        <p>
          Dana yang masuk akan disalurkan sesuai tujuan campaign. Kamu akan mendapatkan laporan
          penyaluran di halaman campaign.
        </p>
      </div>
    </div>
  );
}
