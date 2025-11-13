import { useEffect, useState } from "react";
import api from "../services/api";
import ProveedorForm from "../components/ProveedorForm";
import ProveedorList from "../components/ProveedorList";

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState([]);

  const load = async () => {
    try {
      const data = await api.get("/inventario/proveedores/").then(r => r.data);
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

  useEffect(() => { load(); }, []);

  return (
    <div className="container">
      <h2>Proveedores</h2>
      <ProveedorForm onAdd={add} />
      <ProveedorList proveedores={proveedores} />
    </div>
  );
}
