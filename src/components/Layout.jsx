import { NavLink, Outlet, Link } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext.jsx';
import { cantidadCarrito } from '../state/inventario.js';

const enlaces = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/inventario', label: 'Inventario' },
  { to: '/productos/nuevo', label: 'Agregar producto' },
  { to: '/carrito', label: 'Carrito' },
];

export default function Layout() {
  const { carrito } = useInventario();
  const cantidad = cantidadCarrito(carrito);
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3 text-slate-900 no-underline">
            <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-marca-700 text-2xl">🛍️</span>
            <span className="leading-tight"><strong className="block text-lg">Supermercado</strong><span className="text-xs text-slate-500">Gestión de inventario</span></span>
          </Link>
          <span className="rounded-full bg-marca-50 px-3 py-1 text-xs font-semibold text-marca-800">Frontend II · Semana 3</span>
        </div>
        <nav aria-label="Navegación principal" className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6">
          {enlaces.map((enlace) => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              end={enlace.end}
              className={({ isActive }) => `shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-marca-700 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              {enlace.label}{enlace.to === '/carrito' && cantidad > 0 ? ` (${cantidad})` : ''}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-7 sm:px-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:px-6">
          <p>Supermercado de ejemplo · Desarrollo Frontend II</p>
          <nav aria-label="Menú inferior" className="flex gap-5">
            <Link to="/nosotros" className="hover:text-marca-700">Quiénes somos</Link>
            <Link to="/contacto" className="hover:text-marca-700">Contáctanos</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
