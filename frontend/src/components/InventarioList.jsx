const fmt = new Intl.NumberFormat("es-CL");

const InventarioList = ({ productos }) => {
  return (
    <table className="inventario-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Codigo Barras</th>
          <th>Formato</th>
          <th>Categoria</th>
          <th>Proveedor</th>
          {/*     <th>Precio Venta</th> */}
          <th>Stock Actual</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nombre}</td>
            <td>{p.codigo_barra}</td>
            <td>{p.formato_venta || "-"}</td>
            <td>{p.categoria_detalle?.nombre || p.categoria}</td>
            <td>{p.proveedor_detalle?.nombre || p.proveedor || ""}</td>
            {/*           <td>{fmt.format(p.costo)}</td> */}
            <td>{p.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventarioList;
