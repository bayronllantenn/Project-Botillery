import { useEffect, useState } from "react";
import api from "../services/api";
import CategoriaForm from "../components/CategoriaForm";
import CategoriaList from "../components/CategoriaList";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);

  const load = async () => {
    try {
      const response = await api.get("/inventario/categorias/");
      setCategorias(response.data);
    } catch (error) {
      setCategorias([]);
      alert("No se pudieron cargar las categorías");
    }
  };

  const add = async ({ nombre, descripcion }) => {
    try {
      await api.post("/inventario/categorias/", { nombre, descripcion });
      await load();
    } catch (e) {
      alert("No se pudo crear la categoría");
    }
  };     

  useEffect(() => { load(); }, []);

  return (
    <div className="container">
      <h2>Categorías</h2> 
      <CategoriaForm onAdd={add} />
      <CategoriaList categorias={categorias} />
    </div>
  );
}
