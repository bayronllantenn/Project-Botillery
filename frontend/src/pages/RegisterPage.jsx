import { useState } from "react";
import api, { unwrapError } from "../services/api";

export default function RegisterPage(){
  const [form, setForm] = useState({ username:"", nombre:"", password:"", email:"" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!form.username.trim() || !form.password) {
      setMsg("Usuario y contraseña son obligatorios");
      return;
    }
    if (form.password.length < 4){
      setMsg("La contraseña debe tener al menos 4 caracteres");
      return;
    }
    setLoading(true);
    try {
      const data = await api.post("/usuarios/register/", {
        username: form.username.trim(),
        password: form.password,
        nombre: form.nombre.trim() || form.username.trim(),
        email: form.email || "",
      }).then(r => r.data);
      localStorage.setItem("user", JSON.stringify(data));
      setMsg("Registro exitoso");
    } catch (e) {
      setMsg("Error: " + JSON.stringify(unwrapError(e)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{padding:16}}>
      <h2>Registro</h2>
      <form className="card-form" onSubmit={submit}>
        <input type="text" placeholder="Usuario" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />
        <input type="text" placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} />
        <input type="email" placeholder="Correo (opcional)" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input type="password" placeholder="Contraseña" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        <button type="submit" disabled={loading}>{loading?"Creando...":"Crear Cuenta"}</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
