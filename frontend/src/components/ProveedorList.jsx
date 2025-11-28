const ProveedorList = ({ proveedores = [], onEdit, onDelete }) => {
  const data = Array.isArray(proveedores) ? proveedores : [];

  return (
    <div className="proveedor-wrapper">
      <table className="proveedor-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.telefono || "-"}</td>
              <td>{p.correo || "-"}</td>
              <td>{p.direccion || "-"}</td>
              <td>
                <button
                  className="btn-actions"
                  onClick={() => onEdit && onEdit(p)}
                >
                  Editar
                </button>
                <button
                  className="btn-actions"
                  onClick={() => onDelete && onDelete(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <p style={{ marginTop: 12, color: "#6b7280" }}>
          No hay proveedores cargados.
        </p>
      )}
    </div>
  );
};

export default ProveedorList;

