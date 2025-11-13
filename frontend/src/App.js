import { useState } from "react";
import ProductosPage from "./pages/ProductosPage";
import CategoriasPage from "./pages/CategoriasPage";
import ProveedoresPage from "./pages/ProveedoresPage";
import InventarioPage from "./pages/InventarioPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const [view, setView] = useState("");

  return (
    <div style={{ padding: 16 }}>
      <h2>Inicio</h2>
      <div style={{ marginBottom: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => setView("productos")}>Productos</button>
        <button onClick={() => setView("categorias")}>Categorías</button>
        <button onClick={() => setView("proveedores")}>Proveedores</button>
        <button onClick={() => setView("inventario")}>Inventario</button>
        <button onClick={() => setView("login")}>Login</button>
        <button onClick={() => setView("register")}>Registro</button>
      </div>
    
      {!view && <p>Selecciona una opción para comenzar.</p>}
      {view === "productos" && <ProductosPage />}
      {view === "categorias" && <CategoriasPage />}
      {view === "proveedores" && <ProveedoresPage />}
      {view === "inventario" && <InventarioPage />}
      {view === "login" && <LoginPage />}
      {view === "register" && <RegisterPage />}
    </div>
  );
}
