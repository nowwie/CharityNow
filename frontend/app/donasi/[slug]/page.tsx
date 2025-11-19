import { donationCampaigns } from "../data";
import { slugify } from "@/app/utils/slugify";
import {
  Heart,
  Share2,
  CheckCircle,
  BookOpen,
  School,
  Users,
} from "lucide-react";
import RightDonationPanel from "./rightdonationpanel";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function CampaignDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("Slug from URL:", slug);
  console.log("Available campaigns:", donationCampaigns.map(item => ({
    title: item.title,
    slugified: slugify(item.title)
  })));
  const campaign = donationCampaigns.find(
    (item) => slugify(item.title) === slug
  );

  if (!campaign) {
    return <div className="text-center py-20">Campaign tidak ditemukan 😢</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
  
      <div className="lg:col-span-2 space-y-8">
        <Link
        href={`/donasi`}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
      >
        <ChevronLeft size={18} /> Kembali ke Campaign
      </Link>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <img
              src="/assets/foto.jpg"
              alt="author"
              className="w-10 h-10 rounded-full"
            />

            <div>
              <p className="text-xs text-gray-500">Oleh</p>
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">Yayasan Peduli Sesama</p>
                <span className="flex items-center text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  <CheckCircle size={14} className="mr-1" /> Verified
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <Heart className="cursor-pointer hover:text-primary" />
            <Share2 className="cursor-pointer hover:text-primary" />
          </div>
        </div>

        <h1 className="text-2xl font-bold leading-tight">{campaign.title}</h1>


        <p className="text-gray-600 text-sm leading-relaxed">
          Mari bersama-sama memberikan kesempatan pendidikan terbaik untuk
          anak-anak kurang mampu...
        </p>

        <div className="relative">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="rounded-xl w-full h-auto"
          />
          <p className="absolute bottom-3 right-3 text-xs bg-black/40 text-white px-3 py-1 rounded-lg">
            1 dari 3 foto
          </p>
        </div>


        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Latar Belakang Campaign</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Di pelosok Desa Pandanlandung, Malang, Jawa Timur ...
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Penggunaan Dana</h2>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-purple-600" />
                Buku dan Alat Tulis
              </div>
              <p>Rp 15.000.000</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <School size={18} className="text-purple-600" />
                Seragam Sekolah
              </div>
              <p>Rp 8.000.000</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-purple-600" />
                Beasiswa & Makan Siang
              </div>
              <p>Rp 27.000.000</p>
            </div>
          </div>
        </div>

       
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Informasi Terbaru</h2>

          <div className="flex items-center justify-between text-gray-600 text-sm">
            <div className="flex flex-col items-center">
              <img src="/assets/satu.png" className="h-10" />
              <p>Donasi dikumpulkan</p>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="w-full border-t-2 border-dashed border-purple-300 mx-4" />
            </div>

            <div className="flex flex-col items-center">
              <img src="/assets/dua.png" className="h-10" />
              <p>Donasi ditutup</p>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="w-full border-t-2 border-dashed border-purple-300 mx-4" />
            </div>

            <div className="flex flex-col items-center">
              <img src="/assets/tiga.png" className="h-10" />
              <p>Donasi disalurkan</p>
            </div>
          </div>
        </div>
      </div>


      <RightDonationPanel campaign={campaign} slug={slug} />
    </div>
  );
}
