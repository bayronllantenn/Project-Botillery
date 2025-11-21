export default function ProductosList({ productos = [], onVer }) {
  if (!productos.length) {
    return <p className="text-muted m-3">No hay productos registrados.</p>;
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
      {productos.map((p) => (
        <div className="col" key={p.id}>
          <div className="card shadow-sm h-100 producto-card">
            {p.imagen ? (
              <img
                src={p.imagen}
                alt={p.nombre}
                className="card-img-top producto-img"
              />
            ) : (
              <div className="card-img-top producto-img placeholder-img">
                {p.nombre}
              </div>
            )}
            <div className="card-body d-flex flex-column">
              <p className="text-secondary mb-1">
                {p.categoria_detalle.nombre}
              </p>
              <p className="p-nombre">{p.nombre}</p>
              <p className="text-secondary mb-1">
                Formato: {p.formato_venta || "Sin formato"}
              </p>
              <p class="p-precio">Precio: $ {p.precio}</p>

              <div className="d-flex justify-content-between align-items-center mt-auto producto-actions">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => onVer && onVer(p)}
                >
                  Ver
                </button>
                <p className="p-stock">Stock: {p.stock}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
