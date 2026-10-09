import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 flex flex-col justify-between font-sans">
      <div>
        <div className="mb-8">
          <h2 className="text-xl font-extrabold text-[#1b4332]">Salero Minang</h2>
          <p className="text-xs text-[#2d6a4f] font-semibold">Halaman admin</p>
        </div>

        <nav className="flex flex-col gap-2">
          <Link
            to="/admin"
            className={`p-3 rounded-xl text-sm font-semibold transition ${
              location.pathname === '/admin'
                ? 'bg-[#2d6a4f] text-white shadow-sm'
                : 'text-gray-600 hover:bg-[#e8f5e9] hover:text-[#1b4332]'
            }`} >
            Dashboard
          </Link>
          <Link
            to="/admin/about"
            className={`p-3 rounded-xl text-sm font-semibold transition ${
              location.pathname === '/admin/about'
                ? 'bg-[#2d6a4f] text-white shadow-sm'
                : 'text-gray-600 hover:bg-[#e8f5e9] hover:text-[#1b4332]'
            }`} >
            About
          </Link>
        </nav>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <Link
          to="/"
          className="text-xs font-bold text-[#2d6a4f] hover:underline flex items-center gap-1">
        Kembali ke Toko
        </Link>
      </div>
    </div>
  );
}