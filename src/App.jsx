import { HashRouter, Route, Routes } from 'react-router-dom';
import { InventarioProvider } from './context/InventarioContext.jsx';
import Layout from './components/Layout.jsx';
import Inicio from './pages/Inicio.jsx';
import Inventario from './pages/Inventario.jsx';
import AgregarProducto from './pages/AgregarProducto.jsx';
import DetalleProducto from './pages/DetalleProducto.jsx';
import Carrito from './pages/Carrito.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Contacto from './pages/Contacto.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';

export default function App() {
  return (
    <HashRouter>
      <InventarioProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/productos/nuevo" element={<AgregarProducto />} />
            <Route path="/productos/:id" element={<DetalleProducto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<NoEncontrada />} />
          </Route>
        </Routes>
      </InventarioProvider>
    </HashRouter>
  );
}
