import { Link } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext.jsx';
import { cantidadCarrito, unidadesDisponibles } from '../state/inventario.js';
import Encabezado from '../components/Encabezado.jsx';
import ProductoCard from '../components/ProductoCard.jsx';

export default function Inicio() {
  const { productos, carrito, reiniciar } = useInventario();
  const destacados = productos.slice(0, 3);
  const reiniciarDemo = () => {
    if (window.confirm('¿Restablecer los productos y vaciar el carrito? Esta acción eliminará los cambios guardados.')) reiniciar();
  };

  return (
    <div>
      <Encabezado etiqueta="Bienvenido" titulo="Mi supermercado" descripcion="Una aplicación sencilla para administrar productos, revisar el inventario y preparar un carrito de compras." />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="tarjeta"><p className="text-sm text-slate-500">Productos diferentes</p><p className="mt-2 text-3xl font-bold text-slate-900">{productos.length}</p></div>
        <div className="tarjeta"><p className="text-sm text-slate-500">Unidades disponibles</p><p className="mt-2 text-3xl font-bold text-slate-900">{unidadesDisponibles(productos)}</p></div>
        <div className="tarjeta"><p className="text-sm text-slate-500">Unidades en carrito</p><p className="mt-2 text-3xl font-bold text-slate-900">{cantidadCarrito(carrito)}</p></div>
      </div>

      <section className="mt-7 rounded-3xl bg-marca-700 px-6 py-8 text-white sm:px-8 sm:py-10">
        <h2 className="text-2xl font-bold">Todo organizado en un solo lugar</h2>
        <p className="mt-2 max-w-2xl text-sm text-teal-50 sm:text-base">Puedes ingresar nuevos artículos, filtrar por categoría y agregarlos al carrito. El inventario cambia automáticamente cuando modificas las cantidades.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/inventario" className="boton bg-white text-marca-800 hover:bg-teal-50">Ver inventario</Link>
          <Link to="/productos/nuevo" className="boton border border-white/50 bg-white/10 text-white hover:bg-white/20">Agregar artículo</Link>
        </div>
      </section>

      <section className="mt-9">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2"><h2 className="text-xl font-bold text-slate-900">Algunos productos</h2><Link to="/inventario" className="text-sm font-semibold text-marca-700 hover:underline">Ver todos →</Link></div>
        <div className="grid gap-4 md:grid-cols-3">{destacados.map((producto) => <ProductoCard key={producto.id} producto={producto} />)}</div>
      </section>

      <div className="mt-8 border-t border-slate-200 pt-5 text-sm text-slate-500">
        ¿Quieres volver a los productos de ejemplo?{' '}
        <button type="button" onClick={reiniciarDemo} className="font-semibold text-marca-700 underline underline-offset-2 hover:text-marca-800">Restablecer datos de prueba</button>.
      </div>
    </div>
  );
}
