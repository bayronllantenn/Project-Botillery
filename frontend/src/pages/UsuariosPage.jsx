import { useEffect, useState } from "react";
import api from "../services/api";

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api.get("/usuarios/").then((res) => {
      setUsuarios(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>{u.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsuariosPage;
