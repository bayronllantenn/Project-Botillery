const ProveedorList = (props = {}) => {
  const { proveedores = [], proveedorSeleccionado, onSelect } = props;
  const data = Array.isArray(proveedores) ? proveedores : [];
  return (
  <div>
    <h2>Proveedores</h2>
    <ul>
      {data.map((p) => (
        <li
          key={p.id}
          style={{ cursor: "pointer", color: p.id === proveedorSeleccionado ? "blue" : "black" }}
          onClick={() => onSelect && onSelect(p.id)}
        >
          {p.nombre}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default ProveedorList;
