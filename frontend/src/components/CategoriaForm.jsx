import { useState, useEffect } from "react";

const CategoriaForm = ({ onAdd, onEdit, editando, onClose }) => {
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
    onClose && onClose();
  };

  return (
    <form className="categoria-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre Categoria: Vinos, Cervezas, Bebidas"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <textarea
          rows="3"
          className="form-control"
          placeholder="Describe esta categoría"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-dark w-100">
        {editando ? "Guardar cambios" : "Guardar"}
      </button>
    </form>
  );
};

export default CategoriaForm;
