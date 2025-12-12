import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/vendedor.css";
import VendedorList from "../components/VendedorList";
import InventarioForm from "../components/InventarioForm";

const fmt = new Intl.NumberFormat("es-CL");

export default function VendedorPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [productoActivo, setProductoActivo] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [crearAbierto, setCrearAbierto] = useState(false);

  const loadAll = async () => {
    try {
      const prodsRes = await api.get("/inventario/productos/");
      setProductos(prodsRes.data);
      const catsRes = await api.get("/inventario/categorias/");
      setCategorias(catsRes.data);
      const provRes = await api.get("/inventario/proveedores/");
      setProveedores(provRes.data);
    } catch {
      setProductos([]);
      alert("No se pudieron cargar los productos");
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const productosFiltrados = productos
    .filter((p) =>
      categoriaSeleccionada === "todos"
        ? true
        : p.categoria_detalle?.id === categoriaSeleccionada
    )
    .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  const verProducto = (p) => setProductoActivo(p);
  const cerrarDetalle = () => setProductoActivo(null);

  const handleAddProducto = async (datosAEnviar) => {
    try {
      const res = await api.post("/inventario/productos/", datosAEnviar);
      setProductos((prev) => [...prev, res.data]);
      setCrearAbierto(false);
    } catch {
      alert("No se pudo crear el producto");
    }
  };

  return (
    <main>
      <div className="hero-wrapper">
        <div className="hero-box">
          <h1>Panel de Vendedor</h1>
          <p className="text-body-secondary">
            Gestiona el inventario de la botillería
          </p>

          <div className="hero-actions d-flex flex-column flex-md-row gap-2 justify-content-between align-items-start align-items-md-center">
            <input
              type="text"
              className="form-control w-auto"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <button
              type="button"
              className="btn btn-dark"
              onClick={() => setCrearAbierto(true)}
            >
              Agregar producto
            </button>
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
        </div>

        <div className="hero-gap"></div>
      </div>

      <section className="album bg-body">
        <div className="body-productos-todo">
          <div className="container">
            <VendedorList productos={productosFiltrados} onVer={verProducto} />
          </div>
        </div>
      </section>

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

      {crearAbierto && (
        <InventarioForm
          visible={crearAbierto}
          categorias={categorias}
          proveedores={proveedores}
          editando={false}
          onClose={() => setCrearAbierto(false)}
          onAdd={handleAddProducto}
        />
      )}
    </main>
  );
}
