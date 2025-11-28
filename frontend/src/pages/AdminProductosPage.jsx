import { useEffect, useState } from "react";
import api from "../services/api";
import InventarioPage from "./InventarioPage";
import CategoriasPage from "./CategoriasPage";
import ProveedoresPage from "./ProveedoresPage";
import ProductosForm from "../components/ProductosForm";

export default function AdminProductosPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  /* para las subpestañas de la pag la cual por defecto sera los productos*/
  const [tab, setTab] = useState("productos");
  const [mostrarForm, setMostrarForm] = useState(false);

  /* funcion para cargar los productos en 2do tiempo*/
  const loadProductos = async () => {
    try {
      /* espera que la api devuelta la respuesta*/
      const res = await api.get("/inventario/productos/");
      setProductos(res.data);
    } catch (error) {
      setProductos([]);
      alert("No se pudieron cargar los productos");
    }
  };

  const loadCategorias = async () => {
    try {
      const res = await api.get("/inventario/categorias/");
      setCategorias(res.data);
    } catch (error) {
      setCategorias([]);
    }
  };

  const loadProveedores = async () => {
    try {
      const res = await api.get("/inventario/proveedores/");
      setProveedores(res.data);
    } catch (error) {
      setProveedores([]);
    }
  };

  const addProducto = async ({
    categoria,
    proveedor,
    nombre,
    formato_venta,
    precio,
    stock,
    descripcion,
    codigo_barra,
  }) => {
    try {
      await api.post("/inventario/productos/", {
        categoria,
        proveedor,
        nombre,
        formato_venta,
        precio,
        stock,
        descripcion,
        codigo_barra,
      });
      await loadProductos();
      setMostrarForm(false);
    } catch (error) {
      window.alert("No se pudo crear el producto");
    }
  };

  const editarProducto = async (p) => {
    const nuevoPrecio = window.prompt("Nuevo precio:", p.precio);
    if (nuevoPrecio === null) return;
    const precioNumber = Number(nuevoPrecio);

    if (!Number.isFinite(precioNumber)) {
      alert("Precio deben ser numeros");
      return;
    }

    try {
      await api.put(`/inventario/productos/${p.id}/`, {
        precio: precioNumber,
      });
      await loadProductos();
    } catch (error) {
      alert("No se pudo actualizar el producto");
      console.error(error?.response?.data || error);
    }
  };

  const eliminarProducto = async (id) => {
    const ok = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!ok) return;

    try {
      await api.delete(`/inventario/productos/${id}/`);
      await loadProductos();
    } catch (error) {
      alert("No se pudo eliminar el producto");
      console.error(error?.response?.data || error);
    }
  };

  useEffect(() => {
    loadProductos();
    loadCategorias();
    loadProveedores();
  }, []);

  useEffect(() => {
    if (tab !== "productos") {
      setMostrarForm(false);
    }
  }, [tab]);

  const blurActivo = tab === "productos" && mostrarForm;

  return (
    <>
      <main className={blurActivo ? "admin-blur" : ""}>
        <section className="py-4">
          <h1>Panel de Administracion</h1>
          <p className="text-body-secondary">
            Gestiona productos, ventas e inventario
          </p>

          <div className="admin-tabs">
            <button
              type="button"
              className={`admin-tab ${tab === "productos" ? "active" : ""}`}
              onClick={() => setTab("productos")}
            >
              Productos
            </button>
            <button
              type="button"
              className={`admin-tab ${tab === "inventario" ? "active" : ""}`}
              onClick={() => setTab("inventario")}
            >
              Inventario
            </button>
            <button
              type="button"
              className={`admin-tab ${tab === "categorias" ? "active" : ""}`}
              onClick={() => setTab("categorias")}
            >
              Categorias
            </button>
            <button
              type="button"
              className={`admin-tab ${tab === "proveedores" ? "active" : ""}`}
              onClick={() => setTab("proveedores")}
            >
              Proveedores
            </button>
          </div>

          {tab === "productos" && (
            <section className="py-3">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <h3 className="mb-0">Productos</h3>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => setMostrarForm(true)}
                >
                  Agregar producto
                </button>
              </div>

              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Código de barras</th>
                    <th>Nombre</th>
                    <th>Formato</th>
                    <th>Categoría</th>
                    <th>Precio Venta</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.codigo_barra}</td>
                      <td>{p.nombre}</td>
                      <td>{p.formato_venta}</td>
                      <td>{p.categoria_detalle.nombre}</td>
                      <td>{p.precio}</td>
                      <td>
                      <button
                        type="button"
                        className="btn-actions me-2"
                        onClick={() => editarProducto(p)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="btn-actions"
                        onClick={() => eliminarProducto(p.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </section>
          )}

          {tab === "inventario" && <InventarioPage />}
          {tab === "categorias" && <CategoriasPage />}
          {tab === "proveedores" && <ProveedoresPage />}
        </section>
      </main>

      {tab === "productos" && mostrarForm && (
        <div
          className="product-modal-backdrop"
          onClick={() => setMostrarForm(false)}
        >
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <div className="product-modal-head">
              <h3 className="mb-0">Agregar producto</h3>
              <button
                type="button"
                className="product-modal-close"
                onClick={() => setMostrarForm(false)}
                aria-label="Cerrar formulario"
              >
                ×
              </button>
            </div>
            <ProductosForm
              cats={categorias}
              provs={proveedores}
              onAdd={addProducto}
            />
          </div>
        </div>
      )}
    </>
  );
}
