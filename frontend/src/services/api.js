import axios from "axios";

const baseURL =
  process.env.REACT_APP_API_BASE || "http://localhost:8000/api";

export const api = axios.create({ baseURL });

export const get = (url, config) => api.get(url, config).then(r => r.data);
export const post = (url, data, config) => api.post(url, data, config).then(r => r.data);
export const put = (url, data, config) => api.put(url, data, config).then(r => r.data);
export const del = (url, config) => api.delete(url, config).then(r => r.data);

export const unwrapError = (e) => e?.response?.data || { error: e.message || "Error" };

export const paths = {
  cats: "/inventario/categorias/",
  provs: "/inventario/proveedores/",
  prods: "/inventario/productos/",
  ajust: "/inventario/productos/ajustar_stock/",
  ventas: "/ventas/",
  ventasCrear: "/ventas/crear/",
};
