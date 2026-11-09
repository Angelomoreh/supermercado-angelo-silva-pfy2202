import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIAS } from '../data/productosIniciales.js';
import { useInventario } from '../context/InventarioContext.jsx';
import { filtrarProductos } from '../state/inventario.js';
import { moneda } from '../utils/formato.js';
import Encabezado from '../components/Encabezado.jsx';
import ProductoCard from '../components/ProductoCard.jsx';

export default function Inventario() {
  const { productos } = useInventario();
  const [categoria, setCategoria] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const visibles = useMemo(() => filtrarProductos(productos, categoria, busqueda), [productos, categoria, busqueda]);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <Encabezado etiqueta="Listado" titulo="Inventario de productos" descripcion="Revisa las existencias del supermercado y filtra según la categoría." />
        <Link to="/productos/nuevo" className="boton-principal">+ Agregar producto</Link>
      </div>

      <section className="tarjeta mb-5 grid gap-4 sm:grid-cols-2" aria-label="Filtros de productos">
        <div><label className="etiqueta" htmlFor="filtro-categoria">Categoría</label><select id="filtro-categoria" className="campo" value={categoria} onChange={(e) => setCategoria(e.target.value)}><option value="Todas">Todas las categorías</option>{CATEGORIAS.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
        <div><label className="etiqueta" htmlFor="busqueda">Buscar producto</label><input id="busqueda" className="campo" placeholder="Nombre, marca o tipo..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} /></div>
      </section>
      <div className="mb-4 flex items-center justify-between gap-3"><p className="text-sm text-slate-600">Mostrando <strong>{visibles.length}</strong> de {productos.length} productos</p>{(categoria !== 'Todas' || busqueda) && <button type="button" className="text-sm font-semibold text-marca-700 hover:underline" onClick={() => { setCategoria('Todas'); setBusqueda(''); }}>Limpiar filtros</button>}</div>

      {visibles.length === 0 ? (
        <div className="tarjeta py-12 text-center"><p className="text-3xl">🔍</p><h2 className="mt-3 text-lg font-bold">No encontramos productos</h2><p className="mt-1 text-sm text-slate-500">Prueba con otra categoría o palabra.</p></div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 md:hidden">{visibles.map((producto) => <ProductoCard key={producto.id} producto={producto} />)}</div>
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-suave md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600"><tr><th scope="col" className="px-5 py-4">Producto</th><th scope="col" className="px-4 py-4">Marca</th><th scope="col" className="px-4 py-4">Tipo</th><th scope="col" className="px-4 py-4">Categoría</th><th scope="col" className="px-4 py-4">Precio</th><th scope="col" className="px-4 py-4">Stock</th><th scope="col" className="px-4 py-4">Detalle</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {visibles.map((p) => <tr key={p.id} className="hover:bg-slate-50"><td className="px-5 py-4"><span className="mr-2 text-lg" aria-hidden="true">{p.icono}</span><span className="font-semibold text-slate-900">{p.nombre}</span></td><td className="px-4 py-4">{p.marca}</td><td className="px-4 py-4">{p.tipo}</td><td className="px-4 py-4"><span className="pastilla">{p.categoria}</span></td><td className="whitespace-nowrap px-4 py-4">{moneda(p.precio)}</td><td className={`px-4 py-4 font-bold ${p.stock === 0 ? 'text-red-700' : 'text-slate-800'}`}>{p.stock}</td><td className="px-4 py-4"><Link className="font-semibold text-marca-700 hover:underline" to={`/productos/${p.id}`}>Ver detalle</Link></td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
