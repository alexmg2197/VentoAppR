import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts';


export default function Inicio() {

    const [loading, setLoading] = useState(false);
    const [countResponsivas, setCountResponsivas] = useState([]);
    const [countCorreos, setCountCorreos] = useState([]);
    const [countUsuarios, setCountUsuarios] = useState([]);
    const [countEquipos, setCountEquipos] = useState([]);
    const [dataMarcas, setDataMarcas] = useState([]);
    const [dataAreas, setDataAreas] = useState([]);

    useEffect(() => {
        setLoading(true);

        const fetchResponsivasCount = fetch('https://script.google.com/macros/s/AKfycbweruTMcyLjgrfGsRa7v-QUhjrvNSO7NGM0w4NDnaRiC6UlcQbtcRnogNJQvii_YS78/exec')
            .then((response) => response.json())
            .then((data) =>  setCountResponsivas(data));

        const fetchCountCorreos = fetch('https://script.google.com/macros/s/AKfycbxqqh59CVPO5raQe9-R00E3WMSbmSk67FdRCOIfpllT3b-8eQEcSaVrZ4KH6tUblUx_/exec')
            .then((response) => response.json())
            .then((data) =>  setCountCorreos(data));

        const fetchCountUsuarios = fetch('https://script.google.com/macros/s/AKfycbzzIzh6UYQiNYHanJOyXj6kD6M2kBKLjxhIGlrxfYkESMExnymwisjY1ZRG2GGR7533/exec')
            .then((response) => response.json())
            .then((data) =>  setCountUsuarios(data));

        const fetchCountEquipos = fetch('https://script.google.com/macros/s/AKfycbxXCv9emYyAZ7G03fy_ZoBxLItDOpw_k_91bUDUF0QXRNSyoIBhgEw8fRN-bT8X5j41/exec')
            .then((response) => response.json())
            .then((data) =>  setCountEquipos(data));

        const fetchMarcas =  fetch('https://script.google.com/macros/s/AKfycbxO-2Y-4e8MrWTys_zAZ6qfmUQ76FnzHWvrHRlBI5tov7dgvQB80wQsP9fBplFZ5RX3DQ/exec')
                            .then((response) => response.json())
                            .then((data) => {
                                const marcas = data.reduce((acc, curr) => {
                                    acc[curr.marca] = (acc[curr.marca] || 0) + 1;
                                    return acc;
                                }, {});
                                
                                setDataMarcas(Object.entries(marcas).map(([marca, total]) => ({ marca, total })));
                            });

        const fetchAreas =  fetch('https://script.google.com/macros/s/AKfycbyTpEuaTI_V9tgfbLAyZqobY5WUPqKGL0wZbCltjVGQmUI8bVckHdQN57D4lmomf8uNSA/exec')
                            .then((response) => response.json())
                            .then((data) => {
                                const areas = data.reduce((acc, curr) => {
                                    acc[curr.departamento] = (acc[curr.departamento] || 0) + 1;
                                    return acc;
                                }, {});
                                
                                setDataAreas(Object.entries(areas).map(([label, value]) => ({ label, value })));
                            });


        Promise.all([fetchResponsivasCount, fetchCountCorreos, fetchCountUsuarios, fetchCountEquipos, fetchMarcas, fetchAreas])
        .catch((error) => console.error("Error al cargar datos:", error))
        .finally(() => {setLoading(false); console.log(dataAreas)});
    }, []);
    

    // const values =[{id:1, value:20, label:'rojo'},{id:2,value:30,label:'verde'},{id:3,value:50,label:'azul'}]

    // const data = [
    //     { marca: 'HP', total: 120 },
    //     { marca: 'Lenovo', total: 98 },
    //     { marca: 'Dell', total: 150 },
    //     { marca: 'MSI', total: 170 },
    //     { marca: 'Generica', total: 200 },
    // ];

    const pieParams = {
        height: 270,
        margin: { right: 5 },
        slotProps: { legend: { hidden: true } },
      };

    return(
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
                <div className="bg-red-600 text-white rounded-lg shadow-md overflow-hidden">
                {/* Contenido Principal */}
                    <div className="p-4 flex justify-between items-center">
                        <div className='pl-2'>
                            <h3 className="text-3xl font-bold">{countCorreos.totalActiveRows}</h3>
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
                            <h3 className="text-3xl font-bold">{countResponsivas.totalActiveRows}</h3>
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
                            <h3 className="text-3xl font-bold">{countUsuarios.totalActiveRows}</h3>
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
                            <h3 className="text-3xl font-bold">{countEquipos.totalActiveRows}</h3>
                            <p className="text-sm uppercase text-white opacity-80">Equipos</p>
                        </div>
                        <div className="text-6xl opacity-30"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M8 2a1 1 0 0 0-1 1v.469h.5a2.75 2.75 0 0 1 2.75 2.75v.156H14V3a1 1 0 0 0-1-1zm-.109 11.871a2 2 0 0 0 .088-.944a2.75 2.75 0 0 0 2.271-2.708V7.625H14V13a1 1 0 0 1-1 1H8.5a1.5 1.5 0 0 1-.609-.129m4.78-9.684a.766.766 0 1 1-1.53 0a.766.766 0 0 1 1.53 0M0 6.22a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 9 6.22v4a1.5 1.5 0 0 1-1.5 1.5H5.25v.75H6a.75.75 0 1 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-.75H1.5a1.5 1.5 0 0 1-1.5-1.5z" clipRule="evenodd"/></svg>
                        </div>
                    </div>
                    {/* Footer con Fondo Oscuro y Link */}
                    <div className="bg-green-700 text-white px-4 py-2 flex justify-center items-center hover:bg-yellow-800 transition">
                        <a href="#VerEquipos" className="text-white text-sm font-semibold pr-2">Más Información</a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m0 15v-4H7v-2h5V7l5 5z"/></svg>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 p-4">
                <div className="bg-white shadow rounded-lg">
                    <div className="bg-five text-white py-3 rounded-t-xl flex items-center justify-center px-4">
                        <h3>Correos por Area</h3>
                    </div>
                    <div className='flex flex-col md:flex-row items-center justify-center mt-4'>
                        <PieChart
                            series={[
                            {
                                data: dataAreas,
                                cx: 100, // Centro del gráfico en X
                                cy: 125, // Centro del gráfico en Y
                            },
                            ]}
                            width={300} // Ancho del gráfico
                            height={200} // Alto del gráfico
                            {...pieParams}
                        />
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg">
                    {/* <h2 className="text-xl font-bold text-gray-700 mb-4">Correos por Mes</h2> */}
                    <div className="bg-five text-white py-3 rounded-t-xl flex items-center justify-center px-4">
                        <h3>Responsivas por Marca</h3>
                    </div>
                    <div className='flex flex-col md:flex-row items-center justify-center mt-4'>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: dataMarcas.map((item) => item.marca) }]}
                            series={[{ 
                                data: dataMarcas.map((item) => item.total), 
                                color: '#3E5C76' ,
                                cx: 200, // Centro del gráfico en X
                                cy: 125, // Centro del gráfico en Y
                                }]}
                            width={500}
                            height={300}
                        />
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