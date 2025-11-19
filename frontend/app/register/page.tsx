"use client";

import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError("Password tidak sama!");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Register gagal");
        return;
      }

      // simpan token
      localStorage.setItem("token", data.token);

      // redirect
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Terjadi kesalahan server");
    }
  };

  return (
    <div className="flex min-h-screen">
      
      {/* LEFT SIDE */}
      <div className="flex-1 bg-primary text-white flex flex-col justify-center items-center p-10 rounded-r-[50px]">
        <h2 className="text-3xl font-bold text-center">Welcome!</h2>
        <p className=" text-center">
          “Setiap kebaikan kecil membawa perubahan besar”
        </p>
        <img
          src="/assets/login.png"
          alt="Charity illustration"
          className="w-80 mb-6"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col justify-center px-20 text-center">
        <h2 className="text-3xl font-bold text-primary">Register</h2>
        <p className="text-gray-600 mb-8">
          Yuk, gabung dan mulai berbagi lewat CharityNow.💫
        </p>

        <form onSubmit={handleRegister} className="w-full max-w-md mx-auto space-y-5 text-left">

          {/* ERROR */}
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Nama
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan namamu"
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2
                focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan emailmu"
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2
                focus:outline-none focus:ring-2 focus:ring-primary"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandimu"
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2
                focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="Masukkan kata sandimu lagi"
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2
                focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-button-off hover:bg-primary text-white py-3 rounded-md font-semibold
            transition-all shadow-md"
          >
            Daftar
          </button>

          <p className="text-sm text-gray-600 text-center">
            Sudah punya akun?{" "}
            <a href="/login" className="text-primary font-semibold hover:underline">
              Masuk
            </a>
          </p>
        </form>
      </div>

    </div>
  );
}
