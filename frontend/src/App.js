import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./styles/auth.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VendedorPage from "./pages/VendedorPage";
import InventarioPage from "./pages/InventarioPage";
import GestionarUsuariosPage from "./pages/GestionarUsuariosPage";
import VentasPage from "./pages/VentasPage";

export default function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const [abrirMenu, setAbrirMenu] = useState(false);

  const isAdmin = user?.rol === "admin";
  const rol = user?.rol;

  const roles =
    rol === "admin" ? "Admin" : rol === "cajero" ? "Cajero" : "Vendedor";

  const onLoggedIn = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      {user && (
        <div className="navbar">
          <img src="/img/logo.png" alt="" className="logo" />
          <button
            type="button"
            className="nav-btn nav-btn-menu"
            onClick={() => setAbrirMenu(true)}
          >
            ☰
          </button>
          <div className="nav-actions">
            <button type="button" className="nav-btn nav-btn-role">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
              <span className="nav-btn-label">{roles}</span>
            </button>
            <button
              type="button"
              className="nav-btn nav-btn-logout"
              onClick={logout}
            >
              <span className="nav-btn-label">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}

      {abrirMenu && user && (
        <div className="side-menu">
          <button
            className="side-menu-close"
            onClick={() => setAbrirMenu(false)}
          >
            ×
          </button>

          {isAdmin ? (
            <>
              <button
                onClick={() => {
                  navigate("/productos");
                  setAbrirMenu(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-box-seam me-2"
                  viewBox="0 0 16 18"
                >
                  <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                </svg>
                Inventario
              </button>
              <button
                onClick={() => {
                  navigate("/admin/usuarios");
                  setAbrirMenu(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-person-gear"
                  viewBox="0 0 16 18"
                >
                  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                </svg>
                Usuarios
              </button>
              <button
                onClick={() => {
                  navigate("/ventas");
                  setAbrirMenu(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-coin me-2"
                  viewBox="0 0 16 18"
                >
                  <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                </svg>
                Ventas
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/productos");
                  setAbrirMenu(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-box-seam me-2"
                  viewBox="0 0 16 18"
                >
                  <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                </svg>
                Productos
              </button>
              <button
                onClick={() => {
                  navigate("/ventas");
                  setAbrirMenu(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-coin me-2"
                  viewBox="0 0 16 18"
                >
                  <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                </svg>
                Ventas
              </button>
            </>
          )}
        </div>
      )}

      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/productos" />
            ) : (
              <LoginPage onLoggedIn={onLoggedIn} />
            )
          }
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/productos" /> : <RegisterPage />}
        />
        <Route
          path="/productos"
          element={
            user ? (
              isAdmin ? (
                <InventarioPage />
              ) : (
                <VendedorPage />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            isAdmin ? <GestionarUsuariosPage /> : <Navigate to="/productos" />
          }
        />
        <Route
          path="/ventas"
          element={
            user ? (
              user.rol === "vendedor" || user.rol === "cajero" || isAdmin ? (
                <VentasPage />
              ) : (
                <Navigate to="/productos" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          element={
            user ? <Navigate to="/productos" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
}
