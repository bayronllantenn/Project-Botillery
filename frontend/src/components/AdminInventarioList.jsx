import { useState } from "react";
export default function AdminInventarioList({
  productos = [],
  onEditar,
  onEliminar,
  onAjustar,
}) {
  const [search, setSearch] = useState("");
  const filtrados = productos.filter((p) => {
    const buscar = search.trim().toLowerCase();
    if (!buscar) return true;
    return (
      p.nombre.toLowerCase().includes(buscar) ||
      (p.codigo_barra || "").toLowerCase().includes(buscar)
    );
  });

  if (!productos.length) {
    return (
      <p className="text-muted m-3">
        No hay productos registrados en el inventario.
      </p>
    );
  }

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="inventario-search"
          placeholder="Busca por nombre o codigo de barra"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="inventario-table">
        <thead>
          <tr className="tabla-arriba">
            <th>ID</th>
            <th>Codigo de barras</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Proveedor</th>
            <th>Formato</th>
            <th>Stock</th>
            <th>Precio venta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.codigo_barra || "-"}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria_detalle?.nombre || "-"}</td>
              <td>{p.proveedor_detalle?.nombre || "-"}</td>
              <td>{p.formato_venta || "-"}</td>
              <td>{p.stock}</td>
              <td>{p.precio}</td>
              <td>
                <button
                  type="button"
                  className="btn-actions me-2"
                  onClick={() => onEditar?.(p)}
                  aria-label="Editar producto"
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
                  className="btn-actions"
                  onClick={() => onEliminar?.(p.id)}
                  aria-label="Eliminar producto"
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

                <button
                  type="button"
                  className="btn-actions"
                  onClick={() => onAjustar?.(p)}
                  aria-label="Aumentar/disminuir stock"
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
                    className="icon icon-tabler icons-tabler-outline icon-tabler-plus-minus"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7h6" />
                    <path d="M7 4v6" />
                    <path d="M20 18h-6" />
                    <path d="M5 19l14 -14" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
