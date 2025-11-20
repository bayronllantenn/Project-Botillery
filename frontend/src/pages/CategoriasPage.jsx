import { useEffect, useState } from "react";
import api from "../services/api";
import CategoriaForm from "../components/CategoriaForm";
import CategoriaList from "../components/CategoriaList";
import "../pages/css/categoria.css";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(null);
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
      setEditando(null);
    } catch (error) {
      window.alert("No se pudo actualizar la categoría");
    }
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

  return (
    <main>
      <button type="button" className="btn-productos" onClick={load}>
        Actualizar lista
      </button>
      <button
        type="button"
        className="btn-productos"
        onClick={() => {
          setEditando(null);
          setMostrarForm(true);
        }}
      >
        Nueva categoría
      </button>

      <section className="py-4">
        <CategoriaList
          categorias={categorias}
          onEdit={(cat) => {
            setEditando(cat);
            setMostrarForm(true);
          }}
          onDelete={remove}
        />
      </section>

      {mostrarForm && (
        <div className="overlay-categorias">
          <div
            className="overlay-backdrop"
            onClick={() => {
              setMostrarForm(false);
              setEditando(null);
            }}
          />
          <div className="overlay-modal">
            <div className="overlay-modal-header">
              <h5>{editando ? "Editar categoría" : "Nueva categoría"}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setMostrarForm(false);
                  setEditando(null);
                }}
              />
            </div>
            <div className="overlay-modal-body">
              <CategoriaForm
                key={editando ? editando.id : "crear"}
                onAdd={async (data) => {
                  await add(data);
                  setMostrarForm(false);
                }}
                onEdit={async (id, data) => {
                  await update(id, data);
                  setMostrarForm(false);
                }}
                editando={editando}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
