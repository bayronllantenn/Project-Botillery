import axios from "axios";

export const unwrapError = (e) =>
  e?.response?.data || { error: e.message || "Error" };

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:8000/api",
});
