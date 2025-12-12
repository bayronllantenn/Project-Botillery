export default function GestionarUsuariosList({
  usuarios,
  onEditar,
  onEliminar,
  onNuevo,
  busqueda,
  onBusquedaChange,
}) {
  return (
    <>
      <div className="user-toolbar">
        <input
          type="text"
          className="user-search-input"
          placeholder="Buscar usuario, correo o nombre"
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-dark user-new-btn"
          onClick={onNuevo}
        >
          Nuevo usuario
        </button>
      </div>

      <div className="user-table-wrap">
        <table className="user-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.nombre}</td>
                <td>{u.rol}</td>
                <td>
                  <div className="user-actions">
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={() => onEditar(u)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                        <path d="M16 5l3 3" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={() => onEliminar(u)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {usuarios.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
