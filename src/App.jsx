import { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar';
import Inicio from './Components/Inicio/Inicio';
import CrearResponsiva from './Components/Responsivas/CrearResponsiva';
import VerResponsiva from './Components/Responsivas/VerResponsivas';
import CrearCorreo from './Components/Correos/CrearCorreo';
import VerCorreos from './Components/Correos/VerCorreos';
import CrearUser from './Components/Usuarios/CrearUser';
import VerUsers from './Components/Usuarios/VerUsers';
import CrearEquipo from './Components/Equipos/CrearEquipo';
import VerEquipos from './Components/Equipos/VerEquipos';
import CrearRegistro from './Components/RegistroGlobal/Registro'
import Login from './Components/Login/Login';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const [count, setCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para controlar el tamaño del sidebar

  const [isAuthenticated, setIsAuthenticated] = useState(() =>{
    return localStorage.getItem("usuario") ? true : false;
  });
  
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setIsAuthenticated(true);
    }
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Cambiar el estado del sidebar
  };

  return (
    <Router>
      {isAuthenticated ? (
    <div className='flex h-screen'>
          <Sidebar setIsAuthenticated={setIsAuthenticated} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} ></Sidebar>
          <div className="flex-1 flex flex-col">
            <Header setIsAuthenticated={setIsAuthenticated} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} ></Header>
            <div className="p-4 flex-1 overflow-auto">
              <Routes>
                <Route exact path="/Inicio" element={<Inicio />} />
                <Route exact path="/CrearRegistro" element={<CrearRegistro />} />
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
          </div>
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
