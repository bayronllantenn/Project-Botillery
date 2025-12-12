import { useEffect, useState } from "react";
import GestionarUsuariosList from "../components/GestionarUsuariosList";
import GestionarUsuariosForm from "../components/GestionarUsuariosForm";
import api from "../services/api";
import "../styles/gestionusuarios.css";

export default function GestionarUsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const loadUsuarios = async () => {
    try {
      const res = await api.get("/");
      setUsuarios(res.data);
    } catch (error) {
      setUsuarios([]);
      alert("No se pudieron cargar los usuarios");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  const handleNuevo = () => {
    setUsuarioEditando(null);
    setMostrarForm(true);
  };

  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setMostrarForm(true);
  };

  const handleEliminar = async (usuario) => {
    const ok = window.confirm(
      `¿Seguro que deseas eliminar al usuario ${usuario.username}?`
    );
    if (!ok) return;
    try {
      await api.delete(`/${usuario.id}/`);
      await loadUsuarios();
    } catch (error) {
      console.error(error?.response?.data || error);
      alert("No se pudo eliminar el usuario");
    }
  };

  const handleGuardar = async (payload) => {
    try {
      if (usuarioEditando) {
        await api.put(`/${usuarioEditando.id}/`, payload);
      } else {
        await api.post("/register/", payload);
      }
      await loadUsuarios();
      setMostrarForm(false);
      setUsuarioEditando(null);
    } catch (error) {
      console.error(error?.response?.data || error);
      alert("No se pudo guardar el usuario");
    }
  };

  const handleBusquedaChange = (value) => {
    setBusqueda(value);
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    if (!busqueda.trim()) return true;
    const q = busqueda.toLowerCase();
    return (
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.nombre || "").toLowerCase().includes(q)
    );
  });

  if (cargando) {
    return <div className="text-center mt-4">Cargando...</div>;
  }

  return (
    <>
      <main>
        <div className="user-admin-shell">
          <header className="user-admin-hero">
            <h1 className="user-admin-title">Panel de Administracion</h1>
            <p className="user-admin-subtitle">
              Gestiona usuarios y permisos del sistema
            </p>
          </header>

          <section className="user-admin-body">
            <div className="user-admin-headrow">
              <h3>Usuarios</h3>
            </div>

            <GestionarUsuariosList
              usuarios={usuariosFiltrados}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
              onNuevo={handleNuevo}
              busqueda={busqueda}
              onBusquedaChange={handleBusquedaChange}
            />
          </section>
        </div>

        {mostrarForm && (
          <div
            className="user-modal-backdrop"
            onClick={() => setMostrarForm(false)}
          >
            <div className="user-modal" onClick={(e) => e.stopPropagation()}>
              <div className="user-modal-head">
                <button
                  type="button"
                  className="user-modal-close"
                  onClick={() => setMostrarForm(false)}
                  aria-label="Cerrar formulario"
                >
                  ×
                </button>
                <h3 className="mb-0">
                  {usuarioEditando ? "Editar usuario" : "Nuevo usuario"}
                </h3>
                <span className="user-modal-spacer"></span>
              </div>

              <GestionarUsuariosForm
                usuario={usuarioEditando}
                onSubmit={handleGuardar}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
