import { Formik } from "formik";
import { useState } from "react";
import Logo from '../../assets/ventologoN.svg'
import Swal from "sweetalert2";
import axios from "axios";

export default function ModalPassword({modal}){

    const API_URL = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(false);

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
                            <div className="flex items-center justify-center">
                                <img src={Logo} alt="Logo Vento" className="h-1/3 w-1/3 pt-5"/>
                            </div>
                            <div className="flex items-center justify-center pt-5 pb-5">
                                <h2 className="text-4xl">¿Olvidaste tu contraseña?</h2>
                            </div>
                            <div className="flex items-center justify-center">
                                <p className="pl-10 pr-10">Por favor, ingrese el correo con el cual se registro</p>
                            </div>
                            <Formik
                                initialValues={{
                                    correo:'',
                                }}
                                validate={values => {
                                    const errors = {};
                                    
                                    return errors
                                }}
                                onSubmit={async(values, { setSubmitting}) => {
                                    setLoading(true)
                                    try {
                                        const response = await axios.post(`${API_URL}/api/Account/ForgotPassword`,{
                                            Email: values.correo
                                        });
                                        Swal.fire({ 
                                            title:"Correcto",
                                            text:response.data.message, 
                                            icon: "success", 
                                            draggable: true });
                                            closeModal()
                                    } catch (error) {
                                        Swal.fire({
                                            title: "Error",
                                            text: "El correo no esta registrado con ningun usuario. Favor de comunicarse con el administrador.",
                                            icon: "error"
                                          });
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
                                            <label htmlFor="correo">Ingrese Correo Electronico:</label>
                                            <input type="text" id="correo" name="correo" value={values.correo} onChange={handleChange} className="w-full p-2 border rounded-md"/>
                                            
                                        </div>
                                        <div className="mt-6">
                                            <button type="submit" className="w-full bg-five hover:bg-four text-white py-2 rounded-md disabled:opacity-50"  >
                                                Enviar
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