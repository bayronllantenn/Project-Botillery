import { useEffect, useState } from "react";
import api from "../services/api";

const fmt = new Intl.NumberFormat("es-CL");

export default function InventarioPage() {
  const [productos, setProductos] = useState([]);
  const [ajuste, setAjuste] = useState({ producto_id: "", cantidad: "" });

  const load = async () => {
    try {
      const data = await api.get("/inventario/productos/").then(r => r.data);
      setProductos(Array.isArray(data) ? data : []);
    } catch (e) {
      setProductos([]);
    }
  };

  const ajustar = async () => {
    const pid = parseInt(ajuste.producto_id, 10);
    const cant = parseInt(ajuste.cantidad, 10);
    if (!pid || !Number.isInteger(cant) || cant === 0) {
      alert("Selecciona producto y una cantidad distinta de 0");
      return;
    }
    try {
      await api.post("/inventario/productos/ajustar_stock/", { producto_id: pid, cantidad: cant });
      setAjuste({ producto_id: "", cantidad: "" });
      await load();
    } catch (e) {
      const msg = (e?.response?.data && JSON.stringify(e.response.data)) || e.message;
      alert("Error: " + msg);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Inventario</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <select value={ajuste.producto_id} onChange={e=>setAjuste({ ...ajuste, producto_id: e.target.value })}>
          <option value="">Producto</option>
          {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
        </select>
        <input type="number" placeholder="Cantidad (+/-)" value={ajuste.cantidad} onChange={e=>setAjuste({ ...ajuste, cantidad: e.target.value })} />
        <button onClick={ajustar}>Ajustar stock</button>
      </div>

      <table border="1" cellPadding="6">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Proveedor</th><th>Precio</th><th>Stock</th></tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria_detalle?.nombre || p.categoria}</td>
              <td>{p.proveedor_detalle?.nombre || p.proveedor || ""}</td>
              <td>{fmt.format(p.precio)}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

