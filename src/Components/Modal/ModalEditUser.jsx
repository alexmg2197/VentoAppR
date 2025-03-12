import {React,useState} from "react";
import { Formik } from "formik";
import Swal from "sweetalert2";

export default function ModalEditUser({modal, usuario}){

    const [loading, setLoading] = useState(false);

    const Roles = [
        {name:'Admin'},{name:'Director'}, {name:'Gerente'},{name:'Supervisor'},{name:'Analista'}
    ]

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
                                Editar Usuario
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
                                id: usuario.ID,
                                nombreCompleto: usuario.nombreCompleto,
                                usuario: usuario.usuario,
                                contraseña: usuario.contraseña,
                                correo: usuario.correo,
                                rol: usuario.rol,
                            }}
                            validate={values => {
                                const errors = {};
                                
                                return errors
                            }}
                            onSubmit={(values, { setSubmitting}) => {
                                setLoading(true)

                                const datos = {
                                    "ID": values.id,
                                    "NombreCompleto":values.nombreCompleto,
                                    "Usuario": values.usuario,
                                    "Contraseña": values.contraseña,
                                    "Correo": values.correo,
                                    "Rol": values.rol,
                                    };
                                
                                
                                fetch("https://script.google.com/macros/s/AKfycbyL3wH6RSLPROBOy_y4rUAXb4B3FgVDe5zHJMLk0eKXt-6ahtDdzf4ilN0GYmRLhoc/exec", {
                                    method: "POST",
                                    body: JSON.stringify(datos), // Enviar los valores del formulario
                                    headers: {
                                        "Content-Type": "text/plain;charset=utf-8",
                                    },
                                })
                                    .then(response => response.text())
                                    .then(async (result) => {
                                        setLoading(false)
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
                                                <input type="text" id="correo" name="correo" value={values.correo} onChange={handleChange} placeholder="No. de Serie" className="w-full p-2 border rounded-md" />
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