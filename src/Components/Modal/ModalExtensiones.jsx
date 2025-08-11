import {React,useState, useEffect} from "react";
import { Formik } from "formik";
import Swal from "sweetalert2";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ModalExtensiones({modal, extension,isEdit}){

    const API_URL = import.meta.env.VITE_API_URL;
    
    const [loading, setLoading] = useState(false);
    const [colaboradores,setColaboradores] = useState([]);

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    useEffect(() => {
        setLoading(true);
        
        if(isEdit){
            Promise.all([
                fetch(`${API_URL}/api/Extension/ColaboradoresEditarExt/${extension.idExtension}`)
                    .then((response) => response.json()),
            ])
            .then(([colaboradores]) => {
                setColaboradores(colaboradores);
            })
            .catch((error) => console.error("Error al cargar datos:", error))
            .finally(() => setLoading(false));
        }else{
            Promise.all([
                fetch(`${API_URL}/api/Extension/ColaboradorSinExtension`)
                    .then((response) => response.json()),
            ])
            .then(([colaboradores]) => {
                setColaboradores(colaboradores);
            })
            .catch((error) => console.error("Error al cargar datos:", error))
            .finally(() => setLoading(false));
        }
    
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
                            {isEdit ? 'Editar Extensión': 'Agregar Extensión'}
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
                            idExtension: isEdit ? extension.idExtension : '',
                            colaboradorid: isEdit ? extension.colaboradorId : '',
                            extension: isEdit ? extension.extension : '',
                            telefono: isEdit ? extension.telefono : '',
                        }}
                        validate={values => {
                            const errors = {};
                            
                            return errors
                        }}
                        onSubmit={async(values, { setSubmitting}) => {
                            setLoading(true)

                            if(!isEdit){
                                try {
                                    const response = await axios.post(`${API_URL}/api/Extension/GuardarExtension`,{
                                        Extension: values.extension,
                                        Telefono: values.telefono,
                                        ColaboradorId: values.colaboradorid
                                    });
                                    Swal.fire({
                                        title: "¡Éxito!",
                                        text: "¡Se guardo la extensión con exito!",
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
                                    });
                                }
                            }else{
                                try {
                                    const response = await axios.patch(`${API_URL}/api/Extension/EditarExtension/${values.idExtension}`,{
                                        Extension: values.extension,
                                        Telefono: values.telefono,
                                        ColaboradorId: values.colaboradorid
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
                                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-xl rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                    <label htmlFor="colaboradorid">Colaborador:</label>
                                    <select id="colaboradorid" name="colaboradorid" value={values.colaboradorid} onChange={handleChange} className="w-full p-2 border rounded-md bg-white" >
                                        <option value="">--- Seleccione una opción ---</option>
                                        {
                                            colaboradores.map((cola) =>{
                                                return(
                                                    <option key={cola.idColaborador} value={cola.idColaborador}>{cola.nombreColaborador + ' ' + cola.apellidoColaborador}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor="telefono">Telefono:</label>
                                    <input type="tel" id="telefono" name="telefono" value={values.telefono} onChange={handleChange} className="w-full p-2 border rounded-md"/>
                                    <label htmlFor="extension">Extensión:</label>
                                    <input type="text" id="extension" name="extension" value={values.extension} onChange={handleChange} className="w-full p-2 border rounded-md"/>
                                </div>
                                <div className="mt-6">
                                    <button type="submit" className="w-full bg-five hover:bg-four text-white py-2 rounded-md disabled:opacity-50"  >
                                        Crear
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