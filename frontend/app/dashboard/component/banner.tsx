import { HandHeart, Heart , Handshake } from "lucide-react";

export default function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-br from-primary to-[#A855F7] text-white rounded-2xl p-10 flex flex-col justify-center text-center">
       <Handshake
        className="absolute bottom-4 left-6 w-16 h-20 opacity-15 text-white"
       
      />
      <Heart
        className="absolute top-6 right-6 w-16 h-20 opacity-15 text-white"
        fill="currentColor"
      />
      <h2 className="text-3xl font-bold mb-3">
        Mulai Berbagi Kebaikan Hari Ini
      </h2>
      <p className="opacity-80 mb-5">
        Setiap donasi adalah harapan baru bagi mereka yang membutuhkan
      </p>

      <button className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-md font-semibold w-max mx-auto hover:bg-gray-100 transition">
        <HandHeart size={20} />
        Donasi Sekarang
      </button>
    </div>
  );
}
