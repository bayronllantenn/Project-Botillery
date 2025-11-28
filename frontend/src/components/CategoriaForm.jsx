import { useState, useEffect } from "react";

const CategoriaForm = ({ onAdd, onEdit, editando }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (editando) {
      setNombre(editando.nombre);
      setDescripcion(editando.descripcion);
    } else {
      setNombre("");
      setDescripcion("");
    }
  }, [editando]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      window.alert("Ingresa un nombre para la categoría");
      return;
    }

    if (editando) {
      onEdit(editando.id, { nombre, descripcion });
    } else {
      onAdd({ nombre, descripcion });
    }

    setNombre("");
    setDescripcion("");
  };

  return (
    <form className="categoria-form" onSubmit={handleSubmit}>
      <h4>{editando ? "Editar Categoría" : "Agregar Categoría"}</h4>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ej: Vinos, Cervezas, Whisky, Bebidas"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          rows="3"
          className="form-control"
          placeholder="Describe esta categoría"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {editando ? "Guardar Cambios" : "Agregar"}
      </button>
    </form>
  );
};

export default CategoriaForm;
