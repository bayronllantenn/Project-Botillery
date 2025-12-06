import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!username || !password) {
      setMsg("Error: Usuario y contraseña son obligatorios");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/usuarios/login/", {
        username: username,
        password: password,
      });

      const data = res.data;

      if (props.onLoggedIn) {
        props.onLoggedIn(data);
      }

      navigate("/productos", { replace: true });
    } catch (err) {
      setMsg("Error: Credenciales Invalidas");
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
        <h3 className="text-center mb-3">Bienvenido</h3>
        <p className="text-center text-secondary">
          Ingresa con tu cuenta o regístrate
        </p>

        <form onSubmit={submit}>
          <div className="mb-3 input-icon-wrapper">
            <input
              className="form-control input-with-icon"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <div className="mb-3 input-icon-wrapper">
            <input
              className="form-control input-with-icon"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="input-icon"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
              />
            </svg>
          </div>

          <button class="button" type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
          </button>

          <p className="auth-registro">
            ¿No tienes cuenta?{" "}
            <span className="auth-link" onClick={() => navigate("/register")}>
              Registrarse
            </span>
          </p>
        </form>

        {msg && <div class="alert alert-danger mt-3 error-rojo">{msg}</div>}
      </div>
    </div>
    </div>
  );
}
