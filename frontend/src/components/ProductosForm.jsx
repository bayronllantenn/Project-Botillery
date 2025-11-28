import { useState } from "react";

export default function ProductosForm({ cats, provs, onAdd }) {
  const [form, setForm] = useState({
    categoria: "",
    proveedor: "",
    nombre: "",
    formato_venta: "",
    precio: "",
    stock: "",
    codigo_barra: "",
    descripcion: "",
    imagen: null,
  });

  const handleChange = (e) => {
    const valor = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setForm({
      ...form,
      [e.target.name]: valor,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datosAEnviar = {
      ...form,
      precio: parseInt(form.precio),
      stock: parseInt(form.stock),
    };

    onAdd(datosAEnviar);

    setForm({
      categoria: "",
      proveedor: "",
      nombre: "",
      formato_venta: "",
      precio: "",
      stock: "",
      codigo_barra: "",
      descripcion: "",
      imagen: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="row g-2 p-3 border rounded">
      <div className="col-md-6">
        <select
          name="categoria"
          className="form-select"
          required
          value={form.categoria}
          onChange={handleChange}
        >
          <option value="">Seleccionar Categoría</option>
          {cats.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-6">
        <select
          name="proveedor"
          className="form-select"
          value={form.proveedor}
          onChange={handleChange}
        >
          <option value="">Proveedor (Opcional)</option>
          {provs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12">
        <input
          name="nombre"
          className="form-control"
          placeholder="Nombre"
          required
          value={form.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="col-12">
        <input
          name="formato_venta"
          className="form-control"
          placeholder="Formato (Ej: Pack 6, Unidad , Cajetilla)"
          required
          value={form.formato_venta}
          onChange={handleChange}
        />
      </div>

      <div className="col-12">
        <input
          name="codigo_barra"
          className="form-control"
          placeholder="Código de Barras"
          value={form.codigo_barra}
          onChange={handleChange}
          inputMode="numeric"
          minLength={13}
          maxLength={14}
          pattern="[0-9]{13,14}"
          title="Ingresa 13 o 14 dígitos"
          required
        />
      </div>

      <div className="col-6">
        <input
          type="number"
          name="precio"
          className="form-control"
          placeholder="Precio "
          required
          min="1"
          value={form.precio}
          onChange={handleChange}
        />
      </div>

      <div className="col-6">
        <input
          type="number"
          name="stock"
          className="form-control"
          placeholder="Stock Inicial"
          required
          min="0"
          value={form.stock}
          onChange={handleChange}
        />
      </div>

      <div className="col-12">
        <textarea
          name="descripcion"
          className="form-control"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="col-12">
        <input
          type="file"
          name="imagen"
          className="form-control"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <div className="col-12">
        <button className="btn btn-dark w-100" type="submit">
          Guardar
        </button>
      </div>
    </form>
  );
}
