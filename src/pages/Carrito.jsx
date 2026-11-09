import { Link } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext.jsx';
import { cantidadCarrito, totalCarrito } from '../state/inventario.js';
import { moneda } from '../utils/formato.js';
import Encabezado from '../components/Encabezado.jsx';

export default function Carrito() {
  const { productos, carrito, agregarAlCarrito, quitarUnoDelCarrito, quitarTodosDelCarrito } = useInventario();
  const items = productos.filter((p) => (carrito[p.id] || 0) > 0);
  const unidades = cantidadCarrito(carrito);
  const total = totalCarrito(productos, carrito);

  return (
    <div>
      <Encabezado etiqueta="Compras" titulo="Carrito de compras" descripcion="Aumenta o disminuye las cantidades. El stock del inventario se actualiza al instante." />
      {items.length === 0 ? (
        <div className="tarjeta py-14 text-center"><span className="text-5xl" aria-hidden="true">🛒</span><h2 className="mt-4 text-xl font-bold">Tu carrito está vacío</h2><p className="mt-2 text-slate-500">Puedes elegir productos desde el inventario.</p><Link className="boton-principal mt-6" to="/inventario">Ver productos</Link></div>
      ) : (
        <div className="grid items-start gap-5 lg:grid-cols-[1fr_290px]">
          <div className="space-y-3">
            {items.map((producto) => {
              const cantidad = carrito[producto.id];
              return (
                <article className="tarjeta" key={producto.id}>
                  <div className="flex flex-wrap items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-3xl" aria-hidden="true">{producto.icono}</span>
                    <div className="min-w-0 flex-1">
                      <Link to={`/productos/${producto.id}`} className="font-bold text-slate-900 hover:text-marca-700 hover:underline">{producto.nombre}</Link>
                      <p className="mt-1 text-sm text-slate-500">{producto.marca} · {producto.tipo}</p>
                      <p className="mt-1 text-sm text-slate-500">Quedan {producto.stock} disponibles en inventario</p>
                    </div>
                    <p className="font-bold">{moneda(producto.precio * cantidad)}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-3" aria-label={`Cantidad de ${producto.nombre}`}>
                      <button type="button" aria-label={`Quitar una unidad de ${producto.nombre}`} className="boton-secundario h-10 w-10 !p-0 text-lg" onClick={() => quitarUnoDelCarrito(producto.id)}>−</button>
                      <span className="min-w-7 text-center font-bold" aria-live="polite">{cantidad}</span>
                      <button type="button" aria-label={`Agregar una unidad de ${producto.nombre}`} className="boton-secundario h-10 w-10 !p-0 text-lg" disabled={producto.stock <= 0} onClick={() => agregarAlCarrito(producto.id)}>+</button>
                    </div>
                    <button type="button" className="text-sm font-semibold text-red-700 hover:underline" onClick={() => quitarTodosDelCarrito(producto.id)}>Quitar producto</button>
                  </div>
                </article>
              );
            })}
          </div>
          <aside className="tarjeta lg:sticky lg:top-4">
            <h2 className="text-lg font-bold">Resumen</h2>
            <div className="mt-4 space-y-3 text-sm"><div className="flex justify-between gap-3"><span className="text-slate-600">Unidades</span><strong>{unidades}</strong></div><div className="flex justify-between gap-3"><span className="text-slate-600">Productos diferentes</span><strong>{items.length}</strong></div></div>
            <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-lg"><span className="font-bold">Total</span><strong className="text-marca-700">{moneda(total)}</strong></div>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">Esta es una demostración de frontend. No realiza pagos ni ventas reales.</p>
            <Link className="boton-secundario mt-5 w-full" to="/inventario">Seguir agregando</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
