import { useState } from "react";
import api from "../services/api";

export default function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!username || !password) {
      setMsg("Usuario y contraseña son obligatorios");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/usuarios/login/", {
        username: username,
        password: password,
      });

      const data = res.data;
      localStorage.setItem("user", JSON.stringify(data));

      if (props.onLoggedIn) {
        props.onLoggedIn(data);
      }

    } catch (err) {
      setMsg("Error iniciando sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h3 className="text-center mb-3">Inicio Sesion</h3>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
          </button>

          <button
            className="btn btn-outline-secondary w-100 mt-2"
            type="button"
            onClick={() => props.onGoRegister && props.onGoRegister()}
          >
            Registro
          </button>
        </form>

        {msg && (
          <div className="alert alert-info mt-3" role="alert">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
