import { useEffect, useState } from "react";
import api, { unwrapError } from "../services/api";
import "./css/auth.css";

export default function RegisterPage({ onRegistered }) {
  const [form, setForm] = useState({
    username: "",
    nombre: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    document.body.classList.add("auth-page");
    return () => {
      document.body.classList.remove("auth-page");
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!form.username.trim() || !form.password || !form.email.trim()) {
      setMsg("Usuario, correo y contraseña son obligatorios");
      return;
    }
    if (form.password.length <= 8) {
      setMsg("Error: La contraseña debe tener al menos 8 caracteres");
      return;
    }
    setLoading(true);
    try {
      await api.post("/usuarios/register/", {
        username: form.username.trim(),
        password: form.password,
        nombre: form.nombre.trim() || form.username.trim(),
        email: form.email.trim(),
      });
      if (onRegistered) onRegistered();
    } catch (e) {
      setMsg("Error: " + JSON.stringify(unwrapError(e)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-logo">
        <img src="/img/logo.png" alt="Logo" className="auth-logo-img" />
      </div>
      <div className="auth-card">
        <h3 className="text-center mb-3">Crear cuenta</h3>
        <p className="text-center text-secondary">
          Completa el formulario para registrarte
        </p>
        <form onSubmit={submit}>
          <div className="mb-3">
            <div className="input-icon-wrapper">
              <input
                className="form-control input-with-icon"
                type="text"
                placeholder="Usuario"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="input-icon"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </div>
          </div>
          <div className="mb-3">
            <div className="input-icon-wrapper">
              <input
                className="form-control input-with-icon"
                type="text"
                placeholder="Nombre Completo"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="input-icon"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </div>
          </div>
          <div className="mb-3">
            <div className="input-icon-wrapper">
              <input
                className="form-control input-with-icon"
                type="email"
                placeholder="Correo Electronico"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="input-icon"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.217l-8 4.8-8-4.8z" />
                <path d="M0 5.383v6.617a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.383l-7.555 4.533a1 1 0 0 1-1.11 0z" />
              </svg>
            </div>
          </div>
          <div className="mb-3">
            <div className="input-icon-wrapper">
              <input
                className="form-control input-with-icon"
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="input-icon"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
                />
              </svg>
            </div>
          </div>
          <button
            class="btn btn-dark w-100 mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear cuenta"}
          </button>
          <button
            class="btn btn-light w-100 mt-2"
            type="button"
            onClick={() => (window.location.href = "/LoginPage.jsx")}
          >
            Volver
          </button>
        </form>
        {msg && (
          <div className="alert alert-danger mt-3 error-rojo" role="alert">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
