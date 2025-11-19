import Image from "next/image";

export default function AboutSection() {
  return (
    <div id="about-section" className="text-center py-16">
      <h2 className="text-3xl font-bold bg-gradient-to-br from-primary to-[#A855F7] bg-clip-text text-transparent mb-6">About Us</h2>

      <div className="flex flex-col lg:flex-row items-center gap-10 max-w-5xl mx-auto px-6">
        <div className="flex justify-center lg:justify-start">
          <Image
            src="/assets/about.png"
            width={400}
            height={400}
            alt="about"
            className="w-400 lg:w-[400px]"
          />
        </div>

        <div className="bg-gradient-to-r from-primary to-[#B857CE] text-white p-6 lg:p-10 rounded-2xl shadow-lg w-full lg:w-3/4 text-left">
        <p className="text-sm lg:text-base leading-relaxed">
          Platform donasi ini hadir untuk memudahkan siapa pun berdonasi secara digital, cepat, dan aman.
          Cukup satu kali pemindaian QR, kamu bisa menyalurkan donasi tanpa repot, kapan saja dan di mana saja.
          <br /><br />
          Kami percaya bahwa setiap donasi memiliki dampak besar.
          Melalui sistem yang transparan dan terintegrasi, kamu bisa melihat riwayat serta status donasimu secara langsung.
          Bersama kami, mari wujudkan ekosistem donasi yang lebih modern, efisien
        </p>
        </div>
      </div>
    </div>
  );
}
