import { useEffect, useState } from "react";
import api from "../services/api";
import ProveedorForm from "../components/ProveedorForm";
import ProveedorList from "../components/ProveedorList";
import "../styles/proveedor.css";

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);

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

  const editar = async (prov) => {
    if (!prov) return;

    const telInput = window.prompt(
      "Telefono de 8 digitos:",
      prov.telefono || ""
    );
    if (telInput === null) return;
    const telefono = telInput.trim();
    if (!telefono || telefono.length !== 8 || Number.isNaN(Number(telefono))) {
      alert("Ingresa 8 numeros para el telefono");
      return;
    }

    const correoInput = window.prompt("Correo:", prov.correo || "");
    if (correoInput === null) return;
    const correo = correoInput.trim();
    if (correo && !correo.includes("@")) {
      alert("Correo no valido");
      return;
    }

    try {
      await api.put(`/inventario/proveedores/${prov.id}/`, {
        telefono,
        correo,
      });
      await load();
    } catch {
      alert("No se pudo actualizar el proveedor");
    }
  };

  const eliminar = async (id) => {
    const ok = window.confirm("¿Seguro que deseas eliminar este proveedor?");
    if (!ok) return;

    try {
      await api.delete(`/inventario/proveedores/${id}/`);
      await load();
    } catch (error) {
      window.alert("No se pudo eliminar el proveedor");
      console.error(error?.response?.data || error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <main className={mostrarForm ? "admin-blur" : ""}>
        <section className="py-3">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
            <h3 className="mb-0">Proveedores</h3>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => setMostrarForm(true)}
            >
              Nuevo proveedor
            </button>
          </div>

          <div className="categoria-card">
            <ProveedorList
              proveedores={proveedores}
              onEdit={editar}
              onDelete={eliminar}
            />
          </div>
        </section>
      </main>

      {mostrarForm && (
        <div
          className="product-modal-backdrop"
          onClick={() => setMostrarForm(false)}
        >
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <div className="product-modal-head">
              <button
                type="button"
                className="product-modal-close"
                onClick={() => setMostrarForm(false)}
                aria-label="Cerrar formulario"
              >
                ×
              </button>
              <h3 className="mb-0">Nuevo proveedor</h3>
              <span className="product-modal-spacer"></span>
            </div>
            <ProveedorForm
              onAdd={async (payload) => {
                await add(payload);
                setMostrarForm(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
