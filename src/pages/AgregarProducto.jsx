import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext.jsx';
import { CATEGORIAS } from '../data/productosIniciales.js';
import { iconoCategoria } from '../utils/formato.js';
import Encabezado from '../components/Encabezado.jsx';

const formularioVacio = { nombre: '', marca: '', tipo: '', categoria: 'Abarrotes', precio: '', stock: '', descripcion: '' };

export default function AgregarProducto() {
  const { agregarProducto } = useInventario();
  const navigate = useNavigate();
  const [datos, setDatos] = useState(formularioVacio);
  const [error, setError] = useState('');

  const actualizar = (evento) => {
    const { name, value } = evento.target;
    setDatos((anterior) => ({ ...anterior, [name]: value }));
    if (error) setError('');
  };

  const guardar = (evento) => {
    evento.preventDefault();
    const nombre = datos.nombre.trim();
    const marca = datos.marca.trim();
    const tipo = datos.tipo.trim();
    const precio = Number(datos.precio);
    const stock = Number(datos.stock);

    if (!nombre || !marca || !tipo || !CATEGORIAS.includes(datos.categoria)) {
      setError('Completa el nombre, la marca, el tipo de producto y la categoría.');
      return;
    }
    if (datos.precio === '' || !Number.isInteger(precio) || precio <= 0) {
      setError('El precio debe ser un número entero mayor que cero.');
      return;
    }
    if (datos.stock === '' || !Number.isInteger(stock) || stock < 0) {
      setError('El stock debe ser un número entero igual o mayor que cero.');
      return;
    }

    agregarProducto({
      nombre, marca, tipo, categoria: datos.categoria, precio, stock,
      descripcion: datos.descripcion.trim() || 'Producto agregado al inventario.',
      icono: iconoCategoria(datos.categoria),
    });
    navigate('/inventario');
  };

  return (
    <div className="max-w-3xl">
      <Encabezado etiqueta="Inventario" titulo="Agregar un producto" descripcion="Completa los datos para registrar un nuevo artículo en el supermercado." />
      <form className="tarjeta" onSubmit={guardar} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label className="etiqueta" htmlFor="nombre">Nombre del producto *</label><input autoFocus required id="nombre" name="nombre" className="campo" maxLength={80} value={datos.nombre} onChange={actualizar} placeholder="Ej.: Harina sin polvos" /></div>
          <div><label className="etiqueta" htmlFor="marca">Marca *</label><input required id="marca" name="marca" className="campo" maxLength={60} value={datos.marca} onChange={actualizar} placeholder="Ej.: Selecta" /></div>
          <div><label className="etiqueta" htmlFor="tipo">Tipo o presentación *</label><input required id="tipo" name="tipo" className="campo" maxLength={60} value={datos.tipo} onChange={actualizar} placeholder="Ej.: Bolsa 1 kg" /></div>
          <div><label className="etiqueta" htmlFor="categoria">Categoría *</label><select required id="categoria" name="categoria" className="campo" value={datos.categoria} onChange={actualizar}>{CATEGORIAS.map((cat) => <option key={cat} value={cat}>{cat}</option>)}</select></div>
          <div><label className="etiqueta" htmlFor="precio">Precio en pesos (CLP) *</label><input required id="precio" name="precio" type="number" inputMode="numeric" min="1" step="1" className="campo" value={datos.precio} onChange={actualizar} placeholder="Ej.: 1490" /></div>
          <div><label className="etiqueta" htmlFor="stock">Cantidad disponible *</label><input required id="stock" name="stock" type="number" inputMode="numeric" min="0" step="1" className="campo" value={datos.stock} onChange={actualizar} placeholder="Ej.: 12" /></div>
          <div className="sm:col-span-2"><label className="etiqueta" htmlFor="descripcion">Descripción (opcional)</label><textarea id="descripcion" name="descripcion" rows="3" maxLength={250} className="campo" value={datos.descripcion} onChange={actualizar} placeholder="Escribe un detalle sobre el artículo..." /></div>
        </div>
        {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
        <div className="mt-6 flex flex-wrap gap-3"><button className="boton-principal" type="submit">Guardar producto</button><Link to="/inventario" className="boton-secundario">Cancelar</Link></div>
      </form>
      <p className="mt-4 text-sm text-slate-500">* Campos obligatorios. Los productos nuevos también aparecerán en los filtros del inventario.</p>
    </div>
  );
}
