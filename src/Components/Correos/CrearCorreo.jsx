import {React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from 'formik'
import Swal from 'sweetalert2';

export default function CrearCorreo(){

    const [loading, setLoading] = useState(false);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);

    useEffect(() => {
        setLoading(true);

        const fetchUbicaciones = fetch('https://script.google.com/macros/s/AKfycbxIF5bPo7OvOgPCQCtrdal4xBwh3P-Q4dPageTLZ1GtkIQz9tAL9fkI-ksEqUxqe_ud/exec')
            .then((response) => response.json())
            .then((data) =>  setUbicaciones(data));

        const fetchDepartamentos = fetch('https://script.google.com/macros/s/AKfycby0xvLsCNoeli0AeoydxxKUEGxunatr8N7XfXwth6PbTkToI6khEjEN0tYO2RY_mtZD/exec')
            .then((response) => response.json())
            .then((data) =>  setDepartamentos(data));


        Promise.all([fetchUbicaciones,fetchDepartamentos])
        .catch((error) => console.error("Error al cargar datos:", error))
        .finally(() => {setLoading(false)});
    }, []);
    
    const navigate = useNavigate();
    
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    return(
        <div className="container mx-auto p-6">
            <div className="bg-three text-white text-center py-3 rounded-t-xl">
                <h2 className="text-2xl font-bold text-center mb-4"> Correo Electronico</h2>
            </div>
            <Formik
                initialValues={{
                    usuario: '',
                    puesto: '',
                    departamento: '',
                    ubicacion: '',
                    correo: '',
                    contrasena: '',
                }}
                validate={values => {
                    const errors = {};
                    
                    return errors
                }}
                onSubmit={(values, { setSubmitting}) => {

                    fetch("https://script.google.com/macros/s/AKfycbyHv9WpmccMvs6pDMdSFf-b_byW3dNLGFIyCo7ajFxgRdvDB439Jowd-3gVn7KisjTu/exec")
                    .then(response => response.text())
                    .then(data => {
                        setLoading(true)
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
                            Ubicacion: values.ubicacion,  // Asegúrate de que la capitalización coincida con lo esperado en el código de Google
                            Correo: values.correo,
                            Contraseña: values.contrasena,
                            Activo: 1,
                            Creador: usuario.nombre
                                }
                                console.log(id)
                                console.log(valores)
                            // Enviar datos a Google Sheets usando fetch
                            fetch("https://script.google.com/macros/s/AKfycby1HjpNMjxdQYSudusXbMrm4bPcd3rnNggj3v0ScVBK3_d22eABx3vPaxDveDTQjgg/exec", {
                                method: "POST",
                                body: JSON.stringify(valores), // Enviar los valores del formulario
                                headers: {
                                    "Content-Type": "text/plain;charset=utf-8",
                                },
                            })
                                .then(response => response.text())
                                .then(result => {
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
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-xl rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" id="usuario" name="usuario" value={values.usuario} onChange={handleChange} placeholder="Nombre" className="w-full p-2 border rounded-md"/>
                        <input type="text" id="puesto" name="puesto" value={values.puesto} onChange={handleChange} placeholder="Puesto" className="w-full p-2 border rounded-md"/>
                        <select id="departamento" name="departamento" value={values.departamento} onChange={handleChange} className="w-full p-2 border rounded-md bg-white" >
                            <option value="">Departamento</option>
                            {
                                departamentos.map((depa) =>{
                                    return(
                                        <option key={depa.name} value={depa.name}>{depa.name}</option>
                                    )
                                })
                            }
                        </select>
                        <select id="ubicacion" name="ubicacion" value={values.ubicacion} onChange={handleChange} className="w-full p-2 border rounded-md bg-white" >
                            <option value="">Ubicaciòn</option>
                            {
                                ubicaciones.map((ubicacion) =>{
                                    return(
                                        <option key={ubicacion.name} value={ubicacion.name}>{ubicacion.name}</option>
                                    )
                                })
                            }
                        </select>
                        <input type="email" id="correo" name="correo" value={values.correo} onChange={handleChange} placeholder="Correo" className="w-full p-2 border rounded-md"/>
                        <input type="text" id="contrasena" name="contrasena" value={values.contrasena} onChange={handleChange} placeholder="Contraseña" className="w-full p-2 border rounded-md"/>
                    </div>
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