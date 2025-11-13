const CategoriaList = (props = {}) => {
  const { categorias = [], categoriaSeleccionada, onSelect } = props;
  const data = Array.isArray(categorias) ? categorias : [];
  return (
    <div>
      <h3>Listado</h3>
      {data.length === 0 ? (
        <p>No hay categorías.</p>
      ) : (
        <ul>
          {data.map((cat) => (
            <li
              key={cat.id}
              style={{ cursor: "pointer", color: cat.id === categoriaSeleccionada ? "blue" : "black" }}
              onClick={() => onSelect && onSelect(cat.id)}
            >
              {cat.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriaList;
