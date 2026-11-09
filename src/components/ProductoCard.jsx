import { Link } from 'react-router-dom';
import { moneda } from '../utils/formato.js';

export default function ProductoCard({ producto }) {
  return (
    <article className="tarjeta flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-3xl">{producto.icono}</span>
        <div className="min-w-0">
          <h3 className="font-bold text-slate-900">{producto.nombre}</h3>
          <p className="text-sm text-slate-500">{producto.marca} · {producto.tipo}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="pastilla">{producto.categoria}</span>
        <span className="text-sm font-bold">{moneda(producto.precio)}</span>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <span className={producto.stock > 0 ? 'text-sm text-slate-600' : 'text-sm font-semibold text-red-700'}>Disponibles: {producto.stock}</span>
        <Link to={`/productos/${producto.id}`} className="text-sm font-bold text-marca-700 hover:underline">Ver detalle →</Link>
      </div>
    </article>
  );
}
