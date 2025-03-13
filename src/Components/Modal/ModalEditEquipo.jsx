import {React, useState, useEffect } from "react";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ModalEditEquipo({modal,equipo}){

    const [loading, setLoading] = useState(false);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [procesadores, setProcesadores] = useState([]);
    const [sistemao, setSistemao] = useState([]);
    const [discoduro, setDiscoDuro] = useState([]);
    const [equipos, setEquipo] = useState([]);
    const [conexion, setConexion] = useState([]);

    useEffect(() => {
            setLoading(true);
        
            Promise.all([
                fetch('https://script.google.com/macros/s/AKfycbxIF5bPo7OvOgPCQCtrdal4xBwh3P-Q4dPageTLZ1GtkIQz9tAL9fkI-ksEqUxqe_ud/exec')
                    .then((response) => response.json()),
                fetch('https://script.google.com/macros/s/AKfycby0xvLsCNoeli0AeoydxxKUEGxunatr8N7XfXwth6PbTkToI6khEjEN0tYO2RY_mtZD/exec')
                    .then((response) => response.json()),
                fetch('https://script.google.com/macros/s/AKfycbyXmX6uaggJXpxrGeGMdgHY0tEqxILTi_8melx5vSC80ij7ywFW9G0-4ZnFcXXjM4jA/exec')
                    .then((response) => response.json()),
                fetch('https://script.google.com/macros/s/AKfycbwJw0AQsZHLcuzvFd5r3dpbpNTxHDpH-NKuYP1P5iExxCux-61rp1AOcvEELqDJKdTW/exec')
                    .then((response) => response.json()),
                fetch('https://script.google.com/macros/s/AKfycbzfBN92rs1jcaEC8L0ODkfD0h0mCUZwGU9Qdu8BdZk-WWuNIgFtxdCUC0vNcsrsK8RJ/exec')
                    .then((response) => response.json()),
                fetch('https://script.google.com/macros/s/AKfycbwvcqLWis-m6vhe04kk-pABFis9eg-jBrtd_fs3tc9eOUVxx9KyVA8YBW-6RMG-WuN9/exec')
                    .then((response) => response.json()),
                fetch('https://script.google.com/macros/s/AKfycbz5qNIGwQrYVcOUpvOR1jtM-XCruAVUKJW9SvVkSS50u8d8UmDSP-z59eNsXlcCxUuv/exec')
                    .then((response) => response.json())
            ])
            .then(([ubicaciones, departamentos,procesadores,sistemao,discoduro,equipo,conexion]) => {
                setUbicaciones(ubicaciones);
                setDepartamentos(departamentos);
                setProcesadores(procesadores);
                setSistemao(sistemao);
                setDiscoDuro(discoduro);
                setEquipo(equipo);
                setConexion(conexion);
            })
            .catch((error) => console.error("Error al cargar datos:", error))
            .finally(() => setLoading(false));
        
        }, []);
        
    const navigate = useNavigate();
    
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const closeModal = () => {
        modal(false); // Ocultar modal
    };

    const tipoAlmacenamiento = equipo.tipoAlmacenamiento.split('/').map(item => item.trim());
    const almacenamiento = equipo.almacenamiento.split('/').map(item => item.trim());

    let ssdSize = '';
    let hddSize = '';
    let m2Size = '';

    // Asigna los valores en orden según los tipos de almacenamiento
    switch (tipoAlmacenamiento.length) {
        case 1:
            if (tipoAlmacenamiento[0] === 'SSD') ssdSize = almacenamiento[0];
            else if (tipoAlmacenamiento[0] === 'HDD') hddSize = almacenamiento[0];
            else if (tipoAlmacenamiento[0] === 'M2') m2Size = almacenamiento[0];
            break;

        case 2:
            tipoAlmacenamiento.forEach((tipo, index) => {
                if (tipo === 'SSD') ssdSize = almacenamiento[index];
                else if (tipo === 'HDD') hddSize = almacenamiento[index];
                else if (tipo === 'M2') m2Size = almacenamiento[index];
            });
            break;

        case 3:
            tipoAlmacenamiento.forEach((tipo, index) => {
                if (tipo === 'SSD') ssdSize = almacenamiento[index];
                else if (tipo === 'HDD') hddSize = almacenamiento[index];
                else if (tipo === 'M2') m2Size = almacenamiento[index];
            });
            break;

        default:
            console.warn('Formato de almacenamiento desconocido');
    }

    return(
        <>
            <div onClick={closeModal} className="fixed inset-0 bg-black opacity-60 z-40" >
            </div>
            <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto">
                <div className="relative p-4 w-full max-w-5xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        {/* Modal header */}
                        <div className=" bg-twoo flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-lg font-semibold text-white">
                            Editar Equipo
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
                        id:equipo.ID,
                        //USUARIO
                        usuario: equipo.usuario,
                        puesto: equipo.puesto,
                        departamento: equipo.departamento,
                        area: equipo.area,
                        ubicacion: equipo.ubicacion,
                        //EQUIPO
                        equipo:equipo.equipo,
                        marca:equipo.marca,
                        modelo:equipo.modelo,
                        noSerie: equipo.noSerie,
                        procesador: equipo.procesador,
                        ram: equipo.ram,
                        ssd:((equipo.tipoAlmacenamiento === 'SSD/HDD/M2' || equipo.tipoAlmacenamiento === 'SSD/HDD' || equipo.tipoAlmacenamiento === 'SSD/M2' || equipo.tipoAlmacenamiento === 'SSD')? true :''),
                        hdd:((equipo.tipoAlmacenamiento === 'SSD/HDD/M2' || equipo.tipoAlmacenamiento === 'SSD/HDD' || equipo.tipoAlmacenamiento === 'HDD/M2' || equipo.tipoAlmacenamiento === 'HDD')? true :''),
                        m2:((equipo.tipoAlmacenamiento === 'SSD/HDD/M2' || equipo.tipoAlmacenamiento === 'HDD/M2' || equipo.tipoAlmacenamiento === 'SSD/M2' || equipo.tipoAlmacenamiento === 'M2')? true :''),
                        ssdSize:ssdSize,
                        hddSize:hddSize,
                        m2Size:m2Size,
                        sistemaOperativo: equipo.sistemaOperativo,
                        tipoconexion:equipo.tipoconexion,
                        activofijo: equipo.activofijo,
                        //CORREO
                        correo:equipo.correo,
                        contrasena:equipo.contrasena,
                    }}
                    validate={values => {
                        const errors = {};
                        
                        return errors
                    }}
                    onSubmit={(values, { setSubmitting}) => {
                        console.log(values)
                        setLoading(true);
                        const datos = {
                            ID: values.id,  // El nombre de la propiedad debe coincidir con lo que espera Google Apps Script (por ejemplo, 'ID', no 'id')
                            Usuario: values.usuario,
                            Puesto: values.puesto,
                            Departamento: values.departamento,
                            Area: values.area,  // Asegúrate de que la capitalización coincida con lo esperado en el código de Google
                            Ubicacion: values.ubicacion,
                            Equipo: values.equipo,
                            SistemaOperativo: values.sistemaOperativo,
                            Marca: values.marca,
                            Modelo: values.modelo,
                            NumeroSerie: values.noSerie,
                            Procesador: values.procesador,
                            RAM: values.ram,
                            TipoAlmacenamiento: ((values.ssd && values.hdd && values.m2) ? ('SSD/HDD/M2') : ((values.ssd && values.hdd && !values.m2) ? ('SSD/HDD'):((values.ssd && !values.hdd && values.m2)?('SSD/M2'):((!values.ssd && values.hdd && values.m2)?('HDD/M2'):((values.ssd && !values.hdd && !values.m2)?('SSD'):((!values.ssd && values.hdd && !values.m2)?('HDD'):((!values.ssd && !values.hdd && values.m2)?('M2'):''))))))),
                            Almacenamiento: ((values.ssd && values.hdd && values.m2) ? (values.ssdSize+'/'+values.hddSize+'/'+values.m2Size) : ((values.ssd && values.hdd && !values.m2) ? (values.ssdSize+'/'+values.hddSize):((values.ssd && !values.hdd && values.m2)?(values.ssdSize+'/'+values.m2Size):((!values.ssd && values.hdd && values.m2)?(values.hddSize+'/'+values.m2Size):((values.ssd && !values.hdd && !values.m2)?(values.ssdSize):((!values.ssd && values.hdd && !values.m2)?(values.hddSize):((!values.ssd && !values.hdd && values.m2)?(values.m2Size):''))))))),
                            SistemaOperativo: values.sistemaOperativo,
                            TipoConexion: values.tipoconexion,
                            Correo: values.correo,
                            Contraseña: values.contrasena,
                            ActivoFijo: values.activofijo,
                            Realizo: usuario.nombre,
                            };
                            
                        
                        fetch("https://script.google.com/macros/s/AKfycbyz74thvDlQI4G9l9HuFLOMzHxQhdAUZ26gRUE0mXWLXUd2yQ-caymENF2Dw48GdyuL/exec", {
                            method: "POST",
                            body: JSON.stringify(datos), // Enviar los valores del formulario
                            headers: {
                                "Content-Type": "text/plain;charset=utf-8",
                            },
                        })
                            .then(response => response.text())
                            .then(async (result) => {
                                setLoading(false);
                                    Swal.fire({
                                    title: "Datos guardados correctamente",
                                    icon: "success",
                                    draggable: true
                                    }).then(async (result)=>{
                                    if(result.isConfirmed)
                                    {
                                    window.location.reload();
                                        
                                    }
                                    });
                            })
                            .catch(error => {
                            console.error("Error:", error);
                            Swal.fire({
                                title: "Error al guardar los datos",
                                icon: "error",
                                draggable: true
                                });
                            });
                    }}>
                        {
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
                                    <h3 className="text-lg font-semibold mb-2">Datos del responsable del equipo</h3>
                                    <div className="space-y-4">
                                        <label htmlFor="usuario">Usuario:</label>
                                        <input type="text" id="usuario" name="usuario" value={values.usuario} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                        <label htmlFor="puesto">Puesto:</label>
                                        <input type="text" id="puesto" name="puesto" value={values.puesto} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                        <label htmlFor="departamento">Departamento:</label>
                                        <select id="departamento" name="departamento" value={values.departamento} onChange={handleChange} className="w-full p-2 border rounded-md bg-white" >
                                            <option value=""> --- Seleccione una opción ---</option>
                                            {
                                                departamentos.map((depa) =>{
                                                    return(
                                                        <option key={depa.name} value={depa.name}>{depa.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label htmlFor="area">Area:</label>
                                        <input type="text" id="area" name="area" value={values.area} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                        <label htmlFor="departamento">Ubicación:</label>
                                        <select id="ubicacion" name="ubicacion" value={values.ubicacion} onChange={handleChange} className="w-full p-2 border rounded-md bg-white" >
                                            <option value=""> --- Seleccione una opción ---</option>
                                            {
                                                ubicaciones.map((ubicacion) =>{
                                                    return(
                                                        <option key={ubicacion.name} value={ubicacion.name}>{ubicacion.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
        
                                    </div>
                                </div>
        
                            {/* Sección 2 */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Datos del Equipo</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3">
                                        <div className="space-y-4">
                                            <label htmlFor="equipo">Equipo:</label>
                                            <select  id="equipo" name="equipo" value={values.equipo} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
                                                <option value="">--- Seleccione una opción ---</option>
                                                {
                                                    equipos.map((sistema) =>{
                                                        return(
                                                            <option key={sistema.name} value={sistema.name}>{sistema.name}</option>
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
                                            <label htmlFor="procesador">Procesador:</label>
                                            <select id="procesador" name="procesador" value={values.procesador} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
                                                <option value="">--- Selecciona una opción ---</option>
                                                {
                                                    procesadores.map((procesador) =>{
                                                        return(
                                                            <option key={procesador.name} value={procesador.name}>{procesador.name}</option>
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
                                            <label htmlFor="sistemaOperativo">Sistema Operativo:</label>
                                            <select  id="sistemaOperativo" name="sistemaOperativo" value={values.sistemaOperativo} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
                                                <option value="">Sistema Operativo</option>
                                                {
                                                    sistemao.map((sistema) =>{
                                                        return(
                                                            <option key={sistema.name} value={sistema.name}>{sistema.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="space-y-4">
                                            <label htmlFor="tipoconexion">Tipo de Conexion:</label>
                                            <select name="tipoconexion" id="tipoconexion" value={values.tipoconexion} onChange={handleChange} className="w-full p-2 border rounded-md">
                                                <option value=""> --- Seleccione una opción ---</option>
                                                {
                                                    conexion.map((conexion) =>{
                                                        return(
                                                            <option key={conexion.name} value={conexion.name}>{conexion.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="space-y-4">
                                            <label htmlFor="activofijo">Placa Activo:</label>
                                            <input type="text" id="activofijo" name="activofijo" value={values.activofijo} onChange={handleChange} placeholder="Placa Activo" className="w-full p-2 border rounded-md" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-2">
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
                                                        discoduro.map((disco) =>{
                                                            return(
                                                                <option key={disco.name} value={disco.name}>{disco.name}</option>
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
                                                        discoduro.map((disco) =>{
                                                            return(
                                                                <option key={disco.name} value={disco.name}>{disco.name}</option>
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
                                                        discoduro.map((disco) =>{
                                                            return(
                                                                <option key={disco.name} value={disco.name}>{disco.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            {/* Sección 3 */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Correo Electronico</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                        <label htmlFor="correo">Correo:</label>
                                        <input type="email" id="correo" name="correo" value={values.correo} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                        <label htmlFor="contrasena">Contraseña:</label>
                                        <input type="text" id="contrasena" name="contrasena" value={values.contrasena} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                        
                                    </div>
                                </div>
                            </div>
        
                            {/* Botón de envío */}
                            <div className="mt-6">
                                <button type="submit" className="w-full bg-five hover:bg-four text-white py-2 rounded-md disabled:opacity-50"  >
                                    Editar
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