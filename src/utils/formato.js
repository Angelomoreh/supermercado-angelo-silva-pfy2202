export const moneda = (numero) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(numero);

export const iconoCategoria = (categoria) => ({
  Abarrotes: '🛒',
  Bebidas: '🥤',
  Lácteos: '🥛',
  Panadería: '🥖',
  'Frutas y verduras': '🍎',
  Limpieza: '🧼',
}[categoria] || '📦');
