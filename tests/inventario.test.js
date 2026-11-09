import test from 'node:test';
import assert from 'node:assert/strict';
import {
  crearEstadoInicial, inventarioReducer, filtrarProductos, cantidadCarrito, totalCarrito,
} from '../src/state/inventario.js';

const ejecutar = (estado, type, id) => inventarioReducer(estado, { type, id });

test('muestra todos los productos y filtra sin cambiar la lista original', () => {
  const estado = crearEstadoInicial();
  const originales = estado.productos.length;
  const filtrados = filtrarProductos(estado.productos, 'Bebidas');
  assert.ok(filtrados.length > 0);
  assert.ok(filtrados.every((p) => p.categoria === 'Bebidas'));
  assert.equal(estado.productos.length, originales);
  assert.equal(filtrarProductos(estado.productos, 'Todas').length, originales);
});

test('al agregar al carrito se resta una unidad al stock', () => {
  const inicial = crearEstadoInicial();
  const id = inicial.productos[0].id;
  const stockInicial = inicial.productos[0].stock;
  const nuevo = ejecutar(inicial, 'AGREGAR_AL_CARRITO', id);
  assert.equal(nuevo.productos[0].stock, stockInicial - 1);
  assert.equal(nuevo.carrito[id], 1);
  assert.equal(inicial.productos[0].stock, stockInicial, 'no mutar el estado original');
});

test('al disminuir el carrito vuelve una unidad al inventario', () => {
  const inicial = crearEstadoInicial();
  const id = inicial.productos[0].id;
  const comprado = ejecutar(inicial, 'AGREGAR_AL_CARRITO', id);
  const devuelto = ejecutar(comprado, 'QUITAR_UNO_DEL_CARRITO', id);
  assert.equal(devuelto.productos[0].stock, inicial.productos[0].stock);
  assert.equal(cantidadCarrito(devuelto.carrito), 0);
});

test('no deja agregar más productos que el stock disponible', () => {
  const inicial = crearEstadoInicial();
  const id = inicial.productos[0].id;
  const unidades = inicial.productos[0].stock;
  let estado = inicial;
  for (let i = 0; i < unidades + 4; i += 1) estado = ejecutar(estado, 'AGREGAR_AL_CARRITO', id);
  assert.equal(estado.productos[0].stock, 0);
  assert.equal(estado.carrito[id], unidades);
});

test('quitar un producto devuelve toda su cantidad disponible', () => {
  const inicial = crearEstadoInicial();
  const id = inicial.productos[2].id;
  let estado = ejecutar(inicial, 'AGREGAR_AL_CARRITO', id);
  estado = ejecutar(estado, 'AGREGAR_AL_CARRITO', id);
  estado = ejecutar(estado, 'QUITAR_TODOS_DEL_CARRITO', id);
  assert.equal(estado.productos[2].stock, inicial.productos[2].stock);
  assert.equal(cantidadCarrito(estado.carrito), 0);
});

test('el carrito calcula el total usando los precios de los productos', () => {
  const inicial = crearEstadoInicial();
  const id = inicial.productos[0].id;
  const nuevo = ejecutar(inicial, 'AGREGAR_AL_CARRITO', id);
  assert.equal(totalCarrito(nuevo.productos, nuevo.carrito), inicial.productos[0].precio);
});

test('agregar nuevo producto y luego reiniciar los datos', () => {
  const inicial = crearEstadoInicial();
  const nuevo = inventarioReducer(inicial, { type: 'AGREGAR_PRODUCTO', producto: {
    id: 'nuevo-1', nombre: 'Producto de prueba', marca: 'Marca', tipo: 'Unidad', categoria: 'Abarrotes', precio: 1000, stock: 5, icono: '📦', descripcion: 'Ejemplo',
  }});
  assert.equal(nuevo.productos.length, inicial.productos.length + 1);
  assert.equal(nuevo.productos.at(-1).nombre, 'Producto de prueba');
  const reiniciado = inventarioReducer(nuevo, { type: 'REINICIAR' });
  assert.equal(reiniciado.productos.length, inicial.productos.length);
  assert.equal(cantidadCarrito(reiniciado.carrito), 0);
});
