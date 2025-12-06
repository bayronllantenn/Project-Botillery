import "../styles/gestionusuarios.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function GestionarUsuariosPage() {
const navigate = useNavigate();
const [usuarios, setUsuarios] = useState([]);

const loadUsuarios = async () => {
    try {
      /* espera que la api devuelta la respuesta*/
      const res = await api.get("/usuarios/");
      setUsuarios(res.data);
    } catch (error) {
      setUsuarios([]);
      alert("No se pudieron cargar los usuarios");
    }
  };

useEffect(() => {
    loadUsuarios();
  }, []);

    return (
    <div className="gestion-usuarios-page">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>

                {usuarios.map((u) => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.username}</td>
                        <td>{u.rol}</td>
                        <td>{u.correo}</td>
                        <td>
                            <button onClick={() => alert('Editar ' + u.username)}>Editar</button>
                            <button onClick={() => alert('Eliminar ' + u.username)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
); }
