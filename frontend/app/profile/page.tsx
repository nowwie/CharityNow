"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pencil, LogOut, FileText, ArrowRight, User } from "lucide-react";
import Header from "../component/header";
import Footer from "../component/footer";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [donationHistory, setDonationHistory] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        async function loadAll() {
            const resUser = await fetch("http://127.0.0.1:8000/api/me", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!resUser.ok) {
                localStorage.removeItem("token");
                router.push("/login");
                return;
            }

            const userData = await resUser.json();
            setUser(userData);

            const resHistory = await fetch("http://127.0.0.1:8000/api/my-donations", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const jsonHistory = await resHistory.json();

            if (jsonHistory.success) {
                setDonationHistory(jsonHistory.data);
            }

            setLoading(false);
        }

        loadAll();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    const [statusFilter, setStatusFilter] = useState("Semua Status");

    const filteredData =
        statusFilter === "Semua Status"
            ? donationHistory
            : donationHistory.filter((item) => {
                if (statusFilter === "Berhasil") return item.status === "success";
                if (statusFilter === "Menunggu") return item.status === "pending";
                if (statusFilter === "Dibatalkan") return item.status === "cancelled";
            });


    return (
        <>
            <Header />

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
                                <User size={80} className="text-gray-400"
                                />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">{user.name}</h2>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
                                onClick={() => router.push("/profile/edit")}
                            >
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
                                {donationHistory.map((item, i) => (
                                    <div
                                        key={i}
                                        className="border rounded-lg p-4 flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-medium">{item.campaign.title}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(item.created_at).toLocaleString("id-ID")}
                                            </p>

                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-primary font-bold">
                                                    Rp {Number(item.amount).toLocaleString("id-ID")}
                                                </p>

                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${item.status === "success"
                                                        ? "bg-green-100 text-green-700"
                                                        : item.status === "pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {item.status === "success"
                                                        ? "Berhasil"
                                                        : item.status === "pending"
                                                            ? "Menunggu"
                                                            : "Dibatalkan"}
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
