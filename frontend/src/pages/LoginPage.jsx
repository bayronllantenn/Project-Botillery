import { useState } from "react";
import api, { unwrapError } from "../services/api";

export default function LoginPage(){
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!form.username.trim() || !form.password) {
      setMsg("Usuario y contraseña son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const data = await api.post("/usuarios/login/", {
        username: form.username.trim(),
        password: form.password,
      }).then(r => r.data);
      localStorage.setItem("user", JSON.stringify(data));
      setMsg("Ingreso exitoso");
    } catch (e) {
      setMsg("Error: " + JSON.stringify(unwrapError(e)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{padding:16}}>
      <h2>Login</h2>
      <form className="card-form" onSubmit={submit}>
        <input type="text" placeholder="Usuario" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />
        <input type="password" placeholder="Contraseña" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        <button type="submit" disabled={loading}>{loading?"Ingresando...":"Entrar"}</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
