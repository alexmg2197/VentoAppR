import {React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from 'formik'
import Swal from 'sweetalert2';

export default function CrearUser(){

    const [loading, setLoading] = useState(false);
        
    const navigate = useNavigate();
    
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const Roles = [
        {name:'Admin'},{name:'Director'}, {name:'Gerente'},{name:'Supervisor'},{name:'Analista'}
    ]

    return(
        <div className='container mx-auto p-6'>
            <div className="bg-three text-white text-center py-3 rounded-t-xl">
                <h2 className="text-2xl font-bold text-center mb-4">Usuario</h2>
            </div>
            <Formik
                initialValues={{
                    nombreCompleto: '',
                    usuario: '',
                    contraseña: '',
                    correo: '',
                    rol: '',
                }}
                validate={values => {
                    const errors = {};
                    
                    return errors
                }}
                onSubmit={(values, { setSubmitting}) => {
                    setLoading(true);
                    fetch("https://script.google.com/macros/s/AKfycbz7gxd2iss9HvHL9IbBt190ObHuGazeklHgWbD_S9oj5-3a5I5_1395Bx4Q5NNf4NK3/exec")
                    .then(response => response.text())
                    .then(data => {
                        // Asegurarnos de que 'data' sea un número
                        let id = parseInt(data, 10);  // Convertimos el ID a un número, base 10
                        if (isNaN(id)) {
                            id = 0;  // Si 'data' no es un número válido, inicializamos 'id' en 0
                        }
                        
                        id = id + 1;  // Sumamos 1 para obtener el nuevo ID
                        let valores = {
                            ID: id,  // El nombre de la propiedad debe coincidir con lo que espera Google Apps Script (por ejemplo, 'ID', no 'id')
                            NombreCompleto: values.nombreCompleto,
                            Usuario: values.usuario,
                            Contraseña: values.contraseña,
                            Correo: values.correo,  // Asegúrate de que la capitalización coincida con lo esperado en el código de Google
                            Rol: values.rol,
                            Activo: 1,
                                }
                            // Enviar datos a Google Sheets usando fetch
                            fetch("https://script.google.com/macros/s/AKfycbwQjWbGhDGs25EZFAAGUM36dJC7KsWwdHPFX4ib4lDm2zIlZmzTzk7PiDqZDtK4DWbe/exec", {
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
                                        }).then((result)=>{
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
                    <div className="flex flex-col items-center">
                    {/* Sección 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-3 w-full max-w-2xl">
                            <label htmlFor="nombreCompleto">Nombre Completo:</label>
                            <input type="text" id="nombreCompleto" name="nombreCompleto" value={values.nombreCompleto} onChange={handleChange} className="w-full md:w-full lg:w-full p-3 border rounded-md" />
                            <label htmlFor="usuario">Usuario:</label>
                            <input type="text" id="usuario" name="usuario" value={values.usuario} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            <label htmlFor="contraseña">Contraseña:</label>
                            <input type="text" id="contraseña" name="contraseña" value={values.contraseña} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            <label htmlFor="correo">Correo:</label>
                            <input type="text" id="correo" name="correo" value={values.correo} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            <label htmlFor="rol">Rol:</label>
                            <select  id="rol" name="rol" value={values.rol} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
                                <option value="">-- Seleccion un rol --</option>
                                {
                                    Roles.map((roles) =>{
                                        return(
                                            <option key={roles.name} value={roles.name}>{roles.name}</option>
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
                )}
            </Formik>
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