import { ReactNode } from "react";
import { HandHeart, LucideIcon, Megaphone, Users } from "lucide-react";

interface StatsItem {
  label: string;
  value: string;
  subtext: string;
  icon: LucideIcon;
  iconBg: string;
  badgeText: string;
  badgeColor: string;
}

export const stats = [
  {
    label: "Total Donasi",
    value: "Rp 2.5M",
    subtext: "Terkumpul bulan ini",
    icon: HandHeart,        
    iconBg: "bg-green-100 text-green-600",
    badgeText: "+15% dari bulan lalu",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    label: "Campaign Aktif",
    value: "24",
    subtext: "Campaign berjalan",
    icon: Megaphone,
    iconBg: "bg-yellow-100 text-yellow-600",
    badgeText: "5 campaign baru minggu ini",
    badgeColor: "bg-yellow-100 text-yellow-800",
  },
  {
    label: "Total Donatur",
    value: "1,247",
    subtext: "Orang baik hati",
    icon: Users,
    iconBg: "bg-purple-100 text-purple-600",
    badgeText: "Terima kasih atas kebaikan Anda",
    badgeColor: "bg-purple-100 text-purple-700",
  },
];


export const featuredCampaigns = [
  {
    title: "Pendidikan untuk Anak Pedalaman",
    desc: "Membantu anak-anak di daerah terpencil mendapatkan akses pendidikan yang layak.",
    progress: 70,
    image: "/assets/campaign1.png",
  },
  {
    title: "Bantuan Kesehatan Lansia",
    desc: "Memberikan perawatan kesehatan gratis untuk lansia kurang mampu",
    progress: 43,
    image: "/assets/campaign2.png",
  },
  {
    title: "Bencana Alam",
    desc: "Membantu korban bencana alam dengan kebutuhan pokok dan tempat tinggal",
    progress: 95,
    image: "/assets/campaign3.png",
  },
];
