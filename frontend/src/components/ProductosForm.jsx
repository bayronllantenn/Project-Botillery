import { useState } from "react";

const ProductosForm = ({ cats, provs, onAdd }) => {
  const [form, setForm] = useState({ categoria:"", proveedor:"", nombre:"", precio:"", stock:"" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.categoria || !form.nombre.trim()) {
      alert("Selecciona categoría y escribe un nombre");
      return;
    }
    const precioInt = parseInt(form.precio, 10);
    if (isNaN(precioInt)) {
      alert("Precio debe ser un número");
      return;
    } else if (precioInt <= 0) {
      alert("Precio debe ser un entero positivo");
      return;
    }
    const stockInt = parseInt(form.stock, 10);
    if (isNaN(stockInt)) {
      alert("Stock debe ser un número");
      return;
    } else if (stockInt <= 0) {
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
    <form className="card-form" onSubmit={handleSubmit}>
      <select value={form.categoria} onChange={e=>setForm({ ...form, categoria:e.target.value })}>
        <option value="">Categoría</option>
        {cats.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
      </select>
      <select value={form.proveedor} onChange={e=>setForm({ ...form, proveedor:e.target.value })}>
        <option value="">Proveedor</option>
        {provs.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
      </select>
      <input type="text" placeholder="Nombre" value={form.nombre} onChange={e=>setForm({ ...form, nombre:e.target.value })}/>
      <input
        type="number"
        placeholder="Precio CLP"
        value={form.precio}
        min={1}
        step={1}
        onKeyDown={(e)=>["e","E","+","-","."].includes(e.key) && e.preventDefault()}
        onChange={e=>setForm({ ...form, precio:e.target.value })}
      />
      <input
        type="number"
        placeholder="Stock"
        value={form.stock}
        min={1}
        step={1}
        onKeyDown={(e)=>["e","E","+","-","."].includes(e.key) && e.preventDefault()}
        onChange={e=>setForm({ ...form, stock:e.target.value })}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default ProductosForm;
