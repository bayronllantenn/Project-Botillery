import { useEffect, useState } from "react";
import api from "../services/api";
import "./css/productos.css";
import ProductosList from "../components/ProductosList";
const fmt = new Intl.NumberFormat("es-CL");

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
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
    } catch (error) {
      setProductos([]);
      alert("No se pudieron cargar los productos");
    }
  };

  const loadResumen = async () => {
    try {
      const res = await api.get("/ventas/resumen/");
      setResumen(res.data);
    } catch {
      setResumen({ mis_ventas: 0, total_vendido: 0, productos_disponibles: 0 });
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
    try {
      await api.post("/inventario/productos/ajustar_stock/", {
        producto_id: pid,
        cantidad: -cant,
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
      <section className="seller-hero">
        <h1>Panel de Vendedor</h1>
        <p className="text-body-secondary">
          Registra ventas y consulta el inventario
        </p>
        <div className="seller-cards">
          <div className="seller-card">
            <div className="seller-card-head">
              <span>Mis Ventas</span>
              <span className="seller-icon">🛒</span>
            </div>
            <div className="seller-card-body">
              <span className="seller-number">{resumen.mis_ventas}</span>
            </div>
          </div>
          <div className="seller-card">
            <div className="seller-card-head">
              <span>Total Vendido</span>
              <span className="seller-icon">📈</span>
            </div>
            <div className="seller-card-body">
              <span className="seller-number">
                ${fmt.format(resumen.total_vendido || 0)}
              </span>
            </div>
          </div>
          <div className="seller-card">
            <div className="seller-card-head">
              <span>Productos Disponibles</span>
              <span className="seller-icon">📦</span>
            </div>
            <div className="seller-card-body">
              <span className="seller-number">
                {resumen.productos_disponibles}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 flex-wrap mt-3">
          <button type="button" className="btn-productos" onClick={loadAll}>
            Actualizar lista
          </button>
          <button
            type="button"
            className="btn-productos"
            onClick={() => abrirVenta(null)}
          >
            Agregar venta
          </button>
        </div>
      </section>

      <section className="album bg-body">
        <div className="container">
          <ProductosList productos={productos} onVer={verProducto} />
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
                        {p.nombre} (Stock: {p.stock})
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
                  style={{ maxHeight: 260, objectFit: "cover", width: "100%" }}
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
                <strong>Precio:</strong> ${fmt.format(productoActivo.precio)}
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
