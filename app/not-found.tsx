import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-6">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-5xl font-bold text-green-600 mb-3">404</h1>
      <h2 className="text-xl font-bold text-slate-900 mb-2">
        Halaman tidak ditemukan
      </h2>
      <p className="text-slate-500 mb-8 max-w-sm">
        Halaman yang kamu cari tidak ada, mungkin sudah dipindahkan atau
        tautannya salah.
      </p>
      <Link
        href="/"
        className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
