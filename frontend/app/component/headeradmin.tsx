"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm py-3 px-8 flex items-center justify-between">

      <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
        <Image src="/assets/Vector.png" width={32} height={32} alt="logo" />
        <h1 className="text-primary font-semibold text-xl">CharityNow</h1>
      </div>


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
          href="/admin/dashboard"
          className={pathname === "/admin/dashboard" ? "text-primary" : "text-gray-600"}
        >
          Kelola Donasi
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


      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden"  onClick={() => router.push("/profile")}>
          <Image
            src="/assets/proof.jpg"
            alt="profile"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>

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
