import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Paper, Box, Typography  } from "@mui/material";
import Loader from "../Loader";

export default function Inicio() {

    const API_URL = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(false);
    const [countResponsivas, setCountResponsivas] = useState([]);
    const [countCorreos, setCountCorreos] = useState([]);
    const [countUsuarios, setCountUsuarios] = useState([]);
    const [countEquipos, setCountEquipos] = useState([]);
    const [countColaborqdores, setCountColaboradores] = useState([]);
    const [countExtensiones, setCountExtensiones] = useState([]);
    const [countColaboradorPorUbi, setCountColaboradorPorUbi] = useState([]);
    const [countEquipoPorUbi, setCountEquipoPorUbi] = useState([]);
    const [countResponsivaPorUbi, setCountResponsivaPorUbi] = useState([]);
    const [countCorreoPorUbi, setCountCorreoPorUbi] = useState([]);
    const [countExtensionPorUbi, setCountExtensionPorUbi] = useState([]);
    const [users, setUsers] = useState([]);

    // const users = [{name:'AlexM',email:'',storage:'' }]

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem("token");

    useEffect(() => {
        setLoading(true);

        if(user.rol != 'Analista' || user.rol != 'Supervisor')
        {
            const fetchColaboradorPorUbi = fetch(`${API_URL}/api/Colaboradores/ContarColaboradoresPorUbicacion`,
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
            )
            .then((response) => response.json())
            .then((data) =>  setCountColaboradorPorUbi(data));

            const fetchEquipoPorUbi = fetch(`${API_URL}/api/Equipos/ContarEquiposPorUbicacionOAgencia`,
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
            )
            .then((response) => response.json())
            .then((data) =>  setCountEquipoPorUbi(data));

            const fetchResponsivaPorUbi = fetch(`${API_URL}/api/Responsivas/ContarResponsivasPorUbicacionOAgencia`,
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
            )
            .then((response) => response.json())
            .then((data) =>  setCountResponsivaPorUbi(data));

            const fetchCorreoPorUbi = fetch(`${API_URL}/api/Correos/ContarCorreosPorUbicacionOAgencia`,
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
            )
            .then((response) => response.json())
            .then((data) =>  setCountCorreoPorUbi(data));

            const fetchExtensionPorUbi = fetch(`${API_URL}/api/Extension/ContarExtensionesPorUbicacionOAgencia`,
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
            )
            .then((response) => response.json())
            .then((data) =>  setCountExtensionPorUbi(data));

            Promise.all([fetchColaboradorPorUbi, fetchEquipoPorUbi, fetchResponsivaPorUbi, fetchCorreoPorUbi, fetchExtensionPorUbi])
            .catch((error) => console.error("Error al cargar datos:", error))
            .finally(() => {setLoading(false);});

        } 
            const fetchUsers = fetch(`${API_URL}/api/Usuario/MyUsers`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
                .then((response) => response.json())
                .then((data) =>  setUsers(data));
    
            const fetchResponsivasCount = fetch(`${API_URL}/api/Responsivas/ContarResponsivas`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
                .then((response) => response.json())
                .then((data) =>  setCountResponsivas(data));
    
            const fetchCountCorreos = fetch(`${API_URL}/api/Correos/ContarCorreos`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
                .then((response) => response.json())
                .then((data) =>  setCountCorreos(data));
    
            const fetchCountUsuarios = fetch(`${API_URL}/api/usuario/ContarUsuarios`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
                .then((response) => response.json())
                .then((data) =>  setCountUsuarios(data));
    
            const fetchCountEquipos = fetch(`${API_URL}/api/Equipos/ContarEquipos`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
                .then((response) => response.json())
                .then((data) =>  setCountEquipos(data));
    
            const fetchCountColaboradores = fetch(`${API_URL}/api/Colaboradores/ContarColaboradores`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
                .then((response) => response.json())
                .then((data) =>  setCountColaboradores(data));
    
            const fetchCountExtensiones = fetch(`${API_URL}/api/Extension/ContarExtensiones`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
                .then((response) => response.json())
                .then((data) =>  setCountExtensiones(data));
    
            Promise.all([fetchUsers, fetchResponsivasCount, fetchCountCorreos, fetchCountUsuarios, fetchCountEquipos, fetchCountColaboradores, fetchCountExtensiones])
            .catch((error) => console.error("Error al cargar datos:", error))
            .finally(() => {setLoading(false);});

    }, []);

    return(
        <>
        <h2 className='text-center xl:text-4xl text-3xl font-bold pb-4 bg-gradient-to-r from-black to-blue-600 bg-clip-text text-transparent'>{`Bienvenido Vento App TI ${user.nombreUbicacion}`} </h2>
            {
                (user.rol === 'Analista' || user.rol === 'Supervisor') && (
                    <article className="p-1.5 hover:animate-background rounded-xl bg-gradient-to-r from-blue-500 to-cyan-800 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
                        <div className="w-auto rounded-[10px] bg-gray-200 sm:p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
                                <div className="bg-red-600 text-white rounded-lg shadow-md overflow-hidden">
                                {/* Contenido Principal */}
                                    <div className="p-4 flex justify-between items-center">
                                        <div className='pl-2'>
                                            <h3 className="text-3xl font-bold">{countCorreos}</h3>
                                            <p className="text-sm uppercase text-white opacity-80">Correos</p>
                                        </div>
                                        <div className="text-6xl opacity-30"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/></svg>
                                        </div>
                                    </div>
                                    {/* Footer con Fondo Oscuro y Link */}
                                    <div className="bg-red-700 text-white px-4 py-2 flex justify-center items-center hover:bg-red-800 transition">
                                        <a href="#VerCorreos" className="text-white text-sm font-semibold pr-2">Más Información</a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m0 15v-4H7v-2h5V7l5 5z"/></svg>
                                    </div>
                                </div>
                                <div className="bg-blue-600 text-white rounded-lg shadow-md overflow-hidden">
                                    {/* Contenido Principal */}
                                    <div className="p-4 flex justify-between items-center">
                                        <div className='pl-2'>
                                            <h3 className="text-3xl font-bold">{countResponsivas}</h3>
                                            <p className="text-sm uppercase text-white opacity-80">Responsivas</p>
                                        </div>
                                        <div className="text-6xl opacity-30"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18 22a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zM13 4l5 5h-5zM7 8h3v2H7zm0 4h10v2H7zm0 4h10v2H7z"/></svg>
                                        </div>
                                    </div>
                                    {/* Footer con Fondo Oscuro y Link */}
                                    <div className="bg-blue-700 text-white px-4 py-2 flex justify-center items-center hover:bg-blue-800 transition">
                                        <a href="#VerResponsiva" className="text-white text-sm font-semibold pr-2">Más Información</a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m0 15v-4H7v-2h5V7l5 5z"/></svg>
                                    </div>
                                </div>
                                {
                                    (user.rol != 'Analista' && user.rol != 'Supervisor') && (
                                        <div className="bg-yellow-600 text-white rounded-lg shadow-md overflow-hidden">
                                            {/* Contenido Principal */}
                                            <div className="p-4 flex justify-between items-center">
                                                <div className='pl-2'>
                                                    <h3 className="text-3xl font-bold">{countUsuarios}</h3>
                                                    <p className="text-sm uppercase text-white opacity-80">Usuarios</p>
                                                </div>
                                                <div className="text-6xl opacity-30"> 
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2S7.5 4.019 7.5 6.5M20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1z"/></svg>
                                                </div>
                                            </div>
                                            {/* Footer con Fondo Oscuro y Link */}
                                            <div className="bg-yellow-700 text-white px-4 py-2 flex justify-center items-center hover:bg-yellow-800 transition">
                                                <a href="#VerUsuarios" className="text-white text-sm font-semibold pr-2">Más Información</a>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m0 15v-4H7v-2h5V7l5 5z"/></svg>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="bg-green-600 text-white rounded-lg shadow-md overflow-hidden">
                                    {/* Contenido Principal */}
                                    <div className="p-4 flex justify-between items-center">
                                        <div className='pl-2'>
                                            <h3 className="text-3xl font-bold">{countEquipos}</h3>
                                            <p className="text-sm uppercase text-white opacity-80">Equipos</p>
                                        </div>
                                        <div className="text-6xl opacity-30"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M8 2a1 1 0 0 0-1 1v.469h.5a2.75 2.75 0 0 1 2.75 2.75v.156H14V3a1 1 0 0 0-1-1zm-.109 11.871a2 2 0 0 0 .088-.944a2.75 2.75 0 0 0 2.271-2.708V7.625H14V13a1 1 0 0 1-1 1H8.5a1.5 1.5 0 0 1-.609-.129m4.78-9.684a.766.766 0 1 1-1.53 0a.766.766 0 0 1 1.53 0M0 6.22a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 9 6.22v4a1.5 1.5 0 0 1-1.5 1.5H5.25v.75H6a.75.75 0 1 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-.75H1.5a1.5 1.5 0 0 1-1.5-1.5z" clipRule="evenodd"/></svg>
                                        </div>
                                    </div>
                                    {/* Footer con Fondo Oscuro y Link */}
                                    <div className="bg-green-700 text-white px-4 py-2 flex justify-center items-center hover:bg-green-800 transition">
                                        <a href="#VerEquipos" className="text-white text-sm font-semibold pr-2">Más Información</a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m0 15v-4H7v-2h5V7l5 5z"/></svg>
                                    </div>
                                </div>
                                <div className="bg-orange-600 text-white rounded-lg shadow-md overflow-hidden">
                                    {/* Contenido Principal */}
                                    <div className="p-4 flex justify-between items-center">
                                        <div className='pl-2'>
                                            <h3 className="text-3xl font-bold">{countColaborqdores}</h3>
                                            <p className="text-sm uppercase text-white opacity-80">Colaboradores</p>
                                        </div>
                                        <div className="text-6xl opacity-30"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2S7.5 4.019 7.5 6.5M20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1z"/></svg>
                                        </div>
                                    </div>
                                    {/* Footer con Fondo Oscuro y Link */}
                                    <div className="bg-orange-700 text-white px-4 py-2 flex justify-center items-center hover:bg-orange-800 transition">
                                        <a href="#VerColaboradores" className="text-white text-sm font-semibold pr-2">Más Información</a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m0 15v-4H7v-2h5V7l5 5z"/></svg>
                                    </div>
                                </div>
                                <div className="bg-teal-600 text-white rounded-lg shadow-md overflow-hidden">
                                    {/* Contenido Principal */}
                                    <div className="p-4 flex justify-between items-center">
                                        <div className='pl-2'>
                                            <h3 className="text-3xl font-bold">{countExtensiones}</h3>
                                            <p className="text-sm uppercase text-white opacity-80">Extensiones</p>
                                        </div>
                                        <div className="text-6xl opacity-30"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="m15.88 3.86l-.61-1.31a1.21 1.21 0 0 0-.792-.658c-1.938-.528-4.161-.851-6.453-.891a27.5 27.5 0 0 0-6.687.934c-.165.048-.453.29-.605.609L.12 3.861a1.2 1.2 0 0 0-.12.52v.87l-.001.041c0 .392.318.71.71.71l.033-.001H3.26a.76.76 0 0 0 .742-.76L4 5.188v-.85a.65.65 0 0 1 .298-.546a6.9 6.9 0 0 1 3.724-.791a6.97 6.97 0 0 1 3.717.788c.143.099.262.3.262.529v.872a.76.76 0 0 0 .739.81h2.521l.031.001a.71.71 0 0 0 .71-.71l-.001-.043V4.38a1.2 1.2 0 0 0-.123-.527z"/><path fill="currentColor" d="M12 8.3a4.73 4.73 0 0 1-1.001-2.92L11 5.296V5h-1v1H6V5H5v.33l.001.08a4.74 4.74 0 0 1-1.009 2.93L1 12v3h14v-3zM8 13a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/><path fill="currentColor" d="M10 10a2 2 0 1 1-3.999.001A2 2 0 0 1 10 10"/></svg>
                                        </div>
                                    </div>
                                    {/* Footer con Fondo Oscuro y Link */}
                                    <div className="bg-teal-700 text-white px-4 py-2 flex justify-center items-center hover:bg-teal-800 transition">
                                        <a href="#VerExtensiones" className="text-white text-sm font-semibold pr-2">Más Información</a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m0 15v-4H7v-2h5V7l5 5z"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                )
            }
            {
                (user.rol === 'Admin' || user.rol === 'Gerente' || user.rol === 'Director') && (
                    <>
                        {/* <article className="p-1.5 mt-6 hover:animate-background rounded-xl bg-gradient-to-r from-blue-500 to-cyan-800 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
                            <div className="w-auto rounded-[10px] bg-gray-200 sm:p-6"> */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-4">
                                    {/* Colaboradores */}
                                    <div className="container px-4 ms-auto">
                                        <div className="max-w-lg mx-auto">
                                            <div className="relative group">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-sky-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                                                <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="space-y-1">
                                                            <p className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                                                                Colaboradores
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                Por Ubicación
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                                                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{countColaborqdores + ' Totales'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 mb-6">
                                                        {
                                                            countColaboradorPorUbi.map((cu,i) => {
                                                                return(
                                                                        <div key={i} className="relative overflow-hidden rounded-lg p-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                                                                            <div className="relative z-10">
                                                                                <span className="block text-2xl font-bold text-emerald-600 dark:text-emerald-400">{cu.total}</span>
                                                                                <span className="text-sm text-gray-600 dark:text-gray-400">{cu.ubicacion}</span>
                                                                            </div>
                                                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-sky-500" />
                                                                        </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="flex items-center justify-around">
                                                        <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-lg font-medium transform hover:scale-105 transition-transform">
                                                        View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Equipos */}
                                    <div className="container px-4 ms-auto">
                                        <div className="max-w-lg mx-auto">
                                            <div className="relative group">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-sky-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                                                <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="space-y-1">
                                                            <p className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                                                                Equipos
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                Por Ubicación
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                                                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{countEquipos + ' Totales'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 mb-6">
                                                        {
                                                            countEquipoPorUbi.map((cu,i) => {
                                                                return(
                                                                        <div key={i} className="relative overflow-hidden rounded-lg p-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                                                                            <div className="relative z-10">
                                                                                <span className="block text-2xl font-bold text-emerald-600 dark:text-emerald-400">{cu.total}</span>
                                                                                <span className="text-sm text-gray-600 dark:text-gray-400">{cu.ubicacion}</span>
                                                                            </div>
                                                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-sky-500" />
                                                                        </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="flex items-center justify-around">
                                                        <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-lg font-medium transform hover:scale-105 transition-transform">
                                                        View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Responsivas */}
                                    <div className="container px-4 ms-auto">
                                        <div className="max-w-lg mx-auto">
                                            <div className="relative group">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-sky-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                                                <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="space-y-1">
                                                            <p className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                                                                Responsivas
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                Por Ubicación
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                                                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{countResponsivas + ' Totales'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 mb-6">
                                                        {
                                                            countResponsivaPorUbi.map((cu,i) => {
                                                                return(
                                                                        <div key={i} className="relative overflow-hidden rounded-lg p-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                                                                            <div className="relative z-10">
                                                                                <span className="block text-2xl font-bold text-emerald-600 dark:text-emerald-400">{cu.total}</span>
                                                                                <span className="text-sm text-gray-600 dark:text-gray-400">{cu.ubicacion}</span>
                                                                            </div>
                                                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-sky-500" />
                                                                        </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="flex items-center justify-around">
                                                        <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-lg font-medium transform hover:scale-105 transition-transform">
                                                        View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Correos */}
                                    <div className="container px-4 ms-auto">
                                        <div className="max-w-lg mx-auto">
                                            <div className="relative group">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-sky-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                                                <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="space-y-1">
                                                            <p className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                                                                Correos
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                Por Ubicación
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                                                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{countCorreos + ' Totales'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 mb-6">
                                                        {
                                                            countCorreoPorUbi.map((cu,i) => {
                                                                return(
                                                                        <div key={i} className="relative overflow-hidden rounded-lg p-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                                                                            <div className="relative z-10">
                                                                                <span className="block text-2xl font-bold text-emerald-600 dark:text-emerald-400">{cu.total}</span>
                                                                                <span className="text-sm text-gray-600 dark:text-gray-400">{cu.ubicacion}</span>
                                                                            </div>
                                                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-sky-500" />
                                                                        </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="flex items-center justify-around">
                                                        <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-lg font-medium transform hover:scale-105 transition-transform">
                                                        View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Extensiones */}
                                    <div className="container px-4 ms-auto">
                                        <div className="max-w-lg mx-auto">
                                            <div className="relative group">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-sky-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                                                <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="space-y-1">
                                                            <p className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                                                                Extensiones
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                Por Ubicación
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                                                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{countExtensiones + ' Totales'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 mb-6">
                                                        {
                                                            countExtensionPorUbi.map((cu,i) => {
                                                                return(
                                                                        <div key={i} className="relative overflow-hidden rounded-lg p-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                                                                            <div className="relative z-10">
                                                                                <span className="block text-2xl font-bold text-emerald-600 dark:text-emerald-400">{cu.total}</span>
                                                                                <span className="text-sm text-gray-600 dark:text-gray-400">{cu.ubicacion}</span>
                                                                            </div>
                                                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-sky-500" />
                                                                        </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="flex items-center justify-around">
                                                        <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-lg font-medium transform hover:scale-105 transition-transform">
                                                        View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/* </div>
                        </article> */}
                    </>
                )
            }
            {
                user.rol != 'Admin' && (
                    <article className="p-1.5 mt-6 hover:animate-background rounded-xl bg-gradient-to-r from-blue-500 to-cyan-800 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
                        <div className="w-auto rounded-[10px] bg-gray-200 sm:p-6">
                                        <div className="flex flex-wrap items-center justify-between mb-1 -m-2">
                                            <div className="w-auto p-2">
                                                <h2 className="text-lg font-semibold text-gray-800">Usuarios</h2>
                                                <p className="text-xs text-gray-500 font-medium">Usuarios de {user.nombreUbicacion}</p>
                                            </div>
                                        </div>
                                        <TableContainer component={Paper}>
                                            <Table className='bg-gray-200'>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight:'bold' }}></TableCell>
                                                        <TableCell sx={{ fontWeight:'bold' }}>Nombre</TableCell>
                                                            <TableCell sx={{fontWeight:'bold' }}>Telfono</TableCell>
                                                            <TableCell sx={{fontWeight:'bold' }}>Correo</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        users.map((user, index) =>(
                                                            <TableRow key={user.idUsuario}>
                                                                <TableCell> {
                                                                user.fotoPerfil === null ? (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 48 48"><g fill="none" strokeWidth="3"><path fill="#fff" d="M3 24c0 11.598 9.402 21 21 21s21-9.402 21-21S35.598 3 24 3S3 12.402 3 24"/><path fill="#8fbffa" d="M3.094 21.999C13.974 21.95 22.901 13.629 23.906 3C13.026 3.048 4.1 11.37 3.094 21.999m41.812 0C34.026 21.95 25.099 13.629 24.094 3c10.88.048 19.807 8.37 20.812 18.999"/><path stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M3 24c0 11.598 9.402 21 21 21s21-9.402 21-21S35.598 3 24 3S3 12.402 3 24"/><path stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M23.906 3c-1.005 10.629-9.931 18.951-20.812 18.999m41.812 0C34.026 21.95 25.099 13.629 24.094 3M16 24v2m16-2v2m-1 8c-3.062 4-10.937 4-14 0"/></g></svg>
                                                                ) : (
                                                                    <img
                                                                    src={API_URL+user.fotoPerfil}
                                                                    alt={user.nombre}
                                                                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                                                                    />
                                                                )
                                                            }</TableCell>
                                                                <TableCell>{user.nombreUsuario + ' ' + user.apellidoUsuario}</TableCell>
                                                                <TableCell>{user.telefonoUsuario}</TableCell>
                                                                <TableCell>{user.correoUsuario}</TableCell>
                                                            </TableRow>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                        </div>
                    </article>
                )
            }
            {loading && (
                <Loader/>
            )}
        </>
    )

}