import {React,useState} from "react";
import { Formik } from "formik";
import Swal from "sweetalert2";

export default function ModalEditEmail({modal, correo}){

    const [loading, setLoading] = useState(false);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);

    const usuario = JSON.parse(localStorage.getItem("usuario"));


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
                            Editar Correo
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
                            id: correo.ID,
                            usuario: correo.usuario,
                            puesto: correo.puesto,
                            departamento: correo.departamento,
                            ubicacion: correo.ubicacion,
                            correo: correo.correo,
                            contrasena: correo.contraseña,
                        }}
                        validate={values => {
                            const errors = {};
                            
                            return errors
                        }}
                        onSubmit={(values, { setSubmitting}) => {
                            setLoading(true)

                            const datos = {
                                "ID": values.id,
                                "Usuario": values.usuario,
                                "Puesto": values.puesto,
                                "Departamento": values.departamento,
                                "Marca": values.ubicacion,
                                "Ubicacion": values.modelo,
                                "Correo": values.correo,
                                "Contraseña": values.contraseña,
                                };
                            
                            
                            fetch("https://script.google.com/macros/s/AKfycbx8ka8djxumtNROSvpN6LwiFsFRtv1_lfdcMpDJSzRlr2O7L0LL7S1fWFusDFEm5wXp/exec", {
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