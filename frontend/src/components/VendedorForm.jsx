import { useState } from "react";

export default function VendedorForm({ categorias = [], onClose, onCreated }) {
  const [form, setForm] = useState({
    categoria: "",
    nombre: "",
    formato_venta: "",
    precio: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreated?.({
      ...form,
      precio: parseInt(form.precio || "0", 10),
      stock: parseInt(form.stock || "0", 10),
    });
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="form-label">Categoría</label>
        <select
          name="categoria"
          className="form-select"
          required
          value={form.categoria}
          onChange={handleChange}
        >
          <option value="">Seleccionar categoría</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="form-label">Nombre</label>
        <input
          name="nombre"
          className="form-control"
          value={form.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Formato de venta</label>
        <input
          name="formato_venta"
          className="form-control"
          value={form.formato_venta}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Precio</label>
        <input
          type="number"
          name="precio"
          className="form-control"
          min="1"
          value={form.precio}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input
          type="number"
          name="stock"
          className="form-control"
          min="0"
          value={form.stock}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  );
}
