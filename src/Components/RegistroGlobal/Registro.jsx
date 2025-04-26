import { Formik } from "formik";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";


export default function Registro(){

        const API_URL = import.meta.env.VITE_API_URL;

        const [loading, setLoading] = useState(false);
        const [ubicaciones, setUbicaciones] = useState([]);
        const [departamentos, setDepartamentos] = useState([]);
        const [procesadores, setProcesadores] = useState([]);
        const [sistema, setSistema] = useState([]);
        const [disco, setDisco] = useState([]);
        const [equipo, setEquipo] = useState([]);
    
        useEffect(() => {
            setLoading(true);
    
            const fetchUbicaciones = fetch(`${API_URL}/api/Ubicaciones`)
                .then((response) => response.json())
                .then((data) =>  setUbicaciones(data));

                const fetchSistema = fetch(`${API_URL}/api/SistemaOperativo`)
                .then((response) => response.json())
                .then((data) =>  setSistema(data));
                
            const fetchDepartamentos = fetch(`${API_URL}/api/Areas`)
                .then((response) => response.json())
                .then((data) =>  setDepartamentos(data));
    
            const fetchProcesadores = fetch(`${API_URL}/api/Procesador`)
                .then((response) => response.json())
                .then((data) =>  setProcesadores(data));
    
            const fetchDisco = fetch(`${API_URL}/api/Almacenamiento`)
                .then((response) => response.json())
                .then((data) =>  setDisco(data));
    
            const fetchEquipo = fetch(`${API_URL}/api/TipoEquipo`)
                .then((response) => response.json())
                .then((data) =>  setEquipo(data));
    
            Promise.all([fetchUbicaciones, fetchSistema, fetchDepartamentos, fetchProcesadores, fetchDisco, fetchEquipo])
            .catch((error) => console.error("Error al cargar datos:", error))
            .finally(() => {setLoading(false)});
            console.log(ubicaciones)
        }, []);
    
        const usuario = JSON.parse(localStorage.getItem("usuario"));

    return(
            <div className="container mx-auto p-1 ">
                <div className="bg-three text-white text-center py-3 rounded-t-xl">
                    <h2 className="text-2xl font-bold text-center mb-4">Registro de Información</h2>
                </div>
                <Formik
                    initialValues={{
                        //COLABORADOR
                        nombreColaborador: '',
                        apellidosColaborador:'',
                        puesto: '',
                        area: '',
                        ubicacion: '',
                        //CORREO
                        correo:'',
                        contrasena:'',
                        //EQUIPO
                        tipoEquipo:'',
                        marca:'',
                        modelo:'',
                        sistemaOperativo:'',
                        noSerie: '',
                        procesador: '',
                        ram: '',
                        ssd:false,
                        hdd:false,
                        m2:false,
                        ssdSize:'',
                        hddSize:'',
                        m2Size:'',
                        monitor: false,
                        marcaMonitor: '',
                        teclado: false,
                        marcaTeclado: '',
                        mouse: false,
                        marcaMouse: '',
                        diadema: false,
                        marcaDiadema: '',
                        tipoconexion:'',
                        activofijo: '',
                        observa:'',
                    }}
                    validate={values => {
                        const errors = {};
                        
                        return errors
                    }}
                    onSubmit={async (values, { setSubmitting}) => {

                        setLoading(true)

                        try {
                            const response = await axios.post(`${API_URL}/api/Colaboradores/GuardarDatosC`, {
                                //Colaborador
                                nombreColaborador: values.nombreColaborador,
                                apellidoColaborador: values.apellidosColaborador,
                                puesto: values.puesto,
                                areaId: values.area,
                                ubicacionId: values.ubicacion,
                                //Equipo
                                tipoEquipoId: values.tipoEquipo,
                                marcaEquipo: values.marca,
                                modeloEquipo:values.modelo,
                                sistemaOperativoId: values.sistemaOperativo,
                                nSerie: values.noSerie,
                                procesadorId: values.procesador,
                                ram: values.ram,
                                activoFijo: values.activofijo,
                                monitor: values.monitor,
                                marcaMonitor: values.marcaMonitor,
                                teclado: values.teclado,
                                marcaTeclado: values.marcaTeclado,
                                mouse: values.mouse,
                                marcaMouse: values.marcaMouse,
                                diadema: values.diadema,
                                marcaDiadema: values.marcaDiadema,
                                observaciones: values.observaciones,
                                //Correo
                                correo: values.correo,
                                contraseñaCorreo: values.contrasena,
                                //Extension
                                extension:values.extension,
                                telefono: values.telefono,
                                //Almacenamientos
                                almacenamientos: [
                                    values.ssd && values.ssdSize ? { almacenamientoId: values.ssdSize, tipo: "SSD" } : null,
                                    values.hdd && values.hddSize ? { almacenamientoId: values.hddSize, tipo: "HDD" } : null,
                                    values.m2 && values.m2Size ? { almacenamientoId: values.m2Size, tipo: "M2" } : null,
                                ].filter(Boolean) // Elimina valores `null`
                            });
                           

                            Swal.fire({
                                title: "¡Éxito!",
                                text: "Colaborador y datos relacionados guardados correctamente.",
                                icon: "success",
                                confirmButtonText: "OK"
                            }).then(() => {
                                window.location.reload(); // Recargar la página
                            });
                    

                        } catch (error) {console.error("Error al registrar los datos:", error);
                            Swal.fire({
                                title: "Error",
                                text: "Hubo un error al registrar los datos",
                                icon: "error",
                                confirmButtonText: "OK"
                            })
                        } finally {
                            setLoading(false);
                            setSubmitting(false);
                        }
                    }}
                >{
                    ({
                        values,
                        errors,
                        handleChange,
                        handleSubmit
                    }) => (
                    <form className="bg-white p-6 shadow-xl rounded-lg" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Sección 1 */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Datos del Colaborador</h3>
                                <div className="space-y-4">
                                    <label htmlFor="nombreColaborador">Nombre:</label>
                                    <input type="text" id="nombreColaborador" name="nombreColaborador" value={values.nombreColaborador} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    <label htmlFor="apellidosColaborador">Apellidos:</label>
                                    <input type="text" id="apellidosColaborador" name="apellidosColaborador" value={values.apellidosColaborador} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    <label htmlFor="puesto">Puesto:</label>
                                    <input type="text" id="puesto" name="puesto" value={values.puesto} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    <label htmlFor="area">Area:</label>
                                    <select id="area" name="area" value={values.area} onChange={handleChange} className="w-full p-2 border rounded-md bg-white" >
                                        <option value=""> --- Seleccione una opción ---</option>
                                        {
                                            departamentos.map((depa) =>{
                                                return(
                                                    <option key={depa.idArea} value={depa.idArea}>{depa.nombreArea}</option>
                                                )
                                                
                                            })
                                        }
                                    </select>
                                    <label htmlFor="departamento">Ubicación:</label>
                                    <select id="ubicacion" name="ubicacion" value={values.ubicacion} onChange={handleChange} className="w-full p-2 border rounded-md bg-white" >
                                        <option value=""> --- Seleccione una opción ---</option>
                                        {
                                            ubicaciones.map((ubicacion) =>{
                                                return(
                                                    <option key={ubicacion.idUbicacion} value={ubicacion.idUbicacion}>{ubicacion.ubicacion}</option>
                                                )
                                            })
                                        }
                                    </select>
    
                                </div>
                                <h3 className="text-lg font-semibold mb-2 pt-6">Correo Electronico</h3>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                    <label htmlFor="correo">Correo:</label>
                                    <input type="email" id="correo" name="correo" value={values.correo} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    <label htmlFor="contrasena">Contraseña:</label>
                                    <input type="text" id="contrasena" name="contrasena" value={values.contrasena} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    
                                </div>
                            </div>
                        {/* Sección 2 */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Datos del Equipo</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3">
                                    <div className="space-y-4">
                                        <label htmlFor="tipoEquipo">Tipo de Equipo:</label>
                                        <select  id="tipoEquipo" name="tipoEquipo" value={values.tipoEquipo} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
                                            <option value="">--- Seleccione una opción ---</option>
                                            {
                                                equipo.map((sistema) =>{
                                                    return(
                                                        <option key={sistema.idTipoEquipo} value={sistema.idTipoEquipo}>{sistema.tipoEquipo}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="spae-y-4">
                                        <label htmlFor="marca">Marca:</label>
                                        <input type="text" id="marca" name="marca" value={values.marca} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    </div>
                                    <div className="space-y-4">
                                        <label htmlFor="modelo">Modelo:</label>
                                        <input type="text" id="modelo" name="modelo" value={values.modelo} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    </div>
                                    <div className="space-y-4">
                                        <label htmlFor="procesador">Procesador:</label>
                                        <select id="procesador" name="procesador" value={values.procesador} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
                                            <option value="">--- Selecciona una opción ---</option>
                                            {
                                                procesadores.map((procesador) =>{
                                                    return(
                                                        <option key={procesador.idProcesador} value={procesador.idProcesador}>{procesador.procesador}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label htmlFor="noSerie">No. de Serie:</label>
                                        <input type="text" id="noSerie" name="noSerie" value={values.noSerie} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    </div>
                                    <div className="space-y-4">
                                        <label htmlFor="sistemaOperativo">Sistema Operativo:</label>
                                        <select id="sistemaOperativo" name="sistemaOperativo" value={values.sistemaOperativo} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
                                            <option value="">--- Selecciona una opción ---</option>
                                            {
                                                sistema.map((sis) =>{
                                                    return(
                                                        <option key={sis.idSistemaOperativo} value={sis.idSistemaOperativo}>{sis.sistemasOperativo}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label htmlFor="ram"> Memoria RAM:</label>
                                        <input type="text" id="ram" name="ram" value={values.ram} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    </div>
                                    <div className="space-y-4">
                                        <label htmlFor="activofijo">Placa Activo:</label>
                                        <input type="text" id="activofijo" name="activofijo" value={values.activofijo} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-2 pt-3">
                                    <div className="space-y-3">
                                        <label className="flex items-center space-x-2">
                                            <input type="checkbox" name="ssd" value={values.ssd} onChange={handleChange}/>
                                            <span>SSD</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input type="checkbox" name="hdd" value={values.hdd} onChange={handleChange}/>
                                            <span>HDD</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input type="checkbox" name="m2" value={values.m2} onChange={handleChange}/>
                                            <span>M2</span>
                                        </label>
                                    </div>
                                    <div className="space-y-3">
                                        {values.ssd && (
                                        <>
                                            <select name="ssdSize" id="ssdSize" value={values.ssdSize} onChange={handleChange} className="w-full p-2 border rounded-md">
                                                <option value=""> --- SSD ---</option>
                                                {
                                                    disco.map((disco) =>{
                                                        return(
                                                            <option key={disco.idAlmacenamiento} value={disco.idAlmacenamiento}>{disco.almacenamiento}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </>
                                        )}
                                        {values.hdd && (
                                        <>
                                            <select name="hddSize" id="hddSize" value={values.hddSize} onChange={handleChange} className="w-full p-2 border rounded-md">
                                                <option value=""> --- HDD ---</option>
                                                {
                                                    disco.map((disco) =>{
                                                        return(
                                                            <option key={disco.idAlmacenamiento} value={disco.idAlmacenamiento}>{disco.almacenamiento}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </>
                                        )}
                                        {values.m2 && (
                                        <>
                                            <select name="m2Size" id="m2Size" value={values.m2Size} onChange={handleChange} className="w-full p-2 border rounded-md">
                                                <option value=""> --- M2 ---</option>
                                                {
                                                    disco.map((disco) =>{
                                                        return(
                                                            <option key={disco.idAlmacenamiento} value={disco.idAlmacenamiento}>{disco.almacenamiento}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-2 pt-3">
                                    <div className="space-y-4">
                                        <label className="flex items-center space-x-2">
                                            <input type="checkbox" name="monitor" value={values.monitor} onChange={handleChange}/>
                                            <span>Monitor</span>
                                        </label>
                                    </div>
                                    <div className="space-y-4">
                                    {values.monitor && (
                                    <>
                                        <label htmlFor="marcaMonitor">Marca del Monitor:</label>
                                        <input type="text" id="marcaMonitor" name="marcaMonitor" value={values.marcaMonitor} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    </>
                                    )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-2 pt-3">
                                    <div className="space-y-4">
                                        <label className="flex items-center space-x-2">
                                            <input type="checkbox" name="teclado" value={values.teclado} onChange={handleChange}/>
                                            <span>Teclado</span>
                                        </label>
                                    </div>
                                    <div className="space-y-4">
                                    {values.teclado && (
                                    <>
                                        <label htmlFor="marca">Marca del Teclado:</label>
                                        <input type="text" id="marcaTeclado" name="marcaTeclado" value={values.marcaTeclado} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    </>
                                    )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-2 pt-3">
                                    <div className="space-y-4">
                                        <label className="flex items-center space-x-2">
                                            <input type="checkbox" name="mouse" value={values.mouse} onChange={handleChange}/>
                                            <span>Mouse</span>
                                        </label>
                                    </div>
                                    <div className="space-y-4">
                                    {values.mouse && (
                                    <>
                                        <label htmlFor="marcaMouse">Marca del Mouse:</label>
                                        <input type="text" id="marcaMouse" name="marcaMouse" value={values.marcaMouse} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    </>
                                    )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-2 pt-3">
                                    <div className="space-y-4">
                                        <label className="flex items-center space-x-2">
                                            <input type="checkbox" name="diadema" value={values.diadema} onChange={handleChange}/>
                                            <span>Diadema</span>
                                        </label>
                                    </div>
                                    <div className="space-y-4">
                                    {values.diadema && (
                                    <>
                                        <label htmlFor="marca">Marca de la Diadema:</label>
                                        <input type="text" id="marcaDiadema" name="marcaDiadema" value={values.marcaDiadema} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    </>
                                    )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-1 pt-3">
                                    <label className="flex items-center space-x-2">Observaciones:</label>
                                    <textarea id="observa" value={values.observa} onChange={handleChange} className="border-1 rounded-md"/>
                                </div>
                            </div>
                        {/* Sección 3 */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Datos de la Extensión</h3>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                    <label htmlFor="extension">Extensión:</label>
                                    <input type="text" id="extension" name="extension" value={values.extension} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                    <label htmlFor="telefono">Telefono:</label>
                                    <input type="text" id="telefono" name="telefono" value={values.telefono} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>
                            </div>
                        </div>
    
                        {/* Botón de envío */}
                        <div className="mt-6">
                            <button type="submit" className="w-full bg-five hover:bg-four text-white py-2 rounded-md disabled:opacity-50"  >
                                Crear
                            </button>
                        </div>
                    </form>
                    )}
                </Formik>
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
            </div>
        )
}