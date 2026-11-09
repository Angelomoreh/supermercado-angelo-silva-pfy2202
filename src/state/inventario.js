import { PRODUCTOS_INICIALES } from '../data/productosIniciales.js';

export const crearEstadoInicial = () => ({
  productos: PRODUCTOS_INICIALES.map((producto) => ({ ...producto })),
  carrito: {}, // Ejemplo: { p1: 2, p3: 1 }
});

// Las acciones actualizan el stock y el carrito en un solo lugar.
export function inventarioReducer(estado, accion) {
  switch (accion.type) {
    case 'AGREGAR_PRODUCTO': {
      const producto = accion.producto;
      if (!producto?.id || estado.productos.some((p) => p.id === producto.id)) return estado;
      return { ...estado, productos: [...estado.productos, producto] };
    }

    case 'AGREGAR_AL_CARRITO': {
      const producto = estado.productos.find((p) => p.id === accion.id);
      if (!producto || producto.stock < 1) return estado;
      return {
        productos: estado.productos.map((p) => p.id === accion.id ? { ...p, stock: p.stock - 1 } : p),
        carrito: { ...estado.carrito, [accion.id]: (estado.carrito[accion.id] || 0) + 1 },
      };
    }

    case 'QUITAR_UNO_DEL_CARRITO': {
      const cantidad = estado.carrito[accion.id] || 0;
      if (!cantidad) return estado;
      const carrito = { ...estado.carrito };
      if (cantidad === 1) delete carrito[accion.id];
      else carrito[accion.id] = cantidad - 1;
      return {
        productos: estado.productos.map((p) => p.id === accion.id ? { ...p, stock: p.stock + 1 } : p),
        carrito,
      };
    }

    case 'QUITAR_TODOS_DEL_CARRITO': {
      const cantidad = estado.carrito[accion.id] || 0;
      if (!cantidad) return estado;
      const carrito = { ...estado.carrito };
      delete carrito[accion.id];
      return {
        productos: estado.productos.map((p) => p.id === accion.id ? { ...p, stock: p.stock + cantidad } : p),
        carrito,
      };
    }

    case 'REINICIAR':
      return crearEstadoInicial();

    default:
      return estado;
  }
}

// Filtrar no cambia los productos originales.
export function filtrarProductos(productos, categoria, busqueda = '') {
  const termino = busqueda.trim().toLocaleLowerCase('es');
  return productos.filter((p) => {
    const coincideCategoria = categoria === 'Todas' || p.categoria === categoria;
    const texto = `${p.nombre} ${p.marca} ${p.tipo}`.toLocaleLowerCase('es');
    return coincideCategoria && (!termino || texto.includes(termino));
  });
}

export const cantidadCarrito = (carrito) => Object.values(carrito).reduce((sum, cantidad) => sum + cantidad, 0);
export const unidadesDisponibles = (productos) => productos.reduce((sum, p) => sum + p.stock, 0);
export const totalCarrito = (productos, carrito) => productos.reduce((sum, p) => sum + p.precio * (carrito[p.id] || 0), 0);
