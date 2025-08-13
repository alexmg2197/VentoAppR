import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar';
import Inicio from './Components/Inicio/Inicio';
import VerResponsiva from './Components/Responsivas/VerResponsivas';
import VerCorreos from './Components/Correos/VerCorreos';
import VerUsers from './Components/Usuarios/VerUsers';
import VerEquipos from './Components/Equipos/VerEquipos';
import VerColaboradores from './Components/Colaboradores/VerColaboradores'
import VerExtensiones from './Components/Extensiones/VerExtensiones'
import Login from './Components/Login/Login';
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Catalogos from './Components/Catalogos/Catalogos';
import Logs from './Components/Logs/Logs';
import ProtectedRoute from './Components/ProtectedRoute';
import Unauthorized from './Components/unauthorized';
import NotFound from './NotFound';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const [count, setCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para controlar el tamaño del sidebar

  
  const [isAuthenticated, setIsAuthenticated] = useState(() =>{
    return localStorage.getItem("user") ? true : false;
  });
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
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
    <div className='flex h-screen '>
          <Sidebar setIsAuthenticated={setIsAuthenticated} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} ></Sidebar>
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header setIsAuthenticated={setIsAuthenticated} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} ></Header>
            <div className="flex-1 overflow-hidden bg-gray-100 p-4 overflow-y-scroll">
              <Routes>
                <Route index element={<Navigate to="/Inicio" replace />} />
                <Route exact path="/Inicio" element={<Inicio />} />
                <Route exact path="/unauthorized" element={<Unauthorized />} />
                <Route exact path="/VerResponsiva" element={<VerResponsiva />} />
                <Route exact path="/VerCorreos" element={<VerCorreos />} />
                <Route exact path="/VerUsuarios" element={<ProtectedRoute allowedRoles={["Admin"]}><VerUsers /></ProtectedRoute>} />
                <Route exact path="/VerEquipos" element={<VerEquipos />} />
                <Route exact path="/VerColaboradores" element={<VerColaboradores />} />
                <Route exact path="/VerExtensiones" element={<VerExtensiones />} />
                <Route exact path="/Catalogos" element={<ProtectedRoute allowedRoles={["Admin"]}><Catalogos /></ProtectedRoute>} />
                <Route exact path="/Logs" element={<ProtectedRoute allowedRoles={["Admin"]}><Logs /></ProtectedRoute>} />
                  {/* Ruta 404 para rutas protegidas */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
    </div>

      ):(
        <Routes>
          <Route exact path="/ResetPassword" element={<ResetPassword />} />
          <Route exact path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="*" element={<Navigate to="/login" />} />
            {/* Ruta 404 para no autenticados */}
        </Routes>
      )}
    </Router>
  )
}

export default App
