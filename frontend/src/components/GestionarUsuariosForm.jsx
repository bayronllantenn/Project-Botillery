import { useEffect, useState } from "react";

export default function GestionarUsuariosForm({ usuario, onSubmit }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    nombre: "",
    password: "",
    rol: "",
  });

  useEffect(() => {
    if (usuario) {
      setForm({
        username: usuario.username || "",
        email: usuario.email || "",
        nombre: usuario.nombre || "",
        password: "",
        rol: usuario.rol || "",
      });
    } else {
      setForm({
        username: "",
        email: "",
        nombre: "",
        password: "",
        rol: "",
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username.trim()) return alert("Ingresa un nombre de usuario");
    if (!form.email.trim() || !form.email.includes("@"))
      return alert("Ingresa un correo válido");
    if (!form.nombre.trim()) return alert("Ingresa el nombre del usuario");
    if (!usuario) {
      if (!form.password.trim() || form.password.length < 4)
        return alert("La contraseña debe tener al menos 4 caracteres");
    }
    if (!form.rol) return alert("Selecciona un rol");

    const payload = {
      username: form.username.trim(),
      email: form.email.trim(),
      nombre: form.nombre.trim(),
      rol: form.rol,
    };

    if (!usuario) {
      payload.password = form.password;
    }

    onSubmit(payload);
  };

  return (
    <form className="gestion-usuarios-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          name="username"
          className="form-control"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <input
          name="email"
          type="email"
          className="form-control"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <input
          name="nombre"
          className="form-control"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
        />
      </div>

      {!usuario && (
        <div className="mb-3">
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="mb-3">
        <select
          name="rol"
          className="form-select"
          value={form.rol}
          onChange={handleChange}
        >
          <option value="">Selecciona un rol</option>
          <option value="admin">Admin</option>
          <option value="cajero">Cajero</option>
          <option value="vendedor">Vendedor</option>
        </select>
      </div>

      <button type="submit" className="btn btn-dark w-100">
        {usuario ? "Guardar cambios" : "Guardar"}
      </button>
    </form>
  );
}
