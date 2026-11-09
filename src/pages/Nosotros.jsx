import Encabezado from '../components/Encabezado.jsx';

export default function Nosotros() {
  return (
    <div className="max-w-3xl">
      <Encabezado etiqueta="Información" titulo="Quiénes somos" descripcion="Conoce un poco más sobre este supermercado de ejemplo." />
      <div className="tarjeta space-y-4 leading-relaxed text-slate-600">
        <p>Somos un supermercado ficticio creado para una actividad de Desarrollo Frontend II. La idea es demostrar cómo se puede manejar un inventario utilizando React.</p>
        <p>En esta aplicación podemos revisar productos, agregar artículos nuevos, buscar por categoría y utilizar un carrito de compras que actualiza las existencias.</p>
        <p>Los datos y valores son de prueba y no representan una tienda real.</p>
      </div>
    </div>
  );
}
