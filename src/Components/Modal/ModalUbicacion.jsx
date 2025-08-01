import {React,useState, useEffect, useMemo} from "react";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import axios from "axios";

export default function ModalAddArea({modal, ubicacion,isEdit, onRefresh={onRefresh}}){
    
        const API_URL = import.meta.env.VITE_API_URL;
        
        const [loading, setLoading] = useState(false);
    
        const usuario = JSON.parse(localStorage.getItem("usuario"));
    
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
                                {isEdit ? 'Editar Ubicacion': 'Agregar Ubicacion'}
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
                                idUbicacion: isEdit ? ubicacion.idUbicacion : '',
                                ubicacion: isEdit ? ubicacion.ubicacion : '',
                            }}
                            validate={values => {
                                const errors = {};
                                
                                return errors
                            }}
                            onSubmit={async(values, { setSubmitting}) => {
                                console.log(values)
                                setLoading(true)
    
                                if(!isEdit){
                                    try {
                                        const response = await axios.post(`${API_URL}/api/Ubicaciones/GuardarUbicacion`,{
                                            Ubicacion: values.ubicacion,
                                        });
                                        Swal.fire({
                                            title: "¡Éxito!",
                                            text: "¡Se guardo la ubicación con exito!",
                                            icon: "success",
                                            confirmButtonText: "OK"
                                        }).then(async() => {
                                            await onRefresh()
                                            closeModal()
                                        });
                                    } catch (error) {
                                        Swal.fire({
                                            title: "Error",
                                            text: "Hubo un error al registrar los datos",
                                            icon: "error",
                                            confirmButtonText: "OK"
                                        });
                                    }finally{
                                        setLoading(false)
                                    }
                                }else{
                                    try {
                                        const response = await axios.patch(`${API_URL}/api/Ubicaciones/EditarUbicacion/${values.idUbicacion}`,{
                                            Ubicacion: values.ubicacion,
                                        })
                                        
                                        Swal.fire({
                                            title: "¡Éxito!",
                                            text: response.data.message,
                                            icon: "success",
                                            confirmButtonText: "OK"
                                        }).then(async() => {
                                            await onRefresh()
                                            closeModal()
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
                                    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-xl rounded-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                        <label htmlFor="ubicacion">Ubicación:</label>
                                        <input type="text" id="ubicacion" name="ubicacion" value={values.ubicacion} onChange={handleChange} className="w-full p-2 border rounded-md"/>
                                    </div>
                                    <div className="mt-6">
                                        <button type="submit" className="w-full bg-five hover:bg-four text-white py-2 rounded-md disabled:opacity-50"  >
                                            {isEdit ? 'Editar' : 'Crear'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            {loading && (
            <Loader/>
            )}
            </>
        )
}