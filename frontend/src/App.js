import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./styles/auth.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VendedorPage from "./pages/VendedorPage";
import InventarioPage from "./pages/InventarioPage";
import GestionUsuariosPage from "./pages/GestionUsuariosPage";

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
                Inventario
              </button>
              <button
                onClick={() => {
                  navigate("/admin/usuarios");
                  setAbrirMenu(false);
                }}
              >
                Usuarios
              </button>
              <button
                onClick={() => {
                  navigate("/ventas");
                  setAbrirMenu(false);
                }}
              >
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
                Panel vendedor
              </button>
              <button
                onClick={() => {
                  navigate("/ventas");
                  setAbrirMenu(false);
                }}
              >
                Ventas
              </button>
            </>
          )}
        </div>
      )}

      <div className="container">
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
              isAdmin ? <GestionUsuariosPage /> : <Navigate to="/productos" />
            }
          />
          <Route
            path="*"
            element={
              user ? <Navigate to="/productos" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </>
  );
}
