"use client";

import Link from "next/link";
import { CheckCircle, ArrowLeft, Heart } from "lucide-react";

export default function DonasiBerhasil() {
    return (
        <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gradient-to-b from-pink-50 to-purple-50">

            <img
                src="/assets/thanks.png"
                alt="Thank you"
                className="w-40 h-40 mb-6"
            />

           
            <h1 className="text-3xl font-bold text-purple-700 text-center">
                Terima Kasih Atas Donasi Anda!
            </h1>
            <p className="text-gray-600 text-center max-w-lg mt-2">
                Kebaikan hati Anda akan membawa harapan baru bagi mereka yang membutuhkan.
                Setiap rupiah yang Anda berikan sangat berarti.
            </p>

           
            <div className="bg-white shadow-md rounded-xl p-6 mt-8 w-full max-w-xl border">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-gray-800">Ringkasan Donasi</h2>

                    <span className="flex items-center text-green-600 text-sm font-medium">
                        <CheckCircle size={16} className="mr-1" /> Berhasil
                    </span>
                </div>

                <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Campaign</span>
                        <span className="font-medium">Bantuan Pangan untuk Anak Yatim</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Nominal Donasi</span>
                        <span className="font-bold text-primary">Rp 250.000</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Waktu Donasi</span>
                        <span className="font-medium">19 Oktober 2024, 14:30</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Metode Pembayaran</span>
                        <span className="font-medium">Transfer Bank BCA</span>
                    </div>
                </div>
            </div>

            
            <div className="bg-gradient-to-r from-[#8A239E] to-[#A855F7] text-white mt-8 p-6 rounded-xl shadow-md max-w-xl w-full">
                <div className="flex flex-col items-center justify-center mb-3">
                    <Heart size={24} className="mb-1 text-white fill-white stroke-none" />
                    <span className="font-semibold text-lg">Dampak Donasi Anda</span>
                </div>


                <p className="text-sm text-center leading-relaxed">
                    “Donasi Anda akan sangat berarti bagi mereka yang membutuhkan. Dengan kontribusi ini,
                    Anda telah menjadi bagian dari perjuangan mengakhiri kelaparan dan memberikan harapan
                    baru bagi anak-anak yang kurang beruntung.”
                </p>
            </div>

          
            <div className="flex gap-4 mt-8 w-full max-w-xl">

                <Link
                    href="/donasi"
                    className="flex-1 bg-primary text-white text-center py-3 rounded-lg font-medium hover:bg-primary/90 transition"
                >
                    Lihat Campaign Lainnya
                </Link>

                <Link
                    href="/dashboard"
                    className="flex-1 border border-primary text-primary text-center py-3 rounded-lg font-medium hover:bg-primary/10 transition"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
