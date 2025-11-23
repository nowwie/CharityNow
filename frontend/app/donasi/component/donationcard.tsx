import Link from "next/link";
import { slugify } from "@/app/utils/slugify";

export interface DonationCampaignProps {
  title: string;
  category: string;
  daysLeft: number;
  collectedAmount: string;
  progress: number;
  image: string;
}

export default function DonationCampaignCard({
  title,
  category,
  daysLeft,
  collectedAmount,
  progress,
  image,
}: DonationCampaignProps) {

  const slug = slugify(title);

  const safeCategory = category || "Umum";
  const normalizedCategory = safeCategory.toLowerCase().replace(/\s+/g, "");

  const categoryColors: Record<string, string> = {
    gizi: "bg-orange-100 text-orange-600",
    sembako: "bg-blue-100 text-blue-600",
    darurat: "bg-red-100 text-red-600",
    siapsaji: "bg-green-100 text-green-600",
  };

  return (
    <Link href={`/donasi/${slug}`}>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">

        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover"
          />

          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium border 
              ${categoryColors[normalizedCategory] || "bg-gray-100 text-gray-700"}`}
          >
            {safeCategory}
          </span>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-sm leading-tight">{title}</h3>

          <div className="flex justify-between text-xs text-gray-600 font-medium">
            <span>Terkumpul</span>
            <span>{daysLeft} hari lagi</span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-600 font-medium">
            <span>{collectedAmount}</span>
            <span>{progress}%</span>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 border border-primary text-primary rounded-md py-2 text-sm text-center hover:bg-primary/10 transition">
              Lihat Detail
            </div>

            <div className="flex-1 bg-primary text-white rounded-md py-2 text-sm text-center hover:bg-primary/90 transition">
              Donasi
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}
