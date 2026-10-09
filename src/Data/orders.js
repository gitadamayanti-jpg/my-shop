// Ambil data pesanan dari localStorage (jika ada)
export const getOrders = () => {
  return JSON.parse(localStorage.getItem('salero_orders') || '[]');
};

// Tambah pesanan baru ke localStorage
export const addOrder = (newOrder) => {
  const currentOrders = getOrders();
  const orderWithId = {
    id: Date.now(),
    waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    ...newOrder
  };
  const updatedOrders = [orderWithId, ...currentOrders];
  localStorage.setItem('salero_orders', JSON.stringify(updatedOrders));
};

// Ubah status pesanan (Menunggu / Diproses / Selesai)
export const updateOrderStatus = (orderId, newStatus) => {
  const currentOrders = getOrders();
  const updatedOrders = currentOrders.map((order) =>
    order.id === orderId ? { ...order, status: newStatus } : order
  );
  localStorage.setItem('salero_orders', JSON.stringify(updatedOrders));
  return updatedOrders;
};