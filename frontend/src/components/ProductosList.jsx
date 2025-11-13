const fmt = new Intl.NumberFormat("es-CL");

const ProductosList = ({ productos, productoSeleccionado, onSelect }) => (
  <div>
    <h2>Productos</h2>
    <ul>
      {productos.map((p) => (
        <li
          key={p.id}
          style={{ cursor: "pointer", color: p.id === productoSeleccionado ? "blue" : "black" }}
          onClick={() => onSelect && onSelect(p.id)}
        >
          {p.nombre} — {p.categoria_detalle?.nombre || p.categoria} — {p.proveedor_detalle?.nombre || p.proveedor || ""}
          {" — $"}{fmt.format(p.precio)} — stock: {p.stock}
        </li>
      ))}
    </ul>
  </div>
);

export default ProductosList;
