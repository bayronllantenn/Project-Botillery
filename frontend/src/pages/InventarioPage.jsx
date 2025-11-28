import { useEffect, useState } from "react";
import api from "../services/api";
import InventarioForm from "../components/InventarioForm";
import InventarioList from "../components/InventarioList";
import "../styles/inventario.css";

export default function InventarioPage() {
  const [productos, setProductos] = useState([]);
  const [ajuste, setAjuste] = useState({ producto_id: "", cantidad: "" });

  const load = async () => {
    try {
      const data = await api.get("/inventario/productos/").then((r) => r.data);
      setProductos(Array.isArray(data) ? data : []);
    } catch (e) {
      setProductos([]);
    }
  };

  const ajustar = async () => {
    const pid = parseInt(ajuste.producto_id, 10);
    const target = parseInt(ajuste.cantidad, 10);
    if (!pid || !Number.isInteger(target) || target < 0) {
      alert("Selecciona producto y un stock válido (0 o más)");
      return;
    }
    const prod = productos.find((p) => p.id === pid);
    const current = prod ? parseInt(prod.stock, 10) || 0 : 0;
    const delta = target - current;
    try {
      await api.post("/inventario/productos/ajustar_stock/", {
        producto_id: pid,
        cantidad: delta,
      });
      setAjuste({ producto_id: "", cantidad: "" });
      await load();
    } catch (e) {
      const msg =
        (e?.response?.data && JSON.stringify(e.response.data)) || e.message;
      alert("Error: " + msg);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="py-4">
      <div style={{ padding: 16 }}>
        <h3>Inventario</h3>
        <InventarioForm
          productos={productos}
          ajuste={ajuste}
          onChange={setAjuste}
          onSubmit={ajustar}
        />
        <InventarioList productos={productos} />
      </div>
    </section>
  );
}
