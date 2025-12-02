import ProductosForm from "./ProductosForm";

export default function AdminInventarioForm({
  visible,
  categorias = [],
  proveedores = [],
  onAdd,
  onClose,
}) {
  if (!visible) return null;

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div className="product-modal-backdrop" onClick={handleClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <div className="product-modal-head">
          <h3 className="mb-0">Agregar producto</h3>
          <button
            type="button"
            className="product-modal-close"
            onClick={handleClose}
            aria-label="Cerrar formulario"
          >
          </button>
        </div>

        <ProductosForm
          cats={categorias}
          provs={proveedores}
          onAdd={onAdd}
        />
      </div>
    </div>
  );
}
