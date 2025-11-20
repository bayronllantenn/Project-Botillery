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
  const [tab, setTab] = useState("productos");

  const loadProductos = async () => {
    try {
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
      await api.post("/inventario/productos/eliminar/", {
        producto_id: id,
      });
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

  return (
    <main>
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
            <h2>Productos</h2>
            <div className="mb-4">
              <ProductosForm
                cats={categorias}
                provs={proveedores}
                onAdd={addProducto}
              />
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
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => editarProducto(p)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarProducto(p.id)}
                      >
                        Eliminar
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
  );
}
