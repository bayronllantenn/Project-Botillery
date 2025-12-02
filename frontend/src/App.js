import { useEffect, useState } from "react";
import ProductosPage from "./pages/ProductosPage";
import AdminInventarioPage from "./pages/AdminInventarioPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";

export default function App() {
  /*  Manejo la primera vista la cual sera el login  */
  const [view, setView] = useState("login");

  /*  Carga la sesion del usuario guardando la memoria local en el navegador */
  const [user, setUser] = useState(() => {
    try {
      /*convertir la cadena de texto en un objeto JS*/
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  /*  verificar si el usuario logueado es admin */
  const isAdmin = user?.rol === "admin";

  /*  si el usuario ya inicio sesion debe redirigirlo automaticamente a productos  */
  useEffect(() => {
    if (user) {
      if (view === "login" || view === "register") setView("productos");
    } else {
      /* Si no lo envia de vuelta al login */
      if (view !== "login" && view !== "register") setView("login");
    }
  }, [user, view]);

  /* manejar que sucede despues de que el usuario inicie sesion */
  const onLoggedIn = (u) => {
    setUser(u);
    /* Guarda los datos en la memoria del navegador ej: si el usuario cierra la pestaña y la vuelve a abrir
    la app pueda leerlo y iniciar sesion aytomaticamente*/
    localStorage.setItem("user", JSON.stringify(u));
    setView("productos");
  };

  const onRegistered = () => setView("login");

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setView("login");
  };

  useEffect(() => {
    const body = document.body;

    body.classList.remove("body-productos");
    body.classList.remove("body-categorias");
    body.classList.remove("body-inventario");

    if (user && view === "productos") {
      body.classList.add("body-productos");
    }

    if (user && view === "categorias") {
      body.classList.add("body-categorias");
    }

    if (user && view === "inventario") {
      body.classList.add("body-inventario");
    }
  }, [user, view]);

  return (
    <>
      {user && (
        <div className="navbar">
          <img src="/img/logo.png" alt="" className="logo" />
          <div className="nav-actions">
            <button type="button" className="nav-btn nav-btn-role">
              <span className="nav-btn-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </span>
              <span className="nav-btn-label">
                {isAdmin ? "Admin" : "Trabajador"}
              </span>
            </button>
            <button
              type="button"
              className="nav-btn nav-btn-logout"
              onClick={logout}
            >
              <span className="nav-btn-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.146 11.354a.5.5 0 0 0 .708-.708L9.207 9h3.586a.5.5 0 0 0 0-1H9.207l1.647-1.646a.5.5 0 0 0-.708-.708l-2.5 2.5a.5.5 0 0 0 0 .708z" />
                  <path d="M13 15.5A1.5 1.5 0 0 0 14.5 14V2A1.5 1.5 0 0 0 13 .5h-5A1.5 1.5 0 0 0 6.5 2v3a.5.5 0 0 0 1 0V2A.5.5 0 0 1 7.5 1.5h5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 0-1 0v3A1.5 1.5 0 0 0 8 15.5z" />
                </svg>
              </span>
              <span className="nav-btn-label">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}

      <div className="container" style={{ padding: 16 }}>
        {!user ? (
          <>
            {view === "login" && (
              <LoginPage
                onLoggedIn={onLoggedIn}
                onGoRegister={() => setView("register")}
              />
            )}
            {view === "register" && (
              <RegisterPage onRegistered={onRegistered} />
            )}
          </>
        ) : (
          <>
            {view === "productos" &&
              (isAdmin ? <AdminInventarioPage /> : <ProductosPage />)}
          </>
        )}
      </div>
    </>
  );
}
