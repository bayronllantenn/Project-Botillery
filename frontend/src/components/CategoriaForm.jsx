import { useState } from "react";

const CategoriaForm = ({ onAdd }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert("Ingresa un nombre para la categoria");
      return;
    }
    onAdd && onAdd({ nombre, descripcion });
    setNombre("");
    setDescripcion("");
  };

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva categoría"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <textarea
        rows="2"
        placeholder="Descripcion"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default CategoriaForm;

