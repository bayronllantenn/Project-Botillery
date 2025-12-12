import { useEffect, useState } from "react";
import api from "../services/api";
import CategoriasPage from "./CategoriasPage";
import ProveedoresPage from "./ProveedoresPage";
import InventarioForm from "../components/InventarioForm";
import InventarioList from "../components/InventarioList";
import "../styles/inventario.css";

export default function InventarioPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [tab, setTab] = useState("productos");
  const [mostrarForm, setMostrarForm] = useState(false);

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
    stock_minimo,
    costo,
    descripcion,
    codigo_barra,
    imagen,
  }) => {
    try {
      const formData = new FormData();
      formData.append("categoria", categoria);
      if (proveedor) {
        formData.append("proveedor", proveedor);
      }
      formData.append("nombre", nombre);
      formData.append("formato_venta", formato_venta);
      formData.append("precio", precio);
      formData.append("stock", stock ?? 0);
      formData.append("stock_minimo", stock_minimo ?? 0);
      formData.append("costo", costo ?? 0);
      formData.append("descripcion", descripcion || "");
      formData.append("codigo_barra", codigo_barra || "");
      if (imagen) {
        formData.append("imagen", imagen);
      }

      await api.post("/inventario/productos/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
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

  const ajustar = async (producto) => {
    if (!producto) {
      alert("Selecciona un producto");
      return;
    }

    const nuevoStock = window.prompt(
      "Nuevo stock:",
      Number(producto.stock ?? 0)
    );
    if (nuevoStock === null) return;

    const stockValidar = Number(nuevoStock);
    if (!Number.isInteger(stockValidar) || stockValidar < 0) {
      alert("Selecciona un stock valido (0 o mas)");
      return;
    }

    const diferencia = stockValidar - Number(producto.stock ?? 0);
    try {
      await api.post("inventario/productos/ajustar_stock/", {
        producto_id: producto.id,
        cantidad: diferencia,
      });
      await loadProductos();
    } catch (e) {
      const msg =
        (e?.reponse?.data && JSON.stringify(e.response.data)) || e.message;
      alert("Error: " + msg);
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
    <div className="container">
      <main className={blurActivo ? "admin-blur" : ""}>
        <div className="hero">
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
        </div>

        <section className="py-2">
          {tab === "productos" && (
            <>
              <div className="productos-header">
                <h3>Productos</h3>
                <button
                  type="button"
                  className="btn btn-dark botonaso"
                  onClick={() => setMostrarForm(true)}
                >
                  Agregar producto
                </button>
              </div>

              <div className="mt-3">
                <InventarioList
                  productos={productos}
                  onEditar={editarProducto}
                  onEliminar={eliminarProducto}
                  onAjustar={ajustar}
                />
              </div>
            </>
          )}

          {tab === "categorias" && <CategoriasPage />}
          {tab === "proveedores" && <ProveedoresPage />}
        </section>
      </main>

      <InventarioForm
        visible={tab === "productos" && mostrarForm}
        categorias={categorias}
        proveedores={proveedores}
        onAdd={addProducto}
        onClose={() => setMostrarForm(false)}
      />
    </div>
  );
}
