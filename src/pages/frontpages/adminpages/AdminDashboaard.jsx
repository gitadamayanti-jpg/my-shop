import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../../../Data/orders';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  // Load data setiap kali halaman Admin dibuka
  useEffect(() => {
    setOrders(getOrders());
  }, []);

  // Handler saat status diubah via dropdown
  const handleStatusChange = (orderId, newStatus) => {
    const updated = updateOrderStatus(orderId, newStatus);
    setOrders(updated);
  };

  // Kalkulasi Otomatis
  const totalPesanan = orders.length;
  const totalPendapatan = orders.reduce((sum, item) => sum + (item.total || 0), 0);

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Admin</h1>

      {/* Box Info */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Panel Admin Salero Minang!</h2>
        <p className="text-gray-600 text-sm">
          Kelola menu makanan dan pantau pesanan masuk secara real-time.
        </p>
      </div>

      {/* Angka Otomatis */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">Total Pesanan Hari Ini</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{totalPesanan}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">Pendapatan Hari Ini</p>
          <p className="text-2xl font-bold text-[#2d6a4f] mt-1">
            Rp {totalPendapatan.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">Total Menu Tersedia</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">14</p>
        </div>
      </div>

      {/* Tabel Pesanan */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-base font-bold text-gray-800 mb-4">Daftar Pesanan Terbaru</h2>

        <div className="overflow-x-auto border-t border-gray-100 pt-3">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600 bg-gray-50">
                <th className="py-2.5 px-3">No</th>
                <th className="py-2.5 px-3">Pelanggan</th>
                <th className="py-2.5 px-3">Menu Pesanan</th>
                <th className="py-2.5 px-3">Total</th>
                <th className="py-2.5 px-3">Status Pesanan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-400 font-medium">
                    Belum ada pesanan masuk.
                  </td>
                </tr>
              ) : (
                orders.map((ord, idx) => (
                  <tr key={ord.id || idx}>
                    <td className="py-3 px-3 font-medium text-gray-500">{idx + 1}</td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-gray-800">{ord.nama}</p>
                      <p className="text-[10px] text-gray-400">{ord.telepon}</p>
                    </td>
                    <td className="py-3 px-3 max-w-xs">{ord.menu}</td>
                    <td className="py-3 px-3 font-bold text-gray-900">
                      Rp {ord.total ? ord.total.toLocaleString('id-ID') : 0}
                    </td>
                    <td className="py-3 px-3">
                      {/* Dropdown Mengubah Status */}
                      <select
                        value={ord.status || 'Menunggu'}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                          ord.status === 'Selesai'
                            ? 'bg-green-100 text-green-700 border-green-300'
                            : ord.status === 'Diproses'
                            ? 'bg-blue-100 text-blue-700 border-blue-300'
                            : 'bg-amber-100 text-amber-700 border-amber-300'
                        }`}
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}