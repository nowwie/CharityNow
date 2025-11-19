import Image from "next/image";
import { InstagramIcon, FacebookIcon, TwitterIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white py-10 px-12 shadow-inner mt-10">
      <div className="grid grid-cols-4 gap-10 text-sm text-gray-600">
        
    
        <div>
          <div className="flex gap-2 items-center mb-3">
            <Image src="/assets/Vector.png" width={16} height={16} alt="logo" />
            <h1 className="text-primary font-semibold text-lg">CharityNow</h1>
          </div>
          <p className="text-gray-500">
            Bersama membangun harapan untuk masa depan yang lebih baik.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-primary">Campaign</h3>
          <ul className="space-y-1 mt-2">
            <li><a href="#" className="hover:underline">Bantuan Pangan</a></li>
            <li><a href="#" className="hover:underline">Pendidikan</a></li>
            <li><a href="#" className="hover:underline">Kesehatan</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-primary">Tentang</h3>
          <ul className="space-y-1 mt-2">
            <li><a href="#" className="hover:underline">Visi Misi</a></li>
            <li><a href="#" className="hover:underline">Tim Kami</a></li>
            <li><a href="#" className="hover:underline">Kontak</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-primary">Ikuti Kami</h3>
          <div className="flex gap-3 mt-2">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/80 transition">
              <InstagramIcon width={28} height={28} /></a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/80 transition">
              <FacebookIcon width={28} height={28} /></a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/80 transition">
              <TwitterIcon width={28} height={28} /></a>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 mt-10">
        © 2025 CharityNow. Semua hak dilindungi.
      </p>
    </footer>
  );
}
