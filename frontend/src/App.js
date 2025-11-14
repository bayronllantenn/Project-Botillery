import { useEffect, useState } from "react";
import ProductosPage from "./pages/ProductosPage";
import CategoriasPage from "./pages/CategoriasPage";
import ProveedoresPage from "./pages/ProveedoresPage";
import InventarioPage from "./pages/InventarioPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const [view, setView] = useState("login");
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  });

  useEffect(() => {
    if (user) {
      if (view === "login" || view === "register") setView("home");
    } else {
      if (view !== "login" && view !== "register") setView("login");
    }
  }, [user, view]);

  const onLoggedIn = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
    setView("home");
  };

  const onRegistered = () => setView("login");

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setView("login");
  };

  return (
    <div className="container" style={{ padding: 16 }}>
      <div className="brandbar">
        <img src="/img/logo.png" alt="Logo" className="brand-logo" />
      </div>

      {user && (
                  <div className="nav d-flex justify-content-center gap-2">
            <button onClick={() => setView("home")}>Inicio</button>
            <button onClick={() => setView("productos")}>Productos</button>
            <button onClick={() => setView("categorias")}>Categorías</button>
            <button onClick={() => setView("proveedores")}>Proveedores</button>
            <button onClick={() => setView("inventario")}>Inventario</button>
            <button onClick={logout}>Salir</button>
          </div>
      )}  

      {!user ? (
        <>
          {view === "login" && (
            <LoginPage
              onLoggedIn={onLoggedIn}
              onGoRegister={() => setView("register")}
            />
          )}
          {view === "register" && <RegisterPage onRegistered={onRegistered} />}
        </>
      ) : (
        <>
          {view === "home"}
          {view === "productos" && <ProductosPage />}
          {view === "categorias" && <CategoriasPage />}
          {view === "proveedores" && <ProveedoresPage />}
          {view === "inventario" && <InventarioPage />}
        </>
      )}
    </div>
  );
}
