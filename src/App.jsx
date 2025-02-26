import { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Inicio from './Components/Inicio/Inicio';
import CrearResponsiva from './Components/Responsivas/CrearResponsiva';
import VerResponsiva from './Components/Responsivas/VerResponsivas';
import CrearCorreo from './Components/Correos/CrearCorreo';
import VerCorreos from './Components/Correos/VerCorreos';
import CrearUser from './Components/Usuarios/CrearUser';
import VerUsers from './Components/Usuarios/VerUsers';
import CrearEquipo from './Components/Equipos/CrearEquipo';
import VerEquipos from './Components/Equipos/VerEquipos';
import Login from './Components/Login/Login';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const [count, setCount] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(() =>{
    return localStorage.getItem("usuario") ? true : false;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
    <div className=''>
      <Header setIsAuthenticated={setIsAuthenticated}></Header>
      <Routes>
        <Route exact path="/Inicio" element={<Inicio />} />
        <Route exact path="/CrearResponsiva" element={<CrearResponsiva />} />
        <Route exact path="/VerResponsiva" element={<VerResponsiva />} />
        <Route exact path="/CrearCorreo" element={<CrearCorreo />} />
        <Route exact path="/VerCorreos" element={<VerCorreos />} />
        <Route exact path="/CrearUsuario" element={<CrearUser />} />
        <Route exact path="/VerUsuarios" element={<VerUsers />} />
        <Route exact path="/CrearEquipo" element={<CrearEquipo />} />
        <Route exact path="/VerEquipos" element={<VerEquipos />} />
      </Routes>
    </div>

      ):(
        <Routes>
          <Route exact path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  )
}

export default App
