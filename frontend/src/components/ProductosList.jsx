export default function ProductosList({ productos = [] }) {
return (
<div className="table-responsive">
<table className="table table-sm table-striped align-middle mb-0">
<thead className="table-light">
<tr>
<th>ID</th>
<th>Nombre</th>
<th>Categoría</th>
<th>Proveedor</th>
<th>Precio</th>
<th>Stock</th>
</tr>
</thead>
<tbody>
{productos.map(p => (
<tr key={p.id}>
<td>{p.id}</td>
<td>{p.nombre}</td>
<td>{p.categoria_detalle?.nombre || p.categoria}</td>
<td>{p.proveedor_detalle?.nombre || p.proveedor || ""}</td>
<td>{p.precio}</td>
<td>{p.stock}</td>
</tr>
))}
</tbody>
</table>
</div>
);
}