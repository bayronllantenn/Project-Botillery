import axios from "axios";
/* esta linea define la funcion unwrap error que extrae y estandariza el mensaje de error de una respuesta fallida de la red 
busca primero los detalles del error en e.response data y si no se encuentra usa el mensaje de error de la libreria en este caso 
e.message o simplemente devuelve como ultimo recurso el error como texto plano */
export const unwrapError = (e) =>
  e?.response?.data || { error: e.message || "Error" };

/* esta funcion crea y exporta una instancia configurada de axios su objetivo principal es establecer la url base para todas las
peticiones tomanto esta direccion de la variable REACT APP .... si no existe usa la URL de texto plano */

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:8000/api/",
});
