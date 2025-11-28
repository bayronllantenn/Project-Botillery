import { useEffect, useState } from "react";
import api from "../services/api";
import CategoriaForm from "../components/CategoriaForm";
import CategoriaList from "../components/CategoriaList";
import "../pages/css/categoria.css";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);

  const load = async () => {
    try {
      const response = await api.get("/inventario/categorias/");
      setCategorias(response.data);
    } catch (error) {
      window.alert("No se pudieron cargar las categorías");
    }
  };

  const add = async ({ nombre, descripcion }) => {
    try {
      await api.post("/inventario/categorias/", { nombre, descripcion });
      await load();
    } catch (error) {
      window.alert("No se pudo crear la categoría");
    }
  };

  const update = async (id, { nombre, descripcion }) => {
    try {
      await api.put(`/inventario/categorias/${id}/`, {
        nombre,
        descripcion,
      });
      await load();
    } catch (error) {
      window.alert("No se pudo actualizar la categoría");
    }
  };

  const editarCategoria = async (cat) => {
    if (!cat) return;

    const nuevoNombre = window.prompt("Nuevo nombre:", cat.nombre || "");
    if (nuevoNombre === null) return;
    const nombre = nuevoNombre.trim();
    if (!nombre) {
      window.alert("Debes ingresar un nombre");
      return;
    }

    const nuevaDescripcion = window.prompt(
      "Nueva descripcion:",
      cat.descripcion || ""
    );
    if (nuevaDescripcion === null) return;
    const descripcion = nuevaDescripcion.trim();

    await update(cat.id, { nombre, descripcion });
  };

  const remove = async (id) => {
    const ok = window.confirm("¿Seguro que deseas eliminar esta categoría?");
    if (!ok) return;

    try {
      await api.delete(`/inventario/categorias/${id}/`);
      await load();
    } catch (error) {
      window.alert("No se pudo eliminar la categoría");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const blurActivo = mostrarForm;

  return (
    <>
      <main className={blurActivo ? "admin-blur" : ""}>
        <section className="py-3">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <h3 className="mb-0">Categorías</h3>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                setMostrarForm(true);
              }}
            >
              Nueva categoría
            </button>
          </div>

          <CategoriaList
            categorias={categorias}
            onEdit={editarCategoria}
            onDelete={remove}
          />
        </section>
      </main>

      {mostrarForm && (
        <div
          className="product-modal-backdrop"
          onClick={() => {
            setMostrarForm(false);
          }}
        >
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <div className="product-modal-head">
              <button
                type="button"
                className="product-modal-close"
                onClick={() => {
                  setMostrarForm(false);
                }}
                aria-label="Cerrar formulario"
              >
                ×
              </button>
            </div>
            <CategoriaForm
              onAdd={async (data) => {
                await add(data);
                setMostrarForm(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
