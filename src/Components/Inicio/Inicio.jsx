import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts';


export default function Inicio() {

    const API_URL = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(false);
    const [countResponsivas, setCountResponsivas] = useState([]);
    const [countCorreos, setCountCorreos] = useState([]);
    const [countUsuarios, setCountUsuarios] = useState([]);
    const [countEquipos, setCountEquipos] = useState([]);
    const [countColaborqdores, setCountColaboradores] = useState([]);
    const [countExtensiones, setCountExtensiones] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.rol)

    useEffect(() => {
        setLoading(true);

        const fetchResponsivasCount = fetch(`${API_URL}/api/Responsivas/ContarResponsivas`)
            .then((response) => response.json())
            .then((data) =>  setCountResponsivas(data));

        const fetchCountCorreos = fetch(`${API_URL}/api/Correos/ContarCorreos`)
            .then((response) => response.json())
            .then((data) =>  setCountCorreos(data));

        const fetchCountUsuarios = fetch(`${API_URL}/api/usuario/ContarUsuarios`)
            .then((response) => response.json())
            .then((data) =>  setCountUsuarios(data));

        const fetchCountEquipos = fetch(`${API_URL}/api/Equipos/ContarEquipos`)
            .then((response) => response.json())
            .then((data) =>  setCountEquipos(data));

        const fetchCountColaboradores = fetch(`${API_URL}/api/Colaboradores/ContarColaboradores`)
            .then((response) => response.json())
            .then((data) =>  setCountColaboradores(data));

        const fetchCountExtensiones = fetch(`${API_URL}/api/Extension/ContarExtensiones`)
            .then((response) => response.json())
            .then((data) =>  setCountExtensiones(data));

        Promise.all([fetchResponsivasCount, fetchCountCorreos, fetchCountUsuarios, fetchCountEquipos, fetchCountColaboradores, fetchCountExtensiones])
        .catch((error) => console.error("Error al cargar datos:", error))
        .finally(() => {setLoading(false);});
    }, []);

    return(
        <>
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
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <svg className="animate-spin h-10 w-10 text-blue-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <p className="text-gray-700">Cargando...</p>
                    </div>
                </div>
            )}
        </>
    )

}