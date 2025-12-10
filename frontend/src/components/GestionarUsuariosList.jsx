import "../styles/gestionusuarios.css";

export default function UsuariosList({
  usuarios = [],
  onEditar,
  onEliminar
}) {
  if (!usuarios.length) {
    return <p className="text-muted m-3">No hay usuarios registrados...</p>;
  }

  return (
    <div className="gestion-usuarios-page">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Correo</th>
            <th>Acciones</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.rol}</td>
              <td>{u.correo}</td>
              <td>
                <button 
                  className="btn btn-sm btn-primary me-1"
                  onClick={() => onEditar?.(u)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => onEliminar?.(u)}
                >
                  Eliminar
                </button>
              </td>
              <td>{u.is_active ? 'Activo' : 'Inactivo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
