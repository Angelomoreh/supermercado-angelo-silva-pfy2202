import Encabezado from '../components/Encabezado.jsx';

export default function Contacto() {
  return (
    <div className="max-w-3xl">
      <Encabezado etiqueta="Información" titulo="Contáctanos" descripcion="Información de contacto de nuestro supermercado de ejemplo." />
      <div className="tarjeta space-y-4">
        <p className="text-slate-600">Este sitio fue desarrollado como una actividad académica. Por eso no dispone de atención comercial real.</p>
        <div className="rounded-xl bg-slate-50 p-4"><p className="font-semibold text-slate-900">Consultas sobre el proyecto</p><p className="mt-1 text-sm text-slate-600">Las consultas se realizan a través de los canales oficiales del curso en DUOC UC.</p></div>
        <p className="text-sm text-slate-500">Se incluyó esta sección para demostrar el menú inferior y la navegación con React Router.</p>
      </div>
    </div>
  );
}
