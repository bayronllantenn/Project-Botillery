import { useState, useEffect } from "react";
import ProductosPage from "./pages/ProductosPage";
import CategoriasPage from "./pages/CategoriasPage";
import ProveedoresPage from "./pages/ProveedoresPage";
import InventarioPage from "./pages/InventarioPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const [view, setView] = useState("login");

  useEffect(() => {
    if (localStorage.getItem("user")) setView("productos");
  }, []);

  return (
    <div className="container">
      <h2>Inicio</h2>
      <div className="nav">
        <button onClick={() => setView("login")}>Login</button>
        <button onClick={() => setView("register")}>Registro</button>
        <button onClick={() => setView("productos")}>Productos</button>
        <button onClick={() => setView("categorias")}>Categorías</button>
        <button onClick={() => setView("proveedores")}>Proveedores</button>
        <button onClick={() => setView("inventario")}>Inventario</button>
      </div>

      {view === "login" && <LoginPage onLoggedIn={() => setView("productos")} />}
      {view === "register" && <RegisterPage />}
      {view === "productos" && <ProductosPage />}
      {view === "categorias" && <CategoriasPage />}
      {view === "proveedores" && <ProveedoresPage />}
      {view === "inventario" && <InventarioPage />}
      {!view && <p>Selecciona una opción para comenzar.</p>}
    </div>
  );
}
