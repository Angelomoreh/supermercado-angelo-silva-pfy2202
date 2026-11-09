import { createContext, useContext, useEffect, useReducer } from 'react';
import { crearEstadoInicial, inventarioReducer } from '../state/inventario.js';

const InventarioContext = createContext(null);
const STORAGE_KEY = 'supermercado-pfy2202-inventario-v1';

function leerInventarioGuardado() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (!guardado) return crearEstadoInicial();
    const estado = JSON.parse(guardado);
    const productosValidos = Array.isArray(estado.productos) && estado.productos.every(
      (p) => p && typeof p.id === 'string' && typeof p.nombre === 'string' &&
        Number.isInteger(p.stock) && p.stock >= 0 && Number.isFinite(p.precio) && p.precio >= 0,
    );
    const carritoValido = estado.carrito && typeof estado.carrito === 'object' && !Array.isArray(estado.carrito) &&
      Object.entries(estado.carrito).every(([id, cantidad]) =>
        Number.isInteger(cantidad) && cantidad > 0 && estado.productos.some((p) => p.id === id),
      );
    return productosValidos && carritoValido ? estado : crearEstadoInicial();
  } catch {
    return crearEstadoInicial();
  }
}

export function InventarioProvider({ children }) {
  const [estado, dispatch] = useReducer(inventarioReducer, undefined, leerInventarioGuardado);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
    } catch {
      // Si el navegador bloquea el almacenamiento, el sistema sigue funcionando en memoria.
    }
  }, [estado]);

  const agregarProducto = (producto) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `producto-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    dispatch({ type: 'AGREGAR_PRODUCTO', producto: { ...producto, id } });
  };

  return (
    <InventarioContext.Provider value={{
      ...estado,
      agregarProducto,
      agregarAlCarrito: (id) => dispatch({ type: 'AGREGAR_AL_CARRITO', id }),
      quitarUnoDelCarrito: (id) => dispatch({ type: 'QUITAR_UNO_DEL_CARRITO', id }),
      quitarTodosDelCarrito: (id) => dispatch({ type: 'QUITAR_TODOS_DEL_CARRITO', id }),
      reiniciar: () => dispatch({ type: 'REINICIAR' }),
    }}>
      {children}
    </InventarioContext.Provider>
  );
}

export function useInventario() {
  const contexto = useContext(InventarioContext);
  if (!contexto) throw new Error('useInventario debe usarse dentro de InventarioProvider');
  return contexto;
}
