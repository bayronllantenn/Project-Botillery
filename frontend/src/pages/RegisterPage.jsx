import { useEffect, useState } from "react";
import api, { unwrapError } from "../services/api";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    nombre: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.username.trim() || !form.password || !form.email.trim()) {
      setMsg("Error: Usuario, correo y contraseña son obligatorios");
      return;
    }
    if (form.password.length <= 8) {
      setMsg("Error: La contraseña debe tener al menos 8 caracteres");
      return;
    }
    setLoading(true);
    try {
      await api.post("/register/", {
        username: form.username.trim(),
        password: form.password,
        nombre: form.nombre.trim() || form.username.trim(),
        email: form.email.trim(),
      });

      setMsg("Registro exitoso");

      setTimeout(() => navigate("/login"), 1000);
    } catch (e) {
      const errorMensaje = unwrapError(e);
      let errorMessage = "Error desconocido";

      if (errorMensaje) {
        if (errorMensaje.email) {
          errorMessage = errorMensaje.email[0];
        } else if (errorMensaje.username) {
          errorMessage = errorMensaje.username[0];
        } else if (typeof errorMensaje === "string") {
          errorMessage = errorMensaje;
        } else {
          errorMessage = "Error de validación: Revise los campos.";
        }
      }

      setMsg("Error: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-background">
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
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
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
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
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
            <button class="button" type="submit" disabled={loading}>
              {loading ? "Creando..." : "Crear cuenta"}
            </button>
            <p className="auth-registro">
              ¿Ya tienes cuenta?{" "}
              <span className="auth-link" onClick={() => navigate("/login")}>
                Iniciar Sesion
              </span>
            </p>
          </form>
          {msg && (
            <div
              className={
                msg.startsWith("Error") ? "error-rojo" : "alerta-verde"
              }
              role="alert"
            >
              {msg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
