const ProveedorList = ({ proveedores = [], onEdit, onDelete }) => {
  const data = Array.isArray(proveedores) ? proveedores : [];

  return (
    <div className="proveedor-wrapper">
      <table className="proveedor-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Telofono</th>
            <th>Correo</th>
            <th>Direccion</th>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                </button>
                <button
                  className="btn-actions"
                  onClick={() => onDelete && onDelete(p.id)}
                >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
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
