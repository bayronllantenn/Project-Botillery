import { useState } from "react";
import api, { unwrapError } from "../services/api";

export default function RegisterPage({ onRegistered }) {
  const [form, setForm] = useState({ username: "", nombre: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!form.username.trim() || !form.password) {
      setMsg("Usuario y contraseña son obligatorios");
      return;
    }
    if (form.password.length < 4) {
      setMsg("La contraseña debe tener al menos 4 caracteres");
      return;
    }
    setLoading(true);
    try {
      await api.post("/usuarios/register/", {
        username: form.username.trim(),
        password: form.password,
        nombre: form.nombre.trim() || form.username.trim(),
        email: form.email || "",
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
      <div className="auth-card">
        <h3>Registro</h3>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input className="form-control" type="text" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input className="form-control" type="text" value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo (opcional)</label>
            <input className="form-control" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input className="form-control" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
          </div>
          <button className="btn btn-primary w-100" type="submit" disabled={loading}>{loading ? "Creando..." : "Crear cuenta"}</button>
        </form>
        {msg && <div className="alert alert-info mt-3" role="alert">{msg}</div>}
      </div>
    </div>
  );
}
