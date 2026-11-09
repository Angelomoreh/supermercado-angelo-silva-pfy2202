import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext.jsx';
import { moneda } from '../utils/formato.js';
import Encabezado from '../components/Encabezado.jsx';

export default function DetalleProducto() {
  const { id } = useParams();
  const { productos, carrito, agregarAlCarrito } = useInventario();
  const [mensaje, setMensaje] = useState('');
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return <div className="tarjeta"><h1 className="text-xl font-bold">Producto no encontrado</h1><p className="my-3 text-slate-600">Puede que el producto ya no exista en el inventario.</p><Link className="boton-principal" to="/inventario">Volver al inventario</Link></div>;
  }

  const agregar = () => {
    if (producto.stock <= 0) return;
    agregarAlCarrito(producto.id);
    setMensaje('Se agregó una unidad al carrito y se descontó del inventario.');
  };

  return (
    <div>
      <Link className="mb-5 inline-block text-sm font-semibold text-marca-700 hover:underline" to="/inventario">← Volver al inventario</Link>
      <Encabezado etiqueta="Detalle del artículo" titulo={producto.nombre} descripcion="Consulta la información del producto y agrégalo al carrito si hay unidades disponibles." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex min-h-72 items-center justify-center rounded-3xl border border-slate-200 bg-gradient-to-br from-teal-50 to-slate-100"><span className="text-9xl" role="img" aria-label={`Ilustración de ${producto.nombre}`}>{producto.icono}</span></div>
        <div className="tarjeta">
          <span className="pastilla">{producto.categoria}</span>
          <p className="mt-4 text-3xl font-bold text-slate-900">{moneda(producto.precio)}</p>
          <div className="mt-5 grid grid-cols-2 gap-4 border-y border-slate-100 py-5 text-sm">
            <div><p className="text-slate-500">Marca</p><p className="mt-1 font-semibold">{producto.marca}</p></div>
            <div><p className="text-slate-500">Tipo / presentación</p><p className="mt-1 font-semibold">{producto.tipo}</p></div>
            <div><p className="text-slate-500">Disponibles</p><p className={`mt-1 font-bold ${producto.stock === 0 ? 'text-red-700' : 'text-marca-700'}`}>{producto.stock} unidad(es)</p></div>
            <div><p className="text-slate-500">Ya en tu carrito</p><p className="mt-1 font-semibold">{carrito[producto.id] || 0} unidad(es)</p></div>
          </div>
          <h2 className="mt-5 font-bold">Descripción</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{producto.descripcion}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="boton-principal" type="button" onClick={agregar} disabled={producto.stock <= 0}>{producto.stock > 0 ? '+ Agregar una unidad al carrito' : 'Sin stock disponible'}</button>
            <Link to="/carrito" className="boton-secundario">Ir al carrito</Link>
          </div>
          {mensaje && <p role="status" className="mt-4 rounded-lg bg-teal-50 px-4 py-3 text-sm font-medium text-marca-800">{mensaje}</p>}
        </div>
      </div>
    </div>
  );
}
