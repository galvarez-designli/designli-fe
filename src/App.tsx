import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProductDetail } from "./pages/products/ProductDetail";
import { ProductList } from "./pages/products/ProductsList";

function App() {
  return (
    <Routes>
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/" element={<Navigate to="products" replace />} />
    </Routes>
  );
}

export default App;
