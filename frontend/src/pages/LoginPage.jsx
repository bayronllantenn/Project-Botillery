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
          <svg xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          fill="currentColor" 
          class="input-icon" 
          viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
        </svg>
          </div>

          <button class="btn btn-dark w-100 mt-2" type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
          </button>

          <button
            class="btn btn-light w-100 mt-2"
            type="button"
            onClick={() => props.onGoRegister && props.onGoRegister()}
          >
            Registrarse
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
