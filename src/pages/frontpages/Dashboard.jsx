import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { menu } from '../../Data/menu';

export default function Dashboard(props) {
  const context = useOutletContext() || {};
  const cartItems = props.cartItems || context.cartItems || {};
  const setCartItems = props.setCartItems || context.setCartItems || (() => {});
  const searchTerm = context.searchTerm || '';
  const selectedCategory = context.selectedCategory || 'Semua Kategori';

  const handleAddToCart = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleUpdateQty = (id, delta) => {
    setCartItems((prev) => {
      const currentQty = prev[id] || 0;
      const newQty = currentQty + delta;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const filteredMenu = menu.filter((item) => {
    const matchesSearch = item.nama ? item.nama.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    
    const matchesCategory =
      selectedCategory === 'Semua Kategori' ||
      (item.kategori && item.kategori.toLowerCase().includes(selectedCategory.toLowerCase()));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#e8f5e9] p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Dashboard */}
        <div className="bg-white border border-[#74c69d] rounded-2xl p-5 mb-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Menu Salero Minang</h1>
            <p className="text-xs text-gray-600 font-medium">
              Jl. Andi Tabachina, Kertoraharjo, Tomoni Timur | Buka Pukul: 09.00 - 21.00 WITA
              <p className="text-xs text-gray-600 font-medium"></p>
              Nikmati makanan khas minang yang otentik dan halal
            </p>
          </div>
          <div className="text-xs font-semibold text-[#2d6a4f] bg-[#e8f5e9] px-3 py-1.5 rounded-lg">
            Buka
          </div>
        </div>

        {/* Daftar Kartu Menu */}
        {filteredMenu.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredMenu.map((item) => {
              const qty = cartItems[item.id] || 0;

              return (
                <div
                  key={item.id}
                  className="border border-[#74c69d] rounded-2xl p-5 bg-white flex flex-col justify-between h-auto shadow-sm hover:shadow-md transition"
                >
                  <div>
                    {/* Gambar Produk */}
                    {item.gambar && (
                      <img
                        src={item.gambar}
                        alt={item.nama}
                        className="w-full h-44 object-cover rounded-xl mb-3"
                      />
                    )}

                    {/* Nama Produk */}
                    <h2 className="text-lg font-bold text-gray-900 mb-2">{item.nama}</h2>
                    
                    {/* Harga */}
                    <p className="text-base font-bold text-[#2d6a4f] mb-1">
                      Rp {item.harga ? item.harga.toLocaleString('id-ID') : 0}
                    </p>

                    {/* Rating Berada di Bawah Harga */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-4">
                      <span className="font-medium">Rating:</span>
                      <span className="font-bold text-amber-600">{item.rating || 4.8} / 5.0</span>
                    </div>
                  </div>

                  {/* Tombol Aksi */}
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/product/${item.id}`}
                      className="w-full text-center py-2 px-4 border border-[#2d6a4f] text-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white rounded-xl font-semibold text-sm transition-all duration-200"
                    >
                      Lihat Detail
                    </Link>

                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item.id)}
                        className="w-full text-center py-2 px-4 border border-[#2d6a4f] text-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white rounded-xl font-semibold text-sm transition-all duration-200"
                      >
                        + Tambah ke Keranjang
                      </button>
                    ) : (
                      <div className="flex items-center justify-between border border-[#2d6a4f] bg-[#e8f5e9] px-4 py-1.5 rounded-xl">
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.id, -1)}
                          className="font-bold text-[#2d6a4f] text-lg px-2 hover:opacity-75"
                        >
                          -
                        </button>
                        <span className="font-bold text-sm text-[#1b4332]">{qty}</span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.id, 1)}
                          className="font-bold text-[#2d6a4f] text-lg px-2 hover:opacity-75"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#74c69d]">
            <p className="text-gray-500 font-medium">Produk tidak ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}