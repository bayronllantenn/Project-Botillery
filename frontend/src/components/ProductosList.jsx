const fmt = new Intl.NumberFormat("es-CL");
function obtenerSrcImagen(img) {
  if (typeof img === "string") return img;
  if (img instanceof File) return URL.createObjectURL(img);
  return null;
}

export default function ProductosList({ productos = [], onVer }) {
  if (!productos.length) {
    return <p className="text-muted m-3">No hay productos registrados.</p>;
  }

  return (
    <div className="body-productos">
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
      {productos.map((p) => {
        const imgSrc = obtenerSrcImagen(p.imagen);

        return (
          <div className="col" key={p.id}>
            <div
              className="card shadow-sm h-100 producto-card"
              onClick={() => onVer?.(p)}
              style={{ cursor: "pointer" }}
              title={`Ver detalles de ${p.nombre}`}
            >
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={p.nombre}
                  className="card-img-top producto-img"
                />
              ) : (
                <div className="card-img-top producto-img placeholder-img">
                  {p.nombre}
                </div>
              )}

              <div className="card-body d-flex flex-column">
                {p.categoria_detalle?.nombre && (
                  <p className="text-secondary mb-1">
                    {p.categoria_detalle.nombre}
                  </p>
                )}

                <p className="p-nombre">{p.nombre}</p>
                <p className="p-formato">{p.formato_venta}</p>
                <p className="p-precio  mt-auto">
                  $ {fmt.format(Number(p.precio))}
                </p>
                <p className="p-stock">Stock: {p.stock}</p>
                <div className="d-flex justify-content-end align-items-center mt-auto producto-actions"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}
