import { useEffect, useState } from "react";
import {Routes,Route,Navigate,useLocation,useNavigate,} from "react-router-dom";
import "./styles/auth.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductosPage from "./pages/ProductosPage";
import AdminInventarioPage from "./pages/AdminInventarioPage";
import GestionUsuariosPage from "./pages/GestionUsuariosPage";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const isAdmin = user?.rol === "admin";

  const onLoggedIn = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const body = document.body;

    body.classList.remove("auth-page", "body-productos", "body-inventario");

    if (!user) {
      body.classList.add("auth-page");
    } else if (location.pathname === "/productos") {
      body.classList.add("body-productos");
    } else if (location.pathname === "/admin") {
      body.classList.add("body-inventario");
    }
  }, [user, location.pathname]);

  return (
    <>
      {user && (
        <div className="navbar">
          <img src="/img/logo.png" alt="" className="logo" />
          <div className="nav-actions">
            <button type="button" className="nav-btn nav-btn-role">
              <span className="nav-btn-label"> {isAdmin ? "Admin" : "Trabajador"} </span>
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

      <div className="container">
        <Routes>
          <Route path="/login" element={ user ? ( <Navigate to="/productos" /> ) : ( <LoginPage onLoggedIn={onLoggedIn} />)} />

          <Route path="/register" element={user ? <Navigate to="/productos" /> : <RegisterPage />} />

          <Route path="/productos" element={ user ? ( isAdmin ? ( <AdminInventarioPage /> ) : ( <ProductosPage />)) : (<Navigate to="/login" />)}/>

          <Route path="/admin" element={ isAdmin ? <AdminInventarioPage /> : <Navigate to="/productos" />}/>

          <Route path="/admin/usuarios" element={ isAdmin ? (<GestionUsuariosPage/> ) : ( <Navigate to="/productos"/>) }/>
          
          <Route path="*" element={ user ? <Navigate to="/productos" /> : <Navigate to="/login" /> } /> </Routes>
      </div>
    </>
  );
}
