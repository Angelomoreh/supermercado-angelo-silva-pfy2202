import { Link } from 'react-router-dom';

export default function NoEncontrada() {
  return (
    <div className="tarjeta py-16 text-center"><p className="text-5xl">🔎</p><h1 className="mt-4 text-2xl font-bold">Página no encontrada</h1><p className="mt-2 text-slate-500">La dirección ingresada no existe.</p><Link className="boton-principal mt-6" to="/">Volver al inicio</Link></div>
  );
}
