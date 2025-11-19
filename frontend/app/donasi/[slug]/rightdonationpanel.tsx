"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function RightDonationPanel({
  campaign,
  slug,
}: {
  campaign: {
    title: string;
    image: string;
    collectedAmount: string | number;
    progress: number;
  };
  slug: string;
}) {
  const quickAmounts = [50000, 100000, 250000, 500000];
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("QRIS (Semua E-Wallet)");

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm space-y-6 min-w-[280px] lg:sticky lg:top-24">
      
      <div className="text-center">
        <p className="text-xs text-gray-500">Berakhir dalam</p>
        <p className="text-xl font-bold text-red-500">23 Hari</p>
        <p className="text-xs text-gray-500 mt-1">31 Desember 2024</p>
      </div>

      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Terkumpul</span>
          <span>{campaign.progress}% dari target</span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${campaign.progress}%` }}
          />
        </div>

        <div className="flex justify-between mt-2 text-sm font-semibold">
          <span className="text-primary">{campaign.collectedAmount}</span>
          <span className="text-gray-500">dari Rp 50.000.000</span>
        </div>
      </div>

      <div className="grid grid-cols-2 text-center py-2 border rounded-lg">
        <div>
          <p className="text-primary font-semibold text-lg">234</p>
          <p className="text-xs text-gray-500">Donatur</p>
        </div>
        <div>
          <p className="text-primary font-semibold text-lg">14</p>
          <p className="text-xs text-gray-500">Hari tersisa</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img src="/assets/foto.jpg" className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-xs text-gray-500">Donasi sebagai</p>
          <p className="font-semibold text-sm">Sari Dewi</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">Nominal Donasi</p>

        <div className="grid grid-cols-2 gap-3">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount("");
              }}
              className={`border rounded-md py-2 text-sm transition ${selectedAmount === amount
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300 text-gray-700"
                }`}
            >
              Rp {amount.toLocaleString("id-ID")}
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Masukkan nominal lain"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setSelectedAmount(null);
          }}
          className="mt-3 w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary"
        />
      </div>


      <div>
        <p className="text-sm font-semibold mb-2">Doa & Dukungan</p>
        <textarea
          placeholder="Tulis doa atau dukungan..."
          className="w-full border rounded-md px-3 py-2 text-sm h-20 focus:ring-1 focus:ring-primary"
        />
      </div>

      
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={() => setAnonymous(!anonymous)}
        />
        <p className="text-xs text-gray-600">
          Donasi sebagai Hamba Allah (Anonim)
        </p>
      </div>

      
      <div>
        <p className="text-sm font-semibold mb-2">Metode Pembayaran</p>

        <div className="relative">
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm appearance-none"
          >
            <option>QRIS (Semua E-Wallet)</option>
            <option>Transfer Bank</option>
            <option>Virtual Account</option>
          </select>

          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={16}
          />
        </div>
      </div>

      <Link href={`/donasi/${slug}/konfirmasi/`}>
        <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition text-sm">
          Donasi Sekarang
        </button>
      </Link>
    </div>
  );
}
