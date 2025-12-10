import { useState } from "react";

export default function InventarioForm({
  visible,
  categorias = [],
  proveedores = [],
  onAdd,
  onClose,
}) {
  const [form, setForm] = useState({
    categoria: "",
    proveedor: "",
    nombre: "",
    formato_venta: "",
    precio: "",
    stock: "",
    costo: "",
    stock_minimo: "",
    codigo_barra: "",
    descripcion: "",
    imagen: null,
  });
  if (!visible) return null;

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
      precio: parseInt(form.precio, 10),
      stock: parseInt(form.stock, 10),
      stock_minimo: parseInt(form.stock_minimo || "0", 10),
      costo: parseInt(form.costo || "0", 10),
    };

    onAdd(datosAEnviar);

    setForm({
      categoria: "",
      proveedor: "",
      nombre: "",
      formato_venta: "",
      precio: "",
      stock: "",
      costo: "",
      stock_minimo: "",
      codigo_barra: "",
      descripcion: "",
      imagen: null,
    });
  };

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <div className="product-modal-backdrop" onClick={handleClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <div className="product-modal-head">
          <h3 className="mb-0">Agregar producto</h3>
          <button
            type="button"
            className="product-modal-close"
            onClick={handleClose}
            aria-label="Cerrar formulario"
          ></button>
        </div>

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
              {categorias.map((c) => (
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
              {proveedores.map((p) => (
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
          <div className="col-4">
            <input
              type="number"
              name="precio"
              className="form-control"
              placeholder="Precio"
              required
              min="1"
              value={form.precio}
              onChange={handleChange}
            />
          </div>
          <div className="col-4">
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
          <div className="col-md-4">
            <input
              type="number"
              name="costo"
              className="form-control"
              placeholder="Costo"
              min="0"
              value={form.costo}
              onChange={handleChange}
            />
          </div>
          <div className="col-4">
            <input
              type="number"
              name="stock_minimo"
              className="form-control"
              placeholder="Stock minimo (alerta)"
              min="0"
              value={form.stock_minimo}
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
      </div>
    </div>
  );
}
