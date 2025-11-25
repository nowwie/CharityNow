"use client";
import Header from "../component/header";
import HeroBanner from "./component/banner";
import StatsCard from "./component/statscard";
import CampaignCard from "./component/campaigncard";
import AboutSection from "./component/about";
import Footer from "../component/footer";
import Image from "next/image";
import { stats, featuredCampaigns } from "./data";
import { useEffect, useState } from "react";

interface CampaignCardData {
    title: string;
    desc: string;
    progress: number;
    image: string;
    slug: string;
}


export default function DashboardPage() {
    const [campaigns, setCampaigns] = useState<CampaignCardData[]>([]);

    useEffect(() => {
        async function load() {
            const res = await fetch("http://127.0.0.1:8000/api/campaigns");
            const json = await res.json();

            const mapped: CampaignCardData[] = json.data
                .slice(0, 3)
                .map((c: any) => {
                    const progress = Math.round(
                        (Number(c.collected_amount ?? 0) / Number(c.target_amount ?? 1)) * 100
                    );

                    return {
                        title: c.title,
                        desc: c.description,
                        progress,
                        image: c.image
                            ? `http://127.0.0.1:8000/storage/${c.image}`
                            : "/assets/campaign.jpg",
                        slug: c.slug,
                    };
                });

            setCampaigns(mapped);
            }

            load();
        }, []);

    return (
        <div>
            <Header />
            <div className="flex items-center justify-between px-12 mt-6">
                <div>
                    <h1 className="space-y-14 text-2xl font-semibold text-left mt-6 text-black">Selamat Datang di CharityNow</h1>
                    <h3 className="space-y-14 text-lg font-medium text-left text-black">Bersama kita wujudkan kebaikan untuk sesama</h3>
                </div>
                <Image
                    src="/assets/div.png"
                    alt="welcome"
                    width={60}
                    height={60}
                    className="object-contain"
                />
            </div>

            <div className="space-y-14 px-12 py-8">
                <HeroBanner />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((item, i) => (
                        <StatsCard
                            key={i}
                            label={item.label}
                            value={item.value}
                            subtext={item.subtext}
                            icon={item.icon}
                            badgeText={item.badgeText}
                            badgeColor={item.badgeColor}
                            iconBg={item.iconBg}
                        />
                    ))}
                </div>


                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg">Campaign Unggulan</h3>
                        <a href="/donasi" className="text-primary hover:underline">
                            Lihat Semua
                        </a>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        {campaigns.map((campaign, i) => (
                            <CampaignCard key={i} {...campaign} />
                        ))}
                    </div>
                </div>

                <AboutSection />
            </div>

            <Footer />
        </div>
    );
}
