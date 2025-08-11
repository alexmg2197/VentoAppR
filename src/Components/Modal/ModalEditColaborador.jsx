import {React,useState, useEffect} from "react";
import { Formik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";

export default function ModalEditColaborador({modal, colaborador}){

    const API_URL = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(false);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
                setLoading(true);
        
                const fetchUbicaciones = fetch(`${API_URL}/api/Ubicaciones`)
                    .then((response) => response.json())
                    .then((data) =>  setUbicaciones(data));

                const fetchDepartamentos = fetch(`${API_URL}/api/Areas`,
                    {
                headers: {
                        Authorization: `Bearer ${token}`,
                    }
            }
                )
                    .then((response) => response.json())
                    .then((data) =>  setDepartamentos(data));
        
                Promise.all([fetchUbicaciones, fetchDepartamentos])
                .catch((error) => console.error("Error al cargar datos:", error))
                .finally(() => {setLoading(false)});
            }, []);

    const closeModal = () => {
        modal(false); // Ocultar modal
    };

    return(
        <>
            <div onClick={closeModal} className="fixed inset-0 bg-black opacity-60 z-40" >
            </div>
            <div className="fixed inset-0 z-50 flex justify-center items-center overlow-y-auto">
                <div className="relative p-4 w-full max-w-3xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm">
                        <div className="bg-twoo flex items-center justify-between p-4 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-white">
                                Editar Colaborador
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-five hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
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
                                idColaborador:colaborador.idColaborador,
                                nombreColaborador: colaborador.nombreColaborador,
                                apellidosColaborador:colaborador.apellidoColaborador,
                                puesto: colaborador.puesto,
                                area: colaborador.areaId,
                                ubicacion: colaborador.ubicacionId,
                            }}
                            validate={values => {
                                const errors = {};
                                
                                return errors
                            }}
                            enableReinitialize={true}
                            onSubmit={(values, { setSubmitting}) => {
                                setLoading(true)

                               try {
                                axios.patch(`${API_URL}/api/Colaboradores/EditarColaborador/${values.idColaborador}`,{
                                    nombreColaborador: values.nombreColaborador,
                                    apellidoColaborador: values.apellidosColaborador,
                                    puesto: values.puesto,
                                    areaId: values.area,
                                    ubicacionId: values.ubicacion,
                                })
                                Swal.fire({
                                        title: "¡Éxito!",
                                        text: "Colaborador guardado correctamente.",
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
                               } finally {
                                setLoading(false);
                                setSubmitting(false);
                            }
                            }}>
                                {
                                ({
                                    values,
                                    errors,
                                    handleChange,
                                    handleSubmit,
                                    setFieldValue
                                }) => {
                                     // Cuando cambie el área, actualizamos la ubicación en Formik
                                        useEffect(() => {
                                        const areaSeleccionada = departamentos.find((d) => d.idArea === values.area);
                                        if (areaSeleccionada) {
                                            // Actualiza la ubicación en Formik
                                            setFieldValue("ubicacion", areaSeleccionada.ubicacionId || "");
                                        } else {
                                            setFieldValue("ubicacion", "");
                                        }
                                        }, [values.area, departamentos, setFieldValue]);
                                    return(
                                    <form className="bg-white p-6 shadow-xl rounded-lg" onSubmit={handleSubmit}>
                                        <div className="flex flex-col items-center">
                                        {/* Sección 1 */}
                                            <div className="grid grid-cols-1 md:grid-cols-1 gap-3 w-full max-w-2xl">
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
                                                <select id="ubicacion" disabled name="ubicacion" value={values.ubicacion} onChange={handleChange} className="w-full p-2 border rounded-md bg-white" >
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
                                        </div>

                                        {/* Botón de envío */}
                                        <div className="mt-6">
                                            <button type="submit" className="w-full bg-five hover:bg-four text-white py-2 rounded-md disabled:opacity-50"  >
                                                Crear
                                            </button>
                                        </div>
                                    </form>
                            )}}
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