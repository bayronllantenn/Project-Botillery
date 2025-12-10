import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/vendedor.css";
import VendedorList from "../components/VendedorList";

const fmt = new Intl.NumberFormat("es-CL");

export default function VendedorPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [venta, setVenta] = useState({ producto_id: "", cantidad: "" });
  const [mostrarVenta, setMostrarVenta] = useState(false);
  const [productoActivo, setProductoActivo] = useState(null);
  const [resumen, setResumen] = useState({
    mis_ventas: 0,
    total_vendido: 0,
    productos_disponibles: 0,
  });

  const loadAll = async () => {
    try {
      const prodsRes = await api.get("/inventario/productos/");
      setProductos(prodsRes.data);
      const catsRes = await api.get("/inventario/categorias/");
      setCategorias(catsRes.data);
    } catch (error) {
      setProductos([]);
      alert("No se pudieron cargar los productos");
    }
  };

  const productosFiltrados =
    categoriaSeleccionada === "todos"
      ? productos
      : productos.filter(
          (p) => p.categoria_detalle?.id === categoriaSeleccionada
        );

  const loadResumen = async () => {
    try {
      const res = await api.get("/ventas/resumen/");
      setResumen(res.data);
    } catch {
      setResumen({
        mis_ventas: 0,
        total_vendido: 0,
        productos_disponibles: 0,
      });
    }
  };

  useEffect(() => {
    loadAll();
    loadResumen();
  }, []);

  const abrirVenta = (p) => {
    setVenta({
      producto_id: p ? String(p.id) : "",
      cantidad: "",
    });
    setMostrarVenta(true);
  };

  const registrarVenta = async (e) => {
    e.preventDefault();
    const pid = parseInt(venta.producto_id, 10);
    const cant = parseInt(venta.cantidad, 10);

    if (!pid || !Number.isInteger(cant) || cant <= 0) {
      alert("Selecciona un producto y una cantidad mayor a 0");
      return;
    }

    const productoSeleccionado = productos.find((p) => p.id === pid);
    if (!productoSeleccionado) {
      alert("Producto no encontrado");
      return;
    }

    try {
      await api.post("/ventas/crear/", {
        detalles: [
          {
            producto_id: pid,
            cantidad: cant,
            precio_unitario: productoSeleccionado.precio,
          },
        ],
      });

      setMostrarVenta(false);
      setVenta({ producto_id: "", cantidad: "" });
      await loadAll();
      await loadResumen();
    } catch (error) {
      alert("No se pudo registrar la venta");
    }
  };
  const verProducto = (p) => setProductoActivo(p);
  const cerrarDetalle = () => setProductoActivo(null);

  return (
    <main>
      <div className="hero-wrapper">
        <div className="hero-box">
          <h1>Panel de Vendedor</h1>
          <p className="text-body-secondary">
            Registra ventas y consulta el inventario
          </p>

          <div className="seller-cards d-flex flex-column flex-md-row gap-3">
            <div className="seller-card">
              <div className="seller-card-head">
                <span>Venta de hoy</span>
              </div>
              <div className="seller-card-body">
                <span className="seller-number">{resumen.mis_ventas}</span>
              </div>
            </div>

            <div className="seller-card">
              <div className="seller-card-head">
                <span>Total vendido hoy</span>
              </div>
              <div className="seller-card-body">
                <span className="seller-number">
                  ${fmt.format(Number(resumen.total_vendido || 0))}
                </span>
              </div>
            </div>

            <div className="seller-card">
              <div className="seller-card-head">
                <span>Productos en stock</span>
              </div>
              <div className="seller-card-body">
                <span className="seller-number">
                  {resumen.productos_disponibles}
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-2 flex-wrap mt-3">
            <button
              type="button"
              className="btn-productos"
              onClick={() => abrirVenta(null)}
            >
              Agregar venta
            </button>
          </div>
        </div>

        <div className="hero-gap"></div>
      </div>

      <div className="vendedor-tab bfiltro overflow-auto">
        <div className="d-inline-flex gap-2">
          <button
            type="button"
            className={`botones-filtro ${
              categoriaSeleccionada === "todos" ? "active" : ""
            }`}
            onClick={() => setCategoriaSeleccionada("todos")}
          >
            Todos
          </button>
          {categorias.map((c) => (
            <button
              key={c.id}
              className={`botones-filtro ${
                categoriaSeleccionada === c.id ? "active" : ""
              }`}
              onClick={() => setCategoriaSeleccionada(c.id)}
            >
              {c.nombre}
            </button>
          ))}
        </div>
      </div>

      <section className="album bg-body">
        <div className="container">
          <VendedorList productos={productosFiltrados} onVer={verProducto} />
        </div>
      </section>

      {mostrarVenta && (
        <div className="overlay-productos">
          <div
            className="overlay-backdrop"
            onClick={() => setMostrarVenta(false)}
          />
          <div className="overlay-modal">
            <div className="overlay-modal-header">
              <h5>Registrar venta</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setMostrarVenta(false)}
              />
            </div>
            <div className="overlay-modal-body">
              <form onSubmit={registrarVenta} className="row g-2">
                <div className="col-12">
                  <select
                    className="form-select"
                    value={venta.producto_id}
                    onChange={(e) =>
                      setVenta({ ...venta, producto_id: e.target.value })
                    }
                  >
                    <option value="">Producto</option>
                    {productos.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre} - {p.formato_venta} (Stock: {p.stock})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <input
                    className="form-control"
                    type="number"
                    min={1}
                    placeholder="Cantidad vendida"
                    value={venta.cantidad}
                    onChange={(e) =>
                      setVenta({ ...venta, cantidad: e.target.value })
                    }
                  />
                </div>
                <div className="col-12">
                  <button className="btn btn-dark w-100" type="submit">
                    Descontar stock
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {productoActivo && (
        <div className="overlay-productos">
          <div className="overlay-backdrop" onClick={cerrarDetalle} />
          <div className="overlay-modal">
            <div className="overlay-modal-header">
              <h5>Detalle de producto</h5>
              <button
                type="button"
                className="btn-close"
                onClick={cerrarDetalle}
              />
            </div>
            <div className="overlay-modal-body">
              {productoActivo.imagen && (
                <img
                  src={productoActivo.imagen}
                  alt={productoActivo.nombre}
                  className="img-fluid mb-3"
                  style={{ maxHeight: 1000, width: "100%" }}
                />
              )}
              <p>
                <strong>Nombre:</strong> {productoActivo.nombre}
              </p>
              <p>
                <strong>Formato:</strong>{" "}
                {productoActivo.formato_venta || "Sin formato"}
              </p>
              <p>
                <strong>Precio:</strong> $
                {fmt.format(Number(productoActivo.precio))}
              </p>
              <p>
                <strong>Descripción:</strong>{" "}
                {productoActivo.descripcion || "Sin descripción"}
              </p>
              <p>
                <strong>Stock actual:</strong> {productoActivo.stock}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
