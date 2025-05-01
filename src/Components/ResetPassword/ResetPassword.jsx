import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Formik, ErrorMessage  } from 'formik';
import Fondo from '../../assets/fondo-vento.webp';
import Logo from '../../assets/ventologoN.svg';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ResetPasword(){

    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

  
    return(
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage:`url(${Fondo})` }}>
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm sm:max-w-md">
                <div className="text-center">
                    <img alt="Vento" src={Logo} className="mx-auto h-12 w-auto" />
                    {success ? (<></>) : (<h2 className="mt-4 text-2xl font-bold text-gray-900">Cambiar Contraseña</h2>)}
                </div>
                {success ? (
                        <div className="text-center pt-4">
                          <p className="text-green-600 mb-4">🎉 Tu contraseña ha sido cambiada exitosamente. Favor de cerrar la ventana.</p>
                        </div>
                    ):(
                    <Formik
                    initialValues={{ password : '', confirmPassword : '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.password) {
                            errors.password = 'La contraseña es requerida';
                          } else if (values.password.length < 8) {
                            errors.password = 'Debe tener al menos 8 caracteres';
                          } else if (!/[A-Z]/.test(values.password)) {
                            errors.password = 'Debe contener al menos una letra mayúscula';
                          } else if (!/[a-z]/.test(values.password)) {
                            errors.password = 'Debe contener al menos una letra minúscula';
                          } else if (!/[0-9]/.test(values.password)) {
                            errors.password = 'Debe contener al menos un número';
                          } else if (!/[\W_]/.test(values.password)) {
                            errors.password = 'Debe contener al menos un carácter especial';
                          }
                      
                          if (!values.confirmPassword) {
                            errors.confirmPassword = 'Debes confirmar tu contraseña';
                          } else if (values.password !== values.confirmPassword) {
                            errors.confirmPassword = 'Las contraseñas no coinciden';
                            errors.password = 'Las contraseñas no coinciden';
                          }
                        return errors
                    }}
                    onSubmit={async(values, { setSubmitting,resetForm  }) => {
                        setLoading(true);
                        try {
                            const response = await axios.post(`${API_URL}/api/Account/ResetPassword`, {
                                NewPassword: values.password,
                                Token: token
                            });
                            Swal.fire({
                                title: "Contraseña Cambiada",
                                text: response.data,
                                icon: "success",
                                draggable: true
                              }).then((result) => {
                                if(result){
                                    setSuccess(true);
                                }
                              });
                        } catch (error) {
                            Swal.fire({ title: "El token ha caducado", icon: "error", draggable: true });
                        }finally{
                            setLoading(false);
                            setSubmitting(false)
                        }
                    }}
                    >
                {({ values, handleChange, handleSubmit,errors, touched  }) => (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">Contraseña Nueva:</label>
                            <input
                            id="password"
                            name="password"
                            type="password"
                            value={values.usuario}
                            onChange={handleChange}
                            
                            className={`w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password && touched.password
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-indigo-500'}`}
                            />
                            {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
                        </div>

                        <div>
                            <div className="flex justify-between">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirmar Contraseña:</label>
                            </div>
                            <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            
                            className={`w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500  ${errors.confirmPassword && touched.confirmPassword
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-indigo-500'}`}
                            />
                            {errors.confirmPassword && touched.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-500 transition duration-200"
                        >
                            Cambiar Contraseña
                        </button>
                        </form>
                    )}
                </Formik>
                )}
      </div>

      {/* Loader */}
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