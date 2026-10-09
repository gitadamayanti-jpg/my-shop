import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";
import AboutPage from "./pages/frontpages/adminpages/AboutPage";
import AdminDashboard from "./pages/frontpages/adminpages/AdminDashboaard";

export default function App() {
  const [cartItems, setCartItems] = useState({});

  const handleAddToCart = (id, quantity = 1) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + quantity,
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

  return (
    <Routes>
      {/* Frontpage Routes */}
      <Route
        path="/"
        element={
          <MainLayout
            cartItems={cartItems}
            setCartItems={setCartItems}
            handleAddToCart={handleAddToCart}
            handleUpdateQty={handleUpdateQty}
          />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      {/* Product Detail */}
      <Route
        path="/product/:id"
        element={
          <ProductDetail
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
            handleUpdateQty={handleUpdateQty}
          />
        }
      />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}