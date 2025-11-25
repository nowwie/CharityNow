"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm py-3 px-8 flex items-center justify-between">

      {/* LOGO */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src="/assets/Vector.png" width={32} height={32} alt="logo" />
        <h1 className="text-primary font-semibold text-xl">CharityNow</h1>
      </div>

      {/* NAVIGATION */}
      <nav className="flex gap-8 text-sm font-medium">
        <a
          href="/dashboard"
          className={pathname === "/dashboard" ? "text-primary" : "text-gray-600"}
        >
          Dashboard
        </a>

        <a
          href="/donasi"
          className={pathname === "/donasi" ? "text-primary" : "text-gray-600"}
        >
          Donasi
        </a>

        <a
          href="/profile"
          className={pathname === "/profile" ? "text-primary" : "text-gray-600"}
        >
          Riwayat Donasi
        </a>

        {pathname === "/dashboard" ? (
          <a href="#about-section" className="text-gray-600 hover:text-primary">
            Tentang Kami
          </a>
        ) : (
          <a
            href="/dashboard#about-section"
            className="text-gray-600 hover:text-primary"
          >
            Tentang Kami
          </a>
        )}
      </nav>

      {/* PROFILE + LOGOUT */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/profile")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-primary/20 transition"
        >
          <User size={28} className="text-gray-700" />
        </button>

        <button
          className="bg-primary hover:bg-primary/80 text-white px-4 py-1 rounded-md transition"
          onClick={() => router.push("/login")}
        >
          Logout
        </button>
      </div>

    </header>
  );
}
