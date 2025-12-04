import { slugify } from "@/app/utils/slugify";
import {
  Heart,
  Share2,
  CheckCircle,
  BookOpen,
  School,
  Users,
  MapPin,
  User,
  Lock,
  Gift,
  HandCoins,
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

  const res = await fetch("http://127.0.0.1:8000/api/campaigns", {
    cache: "no-store",
  });

  const json = await res.json();
  const campaigns = json.data || [];

  console.log("URL Slug:", slug);
  console.log("Available Slugs:", campaigns.map((item: any) => item.slug));

  const campaign = campaigns.find(
    (item: any) => item.slug === slug
  );

  if (!campaign) {
    return <div className="text-center py-20">Campaign tidak ditemukan 😢</div>;
  }

  const currentStatus = campaign.status;
  const isCollecting =
    currentStatus === "active" ||
    currentStatus === "closed" ||
    currentStatus === "distributed";

  const isClosed =
    currentStatus === "closed" ||
    currentStatus === "distributed";

  const isDistributed =
    currentStatus === "distributed";



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
            <User size={32} className="text-purple-600"
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
          {campaign.description}
        </p>

        <div className="relative">
          <img
            src={`http://127.0.0.1:8000/storage/${campaign.image}`}
            alt={campaign.title}
            className="rounded-xl w-full h-auto"
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Lokasi</h2>
          <div className="flex items-start gap-2">
            <MapPin size={20} className="flex-shrink-0 mt-0.5 text-primary" />
            <p className="text-gray-600 text-sm leading-relaxed">
              {campaign.location}
            </p>
          </div>
        </div>

        {/* <div className="space-y-3">
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
        </div> */}

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Informasi Terbaru</h2>

          <div className="flex items-center justify-between text-sm">


            <div className="flex flex-col items-center">
              <HandCoins
                size={40}
                className={isCollecting ? "text-purple-600" : "text-gray-400 opacity-40"}
              />
              <p className={isCollecting ? "font-semibold text-purple-600" : "text-gray-400"}>
                Donasi dikumpulkan
              </p>
            </div>

            <div className="flex-1 flex justify-center">
              <div
                className={`w-full border-t-2 border-dashed mx-4 ${isClosed ? "border-purple-600" : "border-purple-300"
                  }`}
              />
            </div>

            <div className="flex flex-col items-center">
              <Lock
                size={40}
                className={isClosed ? "text-purple-600" : "text-gray-400 opacity-40"}
              />
              <p className={isClosed ? "font-semibold text-purple-600" : "text-gray-400"}>
                Donasi ditutup
              </p>
            </div>

            <div className="flex-1 flex justify-center">
              <div
                className={`w-full border-t-2 border-dashed mx-4 ${isDistributed ? "border-purple-600" : "border-purple-300"
                  }`}
              />
            </div>

            <div className="flex flex-col items-center">
              <Gift
                size={40}
                className={isDistributed ? "text-purple-600" : "text-gray-400 opacity-40"}
              />
              <p className={isDistributed ? "font-semibold text-purple-600" : "text-gray-400"}>
                Donasi disalurkan
              </p>
            </div>


          </div>
        </div>

      </div>

      {campaign.status !== "closed" && (
        <RightDonationPanel campaign={campaign} slug={slug} />
      )}
    </div>
  );
}
