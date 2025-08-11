import {React, useState, useEffect } from "react";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ModalEditEquipo({modal,equipo, isEdit}){

    const API_URL = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(false);
    const [procesadores, setProcesadores] = useState([]);
    const [sistema, setSistema] = useState([]);
    const [disco, setDisco] = useState([]);
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
            setLoading(true);
        
            Promise.all([
                fetch(`${API_URL}/api/Procesador`)
                    .then((response) => response.json()),
                fetch(`${API_URL}/api/Almacenamiento`)
                    .then((response) => response.json()),
                fetch(`${API_URL}/api/TipoEquipo`)
                    .then((response) => response.json()),
                fetch(`${API_URL}/api/SistemaOperativo`)
                    .then((response) => response.json())
            ])
            .then(([procesadores,discoduro,equipos,sistema]) => {
                setProcesadores(procesadores);
                setDisco(discoduro);
                setEquipos(equipos);
                setSistema(sistema)
            })
            .catch((error) => console.error("Error al cargar datos:", error))
            .finally(() => setLoading(false));
        
        }, []);
        
    const navigate = useNavigate();
    
    const usuario = JSON.parse(localStorage.getItem("user"));

    const closeModal = () => {
        modal(false); // Ocultar modal
    };

    let S = false;
    let ssdSize = '';
    let H = false
    let hddSize = '';
    let M = false
    let m2Size = '';
    if(isEdit){

        equipo.almacenamientos.map((alm) =>{
            if(alm.tipo === 'SSD') 
            {
                ssdSize = alm.idCapacidad;  
                S=true
            }
            if(alm.tipo === 'HDD') 
            {
                hddSize = alm.idCapacidad;  
                H=true
            }
            if(alm.tipo === 'M2') 
            {
                m2Size = alm.idCapacidad;  M=true
            }
        })
    }

    return(
        <>
            <div onClick={closeModal} className="fixed inset-0 bg-black opacity-60 z-40" >
            </div>
            <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto">
                <div className="relative p-4 w-full max-w-3xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        {/* Modal header */}
                        <div className=" bg-twoo flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-lg font-semibold text-white">
                            {isEdit ? 'Editar Equipo' : 'Agregar Equipo'}
                        </h3>
                        <button
                            onClick={closeModal}
                            className="text-gray-400 bg-transparent hover:bg-five hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                            >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        </div>
                        <Formik
                            initialValues={{
                                idEquipo: isEdit ? equipo.idEquipo : '',
                                tipoEquipo: isEdit ? equipo.idTipoEquipo : '',
                                marca: isEdit ? equipo.marcaEquipo : '',
                                modelo: isEdit ? equipo.modeloEquipo :'',
                                sistemaOperativo: isEdit ? equipo.idSistemaOperativo : '',
                                noSerie: isEdit ? equipo.nSerie : '',
                                procesador: isEdit ? equipo.idProcesador : '',
                                ram: isEdit ? equipo.ram : '',
                                ssd: isEdit ? S : false,
                                hdd: isEdit ? H : false ,
                                m2: isEdit ? M : false,
                                ssdSize: isEdit ? ssdSize : '',
                                hddSize: isEdit ? hddSize : '',
                                m2Size: isEdit ? m2Size : '',
                                monitor: isEdit ? equipo.monitor : false,
                                marcaMonitor: isEdit ? equipo.marcaMonitor : '',
                                teclado: isEdit ? equipo.teclado : false,
                                marcaTeclado: isEdit ? equipo.marcaTeclado : '',
                                mouse: isEdit ? equipo.mouse : false,
                                marcaMouse: isEdit ? equipo.marcaMouse : '',
                                diadema: isEdit ? equipo.diadema : false,
                                marcaDiadema: isEdit ? equipo.marcaDiadema : '',
                                activofijo: isEdit ? equipo.activoFijo : '',
                                observa: isEdit ? equipo.observaciones : '',
                            }}
                            validate={values => {
                                const errors = {};
                                
                                return errors
                            }}
                            onSubmit={async(values, { setSubmitting}) => {
                                setLoading(true);
                                if(!isEdit){
                                    try {
                                        const response = await axios.post(`${API_URL}/api/Equipos/GuardarEquipo`,{
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
                                            almacenamientos: [
                                                values.ssd && values.ssdSize ? { almacenamientoId: values.ssdSize, tipo: "SSD" } : null,
                                                values.hdd && values.hddSize ? { almacenamientoId: values.hddSize, tipo: "HDD" } : null,
                                                values.m2 && values.m2Size ? { almacenamientoId: values.m2Size, tipo: "M2" } : null,
                                            ].filter(Boolean) // Elimina valores `null`
                                        })
                                        
                                        Swal.fire({
                                            title: "¡Éxito!",
                                            text: response.data.message,
                                            icon: "success",
                                            confirmButtonText: "OK"
                                        }).then(() => {
                                            window.location.reload(); // Recargar la página
                                        });
                                    } catch (error) {
                                         Swal.fire({
                                            title: "Error",
                                            text: "Hubo un error al registrar los datos \n Error: " + error,
                                            icon: "error",
                                            confirmButtonText: "OK"
                                        })
                                    }finally {
                                        setLoading(false);
                                        setSubmitting(false);
                                    }
                                }else{
                                    try {
                                        const response = await axios.patch(`${API_URL}/api/Equipos/EditarEquipo/${values.idEquipo}`,{
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
                                            almacenamientos: [
                                                values.ssd && values.ssdSize ? { almacenamientoId: values.ssdSize, tipo: "SSD" } : null,
                                                values.hdd && values.hddSize ? { almacenamientoId: values.hddSize, tipo: "HDD" } : null,
                                                values.m2 && values.m2Size ? { almacenamientoId: values.m2Size, tipo: "M2" } : null,
                                            ].filter(Boolean) // Elimina valores `null`
                                        })
                                        
                                        Swal.fire({
                                            title: "¡Éxito!",
                                            text: response.data.message,
                                            icon: "success",
                                            confirmButtonText: "OK"
                                        }).then(() => {
                                            window.location.reload(); // Recargar la página
                                        });
                                    } catch (error) {
                                         Swal.fire({
                                            title: "Error",
                                            text: "Hubo un error al registrar los datos",
                                            icon: "error",
                                            confirmButtonText: "OK"
                                        })
                                    }finally {
                                        setLoading(false);
                                        setSubmitting(false);
                                    }
                                }
                            
                            }}>
                            {
                            ({
                                values,
                                errors,
                                handleChange,
                                handleSubmit
                            }) => (
                            <form className="bg-white p-6 shadow-xl rounded-lg" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3">
                                            <div className="space-y-4">
                                                <label htmlFor="tipoEquipo">Tipo de Equipo:</label>
                                                <select  id="tipoEquipo" name="tipoEquipo" value={values.tipoEquipo} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
                                                    <option value="">--- Seleccione una opción ---</option>
                                                    {
                                                        equipos.map((eq) =>{
                                                            return(
                                                                <option key={eq.idTipoEquipo} value={eq.idTipoEquipo}>{eq.tipoEquipo}</option>
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
                                                    <input type="checkbox" name="ssd" checked={values.ssd} onChange={handleChange}/>
                                                    <span>SSD</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input type="checkbox" name="hdd" checked={values.hdd} onChange={handleChange}/>
                                                    <span>HDD</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input type="checkbox" name="m2" checked={values.m2} onChange={handleChange}/>
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
                                                    <input type="checkbox" name="monitor" checked={values.monitor} onChange={handleChange}/>
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
                                                    <input type="checkbox" name="teclado" checked={values.teclado} onChange={handleChange}/>
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
                                                    <input type="checkbox" name="mouse" checked={values.mouse} onChange={handleChange}/>
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
                                                    <input type="checkbox" name="diadema" checked={values.diadema} onChange={handleChange}/>
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
                                </div>
            
                                {/* Botón de envío */}
                                <div className="mt-6">
                                    <button type="submit" className="w-full bg-five hover:bg-four text-white py-2 rounded-md disabled:opacity-50"  >
                                    {isEdit ?  'Editar' : 'Agregar'}
                                    </button>
                                </div>
                            </form>
                            )}
                        </Formik>
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