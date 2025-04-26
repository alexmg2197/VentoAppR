import { useState, useEffect } from "react";
import { Formik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { generarPDFPrestamo } from "../PDFS/generarPDFPrestamo";

export default function ModalPrestamoEquipo({modal}) {

    const API_URL = import.meta.env.VITE_API_URL;

    const [colaboradores, setColaboradores] = useState([]);
    const [equiposDisponibles, setEquiposDisponibles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const fetchColaboradores = fetch(`${API_URL}/api/Colaboradores`)
            .then((response) => response.json())
            .then((data) =>  setColaboradores(data));

        const fetchEquiposDisponibles = fetch(`${API_URL}/api/Equipos/EquiposDisponibles`)
            .then((response) => response.json())
            .then((data) =>  setEquiposDisponibles(data));

        Promise.all([fetchColaboradores, fetchEquiposDisponibles])
        .catch((error) => console.error("Error al cargar datos:", error))
        .finally(() => {setLoading(false)});
    }, []);

    const closeModal = () => {
        modal(false); // Ocultar modal
    };

    return(
        <>
            <div onClick={closeModal} className="fixed inset-0 bg-black opacity-60 z-40">
            </div>
            <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto">
                <div className="relative p-4 w-full max-w-3xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <div className="bg-twoo flex items-center justify-between p-4 border-b rounded-t border-gray-200">
                            <h3 className="text-lg font-semibold text-white">
                                Prestamo de Equipo
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
                                colaboradorId:'',
                                equipos:''
                            }}
                            validate={values => {
                                const errors = {};

                                return errors
                            }}
                            onSubmit={async (values, {setSubmitting}) =>{
                                setLoading(true)
                                 try {
                                    const response = await axios.patch(`${API_URL}/api/Responsivas/PrestamoEquipo`,{
                                        colaboradorId: values.colaboradorId,
                                        equipoId: values.equipos,
                                    })
                                    Swal.fire({
                                        title: "¡Éxito!",
                                        text: "Prestamo realizado",
                                        icon: "success",
                                        confirmButtonText: "OK"
                                    }).then(async () => {
                                        console.log(response.data)
                                        let resp = response.data
                                        await generarPDFPrestamo(resp,false);
                                        console.log(resp)
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

                            }}>
                                {
                                    ({
                                        values,
                                        errors,
                                        handleChange,
                                        handleSubmit
                                    }) =>(
                                        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-xl rounded-lg items-center justify-center">
                                            <div className="flex flex-col  gap-3">
                                                <label htmlFor="colaboradores">Colaboradores:</label>
                                                <select id="colaboradorId" name="colaboradorId" value={values.colaboradorId} onChange={handleChange} className="w-full p-2 border rounded-md bg-white" >
                                                    <option value=""> --- Seleccione una opción ---</option>
                                                    {
                                                        colaboradores.map((cola) =>{
                                                            return(
                                                                <option key={cola.idColaborador} value={cola.idColaborador}>{cola.nombreColaborador + ' ' + cola.apellidoColaborador}</option>
                                                            )
                                                            
                                                        })
                                                    }
                                                </select>
                                                <label htmlFor="equipos">Equipos Disponibles:</label>
                                                <select id="equipos" name="equipos" value={values.equipos} onChange={handleChange} className="w-full p-2 border rounded-md bg-white" >
                                                    <option value=""> --- Seleccione una opción ---</option>
                                                    {
                                                        equiposDisponibles.map((eqd) =>{
                                                            console.log(eqd.c_Tipo_Equipo.tipoEquipo === 'Laptop' ? 'nerie' : 'vna')
                                                            return(
                                                                <option key={eqd.idEquipo} value={eqd.idEquipo}>{eqd.c_Tipo_Equipo.tipoEquipo === 'Laptop' ? eqd.nSerie :eqd.activoFijo}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="mt-6">
                                                <button type="submit" className="w-full bg-five hover:bg-four text-white py-2 rounded-md disabled:opacity-50"  >
                                                    Asignar
                                                </button>
                                        </div>
                                        </form>
                                )}
                        </Formik>
                    </div>
                </div>
            </div>
            {loading && (
            <div className="fixed inset-0 bg-black opacity-50 flex justify-center items-center z-50">
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