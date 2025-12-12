import { useState } from "react";

const ProveedorList = ({ proveedores = [], onEdit, onDelete }) => {
  const [search, setSearch] = useState("");

  const filtrados = proveedores.filter((p) =>
    (p.nombre || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="proveedor-card">
      <input
        type="text"
        className="categoria-search"
        placeholder="Buscar proveedor por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="inventario-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th style={{ width: "120px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.telefono || "-"}</td>
              <td>{p.correo || "-"}</td>
              <td>{p.direccion || "-"}</td>
              <td className="proveedor-acciones">
                <button className="btn-actions" onClick={() => onEdit(p)}>
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
                <button className="btn-actions" onClick={() => onDelete(p.id)}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtrados.length === 0 && (
        <p style={{ marginTop: "20px", color: "#6b7280" }}>
          No se encontraron proveedores.
        </p>
      )}
    </div>
  );
};

export default ProveedorList;
