import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioLoginPage from './pages/InicioLoginPage.jsx';
import ListarPage from './pages/ListaPage.jsx';
import AñadirPage from './pages/AñadirPage.jsx';
import ConsultaPage from './pages/ConsultaPage.jsx';
import EditarPage from './pages/EditarPage.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<InicioLoginPage />} />
        <Route path='/lista' element={<ListarPage />} />
        <Route path='/añadir' element={<AñadirPage />} />
        <Route path='/consulta/:id' element={<ConsultaPage />} />
        <Route path='/editar/:id' element={<EditarPage />} />
      </Routes>
    </Router>
  );
}

export default App;

