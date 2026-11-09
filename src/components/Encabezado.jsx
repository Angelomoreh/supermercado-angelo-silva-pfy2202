export default function Encabezado({ etiqueta, titulo, descripcion }) {
  return (
    <div className="mb-7">
      {etiqueta && <p className="mb-2 text-xs font-bold uppercase tracking-widest text-marca-700">{etiqueta}</p>}
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{titulo}</h1>
      {descripcion && <p className="mt-2 max-w-2xl text-slate-600">{descripcion}</p>}
    </div>
  );
}
