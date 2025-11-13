import { useState } from "react";

export default function ProductosForm({ cats, provs, onAdd }) {
const [form, setForm] = useState({ categoria:"", proveedor:"", nombre:"", precio:"", stock:"" });

const handleSubmit = (e) => {
e.preventDefault();
if (!form.categoria || !form.nombre.trim()) {
alert("Selecciona categoría y escribe un nombre");
return;
}
const precioInt = parseInt(form.precio, 10);
if (isNaN(precioInt) || precioInt <= 0) {
alert("Precio debe ser un entero positivo");
return;
}
const stockInt = parseInt(form.stock, 10);
if (isNaN(stockInt) || stockInt <= 0) {
alert("Stock debe ser un entero positivo");
return;
}
onAdd({
categoria: parseInt(form.categoria, 10),
proveedor: form.proveedor ? parseInt(form.proveedor, 10) : null,
nombre: form.nombre.trim(),
precio: precioInt,
stock: stockInt,
});
setForm({ categoria:"", proveedor:"", nombre:"", precio:"", stock:"" });
};

return (
  <form onSubmit={handleSubmit} className="row g-2">
  <div className="col-12">
  <select className="form-select" value={form.categoria} onChange={e=>setForm({ ...form, categoria:e.target.value })}>
  <option value="">Categoría</option>
  {cats.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
  </select>
  </div>
  <div className="col-12">
  <select className="form-select" value={form.proveedor} onChange={e=>setForm({ ...form, proveedor:e.target.value })}>
  <option value="">Proveedor (opcional)</option>
  {provs.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
  </select>
  </div>
  <div className="col-12">
  <input className="form-control" placeholder="Nombre" value={form.nombre} onChange={e=>setForm({ ...form, nombre:e.target.value })}/>
  </div>
  <div className="col-6">
  <input className="form-control" type="number" min={1} step={1}
  onKeyDown={e=>["e","E","+","-","."].includes(e.key)&&e.preventDefault()}
  placeholder="Precio CLP" value={form.precio}
  onChange={e=>setForm({ ...form, precio:e.target.value })}/>
  </div>
  <div className="col-6">
  <input className="form-control" type="number" min={1} step={1}
  onKeyDown={e=>["e","E","+","-","."].includes(e.key)&&e.preventDefault()}
  placeholder="Stock" value={form.stock}
  onChange={e=>setForm({ ...form, stock:e.target.value })}/>
  </div>
  <div className="col-12">
  <button className="btn btn-primary w-100" type="submit">Agregar</button>
  </div>
  </form>
);
}