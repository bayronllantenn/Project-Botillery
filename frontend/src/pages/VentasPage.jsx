import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/vendedor.css";

const fmt = new Intl.NumberFormat("es-CL");

export default function VentasPage() {
  const [resumen, setResumen] = useState(null);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargar() {
      try {
        const [resResumen, resLista] = await Promise.all([
          api.get("/ventas/resumen/"),
          api.get("/ventas/"),
        ]);
        setResumen(resResumen.data);
        setVentas(resLista.data);
      } catch (error) {
        setResumen(null);
        setVentas([]);
        alert("No se pudieron cargar las ventas");
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, []);

  if (loading) {
    return (
      <main className="ventas-page">
        <p className="text-center mt-4">Cargando ventas...</p>
      </main>
    );
  }

  return (
    <main className="ventas-page">
      <div className="hero-wrapper">
        <div className="hero-box">
          <h1>Ventas del día</h1>
          <p className="text-body-secondary">
            Revisa las ventas que has registrado hoy
          </p>

          {resumen && (
            <div className="seller-cards d-flex flex-column flex-md-row gap-3">
              <div className="seller-card">
                <div className="seller-card-head">
                  <span>Mis ventas hoy</span>
                </div>
                <div className="seller-card-body">
                  <span className="seller-number">{resumen.mis_ventas}</span>
                </div>
              </div>
              <div className="seller-card">
                <div className="seller-card-head">
                  <span>Total vendido hoy</span>
                </div>
                <div className="seller-card-body">
                  <span className="seller-number">
                    ${fmt.format(Number(resumen.total_vendido || 0))}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="hero-gap"></div>
      </div>

      <section className="album bg-body">
        <div className="body-productos-todo">
          <div className="container">
            {ventas.length === 0 ? (
              <p className="mt-3 text-center">
                Todavía no hay ventas registradas.
              </p>
            ) : (
              <div className="table-responsive mt-3">
                <table className="table table-sm align-middle">
                  <thead>
                    <tr>
                      <th>Hora</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ventas.map((v) => (
                      <tr key={v.id}>
                        <td>{v.hora}</td>
                        <td>{v.producto_nombre}</td>
                        <td>{v.cantidad}</td>
                        <td>${fmt.format(Number(v.total))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
