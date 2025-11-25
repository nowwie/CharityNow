"use client";

import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: any) {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login gagal");
        return;
      }

      console.log("LOGIN BERHASIL:", data);

      localStorage.setItem("token", data.token);
      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    

    } catch (err) {
    setError("Gagal menghubungi server!");
  }
}

return (
  <div className="flex min-h-screen">

    <div className="flex-1 bg-primary text-white flex flex-col justify-center items-center p-10 rounded-r-[50px]">
      <h1 className="text-3xl font-bold">CharityNow</h1>
      <p className="text-center text-sm mt-3 max-w-xs">
        “Setiap kebaikan kecil membawa perubahan besar”
      </p>
      <img
        src="/assets/login.png"
        alt="Charity illustration"
        className="w-80 mb-6"
      />
    </div>

    <div className="flex-1 flex flex-col justify-center px-16 ">
      <h2 className="text-3xl font-semibold text-primary text-center">
        Welcome Back!
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Yuk lanjutkan aksi kebaikanmu bersama CharityNow.
      </p>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Masukkan emailmu"
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Kata Sandi
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Masukkan kata sandimu"
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-button-off hover:bg-primary text-white py-2 rounded-md font-semibold transition"
        >
          Masuk
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-5">
        Belum punya akun?{" "}
        <a href="/register" className="text-primary font-semibold hover:underline">
          Daftar sekarang
        </a>
      </p>
    </div>
  </div>
);
}
