import { useState } from "react";

const ProveedorForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      return alert("Ingresa un nombre para el proveedor");
    }

    const direccionTrim = form.direccion.trim();
    if (
      direccionTrim &&
      (direccionTrim.length < 5 || direccionTrim.length > 80)
    ) {
      return alert("La direccion debe tener entre 5 y 80 caracteres");
    }

    onAdd({
      nombre: form.nombre.trim(),
      telefono: form.telefono || "",
      correo: form.correo || "",
      direccion: direccionTrim,
    });
    setForm({ nombre: "", telefono: "", correo: "", direccion: "" });
  };

  return (
    <form className="row g-2 proveedor-form" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Proveedor"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        />
      </div>
      <div className="col-md-6">
        <input
          type="email"
          className="form-control"
          placeholder="Correo"
          value={form.correo}
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Dirección"
          value={form.direccion}
          onChange={(e) => setForm({ ...form, direccion: e.target.value })}
        />
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-dark w-100">
          Agregar
        </button>
      </div>
    </form>
  );
};

export default ProveedorForm;

