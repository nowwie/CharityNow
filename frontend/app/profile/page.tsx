"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pencil, LogOut, FileText, ArrowRight } from "lucide-react";
import Header from "../component/header";
import Footer from "../component/footer";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        async function loadUser() {
            const res = await fetch("http://127.0.0.1:8000/api/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                localStorage.removeItem("token");
                router.push("/login");
                return;
            }

            const data = await res.json();
            setUser(data);
            setLoading(false);
        }

        loadUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    const history = [
        {
            title: "Bantuan Bencana Alam Lombok",
            date: "15 Oktober 2024 • 14:30 WIB",
            amount: "Rp 500.000",
            status: "Berhasil",
            statusColor: "bg-green-100 text-green-700",
        },
        {
            title: "Pendidikan Anak Kurang Mampu",
            date: "12 Oktober 2024 • 09:15 WIB",
            amount: "Rp 300.000",
            status: "Menunggu",
            statusColor: "bg-yellow-100 text-yellow-700",
        },
        {
            title: "Bantuan Pangan untuk Lansia",
            date: "8 Oktober 2024 • 16:45 WIB",
            amount: "Rp 250.000",
            status: "Berhasil",
            statusColor: "bg-green-100 text-green-700",
        },
        {
            title: "Pembangunan Masjid Desa Sukamaju",
            date: "5 Oktober 2024 • 11:20 WIB",
            amount: "Rp 1.000.000",
            status: "Dibatalkan",
            statusColor: "bg-red-100 text-red-700",
        },
    ];

    const [statusFilter, setStatusFilter] = useState("Semua Status");

    const filteredData =
        statusFilter === "Semua Status"
            ? history
            : history.filter((item) => item.status === statusFilter);

    return (
        <>
            <Header />

            {/* LOADING VIEW (tidak mengubah urutan hooks) */}
            {loading ? (
                <div className="p-10 text-center">Memuat data...</div>
            ) : (
                <div className="max-w-6xl mx-auto p-6 space-y-8">
                    <div className="bg-white border rounded-xl p-6 flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-20 h-20 rounded-full overflow-hidden cursor-pointer"
                                onClick={() => router.push("/profile")}
                            >
                                <Image
                                    src="/assets/proof.jpg"
                                    width={80}
                                    height={80}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">{user.name}</h2>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                                <Pencil size={16} /> Edit Profil
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 border px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-5">
                            <h3 className="font-semibold text-lg">Data Diri</h3>

                            <div className="text-sm space-y-3 text-gray-700">
                                <div>
                                    <p className="text-gray-500 text-xs">Nama Lengkap</p>
                                    <p>{user.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Email</p>
                                    <p>{user.email}</p>
                                </div>
                            </div>

                            <div className="pt-5 border-t space-y-3">
                                <h4 className="font-semibold text-sm">Statistik Donasi</h4>
                                <div className="text-sm text-gray-700 space-y-2">
                                    <p className="flex justify-between">
                                        Total Donasi{" "}
                                        <span className="font-semibold text-primary">
                                            {user.totalDonation}
                                        </span>
                                    </p>
                                    <p className="flex justify-between">
                                        Jumlah Campaign <span>{user.totalCampaign}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        Bergabung Sejak <span>{user.joinDate}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 bg-white border rounded-xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg">Riwayat Donasi</h3>

                                <select
                                    className="border rounded-md px-3 py-1 text-sm"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option>Semua Status</option>
                                    <option>Berhasil</option>
                                    <option>Menunggu</option>
                                    <option>Dibatalkan</option>
                                </select>
                            </div>

                            <div className="space-y-4">
                                {filteredData.map((item, i) => (
                                    <div
                                        key={i}
                                        className="border rounded-lg p-4 flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-medium">{item.title}</p>
                                            <p className="text-xs text-gray-500">{item.date}</p>

                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-primary font-bold">{item.amount}</p>

                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${item.statusColor}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* <div className="flex flex-col items-end gap-2">
                                            <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                                                <FileText size={14} /> Detail
                                            </button>
                                            <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                                                Bukti <ArrowRight size={14} />
                                            </button>
                                        </div> */}
                                    </div>
                                ))}
                            </div>

                            {/* <button className="mt-4 w-full border px-4 py-2 rounded-lg text-sm bg-primary/80 text-white hover:bg-primary">
                                Muat Lebih Banyak
                            </button> */}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
