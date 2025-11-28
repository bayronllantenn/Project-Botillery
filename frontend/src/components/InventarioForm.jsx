const InventarioForm = ({ productos, ajuste, onChange, onSubmit }) => {
  return (
    <div className="inventario-form-row">
      <select
        value={ajuste.producto_id}
        onChange={(e) => onChange({ ...ajuste, producto_id: e.target.value })}
      >
        <option value="">Seleccione Producto</option>
        {productos.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre} - {p.formato_venta || "Unidad"}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Stock final"
        value={ajuste.cantidad}
        onChange={(e) => onChange({ ...ajuste, cantidad: e.target.value })}
      />
      <button className="btn-actions" type="button" onClick={onSubmit}>
        Ajustar stock
      </button>
    </div>
  );
};

export default InventarioForm;
