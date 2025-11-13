import { useEffect, useState } from "react";
import api from "../services/api";
import ProductosForm from "../components/ProductosForm";
import ProductosList from "../components/ProductosList";

export default function ProductosPage() {
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);

  const loadAll = async () => {
    try {
      const catsRes = await api.get("/inventario/categorias/");
      setCategorias(catsRes.data);

      const provsRes = await api.get("/inventario/proveedores/");
      setProveedores(provsRes.data);

      const prodsRes = await api.get("/inventario/productos/");
      setProductos(prodsRes.data);
    } catch (error) {
      setCategorias([]);
      setProveedores([]);
      setProductos([]);
      alert("No se pudieron cargar los datos");
    }
  };

  const addProducto = async (payload) => {
    try {
      await api.post("/inventario/productos/", payload);
      await loadAll();
    } catch (error) {
      alert("Error creando producto");
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Productos</h2>

      <div className="row g-4">
        
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header">Nuevo Producto</div>
            <div className="card-body">
              <ProductosForm
                cats={categorias}
                provs={proveedores}
                onAdd={addProducto}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header">Listado de Productos</div>
            <div className="card-body p-0">
              <ProductosList productos={productos} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
