import { useEffect, useState } from "react";
import api from "../services/api";
import ProveedorForm from "../components/ProveedorForm";
import ProveedorList from "../components/ProveedorList";
import "./css/categoria.css";

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState([]);

  const load = async () => {
    try {
      const data = await api
        .get("/inventario/proveedores/")
        .then((r) => r.data);
      setProveedores(Array.isArray(data) ? data : []);
    } catch {
      setProveedores([]);
    }
  };

  const add = async (payload) => {
    try {
      await api.post("/inventario/proveedores/", payload);
      await load();
    } catch {
      alert("No se pudo crear el proveedor");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="proveedor-wrapper">
      <div className="proveedor-actions">
        <ProveedorForm onAdd={add} />
      </div>
      <ProveedorList proveedores={proveedores} />
    </div>
  );
}
