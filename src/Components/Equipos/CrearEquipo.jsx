import { Formik } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CrearEquipo(){

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const [loading, setLoading] = useState(false);

    const Procesador = [
        {name:'Core i3'},{name:'Core i5'},{name:'Core i7'},{name:'Core i9'}
    ]
    
    const Sistema = [
        {name:'Windows 7'},{name:'Windows 100'},{name:'Windows 11'}
    ]

    const Disco = [
        {name:'128 GB'},{name:'254 GB'},{name:'500 GB'},{name:'1 TB'}
    ]

    const Equipo =[
        {name:'ENSAMBLE'}, {name:'LAPTOP'}
    ]

    const Conexion = [
        {name:'WI-FI'}, {name:'CABLE'},{name:'SIN CONEXION'}
    ]

    const Ubicacion = [
        {name:'Lerma'},{name:'Santin'},{name:'Chapultepec'},{name:'Duero'},{name:'Militares'}
    ]

    const Departamento = [
        {name:'Sistemas'},{name:'Enfermeria'},{name:'Nominas'},{name:'Calidad'},{name:'Logistica'},{name:'Ingenieria de Procesos'}
    ]

    return(
        <div className="container mx-auto p-6">
            <div className="bg-three text-white text-center py-3 rounded-t-xl">
                <h2 className="text-2xl font-bold text-center mb-4">Equipos de Computo</h2>
            </div>
            <Formik
                initialValues={{
                    //USUARIO
                    usuario: '',
                    puesto: '',
                    departamento: '',
                    area: '',
                    ubicacion: '',
                    //EQUIPO
                    equipo:'',
                    marca:'',
                    modelo:'',
                    noSerie: '',
                    procesador: '',
                    ram: '',
                    ssd:false,
                    hdd:false,
                    m2:false,
                    ssdSize:'',
                    hddSize:'',
                    m2Size:'',
                    sistemaOperativo: '',
                    tipoconexion:'',
                    activofijo: '',
                    //CORREO
                    correo:'',
                    contrasena:'',
                }}
                validate={values => {
                    const errors = {};
                    
                    return errors
                }}
                onSubmit={(values, { setSubmitting}) => {

                    console.log(((values.ssd && values.hdd && values.m2) ? ('SSD/HDD/M2') : ((values.ssd && values.hdd && !values.m2) ? ('SSD/HDD'):((values.ssd && !values.hdd && values.m2)?('SSD/M2'):((!values.ssd && values.hdd && values.m2)?('HDD/M2'):((values.ssd && !values.hdd && !values.m2)?('SSD'):((!values.ssd && values.hdd && !values.m2)?('HDD'):((!values.ssd && !values.hdd && values.m2)?('M2'):''))))))))
                    setLoading(true);
                    fetch("https://script.google.com/macros/s/AKfycbxDvXgzwVK7mOeJDTMNAtxzvErjLy-km6DKuhd_zFZMGjykaKSKyhOZam4D6lX0J6iVow/exec")
                    .then(response => response.text())
                    .then(data => {
                        console.log(data)
                        console.log(values)
                            // Asegurarnos de que 'data' sea un número
                            let id = parseInt(data, 10);  // Convertimos el ID a un número, base 10
                            if (isNaN(id)) {
                                id = 0;  // Si 'data' no es un número válido, inicializamos 'id' en 0
                            }
                            
                            id = id + 1;  // Sumamos 1 para obtener el nuevo ID
                        console.log(values)
                        let valores = {
                            ID: id,  // El nombre de la propiedad debe coincidir con lo que espera Google Apps Script (por ejemplo, 'ID', no 'id')
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
                            Activo: 1,
                            Realizo: usuario.nombre,
                                }
                                console.log(id)
                                console.log(valores)
                            // Enviar datos a Google Sheets usando fetch
                            fetch("https://script.google.com/macros/s/AKfycby3Mx0If0BKL99BABp19wM947PoP1OilUHMc5ZhzL-Pjk-Ucd9DOdxPtshdF1X-Be49mA/exec", {
                                method: "POST",
                                body: JSON.stringify(valores), // Enviar los valores del formulario
                                headers: {
                                    "Content-Type": "text/plain;charset=utf-8",
                                },
                            })
                                .then(response => response.text())
                                .then(result => {
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
                                // alert("Datos guardados correctamente en Google Sheets.");
                                })
                                .catch(error => {
                                console.error("Error:", error);
                                Swal.fire({
                                    title: "Error al guardar los datos",
                                    icon: "error",
                                    draggable: true
                                    });
                                    
                                });
                    })
                    
                    
                    setSubmitting(false);
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
                                        Departamento.map((depa) =>{
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
                                        Ubicacion.map((ubicacion) =>{
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
                                            Equipo.map((sistema) =>{
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
                                            Procesador.map((procesador) =>{
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
                                            Sistema.map((sistema) =>{
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
                                            Conexion.map((conexion) =>{
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
                                        <input type="checkbox" name="ssd" value={values.ssd} onChange={handleChange}/>
                                        <span>SSD</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" name="hdd" value={values.ssd} onChange={handleChange}/>
                                        <span>HDD</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" name="m2" value={values.ssd} onChange={handleChange}/>
                                        <span>M2</span>
                                    </label>
                                </div>
                                <div className="space-y-3">
                                    {values.ssd && (
                                    <>
                                        <select name="ssdSize" id="ssdSize" value={values.ssdSize} onChange={handleChange} className="w-full p-2 border rounded-md">
                                            <option value=""> --- SSD ---</option>
                                            {
                                                Disco.map((disco) =>{
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
                                                Disco.map((disco) =>{
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
                                                Disco.map((disco) =>{
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