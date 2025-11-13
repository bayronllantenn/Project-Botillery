import { useState } from "react";

const ProveedorForm = ({ onAdd }) => {
  const [form, setForm] = useState({ nombre:"", telefono:"", correo:"", direccion:"" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return alert("Ingresa un nombre para el proveedor");
    onAdd({
      nombre: form.nombre.trim(),
      telefono: form.telefono || "",
      correo: form.correo || "",
      direccion: form.direccion || "",
    });
    setForm({ nombre:"", telefono:"", correo:"", direccion:"" });
  };

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Proveedor" value={form.nombre} onChange={e=>setForm({ ...form, nombre:e.target.value })}/>
      <input type="text" placeholder="Teléfono" value={form.telefono} onChange={e=>setForm({ ...form, telefono:e.target.value })}/>
      <input type="email" placeholder="Correo" value={form.correo} onChange={e=>setForm({ ...form, correo:e.target.value })}/>
      <input type="text" placeholder="Dirección" value={form.direccion} onChange={e=>setForm({ ...form, direccion:e.target.value })}/>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default ProveedorForm;
