import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GestionarUsuariosList from "../components/GestionarUsuariosList";
import api from "../services/api";

export default function GestionarUsuariosPage() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const loadUsuarios = async () => {
    try {
      /* espera que la api devuelta la respuesta*/
      const res = await api.get("/usuarios/");
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

  const handleEditar = (usuario) => {
    alert("Editar " + usuario.username);
  };

  const handleEliminar = (usuario) => {
    alert("Eliminar " + usuario.username);
  };

  if (cargando) {
    return <div>Cargando...</div>;
  }
  return (
    <div>
      <h2>Gestion de Usuarios</h2>
      <GestionarUsuariosList
        usuarios={usuarios}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
    </div>
  );
}
