import { Formik } from "formik";
import { useState } from "react";
import { UploadCloud } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

export default function ModalUploadFotoP({modal,usuario}){

    const API_URL = import.meta.env.VITE_API_URL;

    const [archivo, setArchivo] = useState(null);
    const [file, setFile] = useState("Ningun Archivo Seleccionado");
    const [loading, setLoading] = useState(false);

    const manejarArchivo = (event) => {
        const f = event.target.files[0]
        setArchivo(event.target.files[0]);
        setFile(event.target.files[0].name)
      };

    const closeModal = () => {
        modal(false); // Ocultar modal
    };


    return(
        <>
            <div onClick={closeModal} className="fixed inset-0 bg-black opacity-60 z-40">
            </div>
            <div onClick={(e) => e.stopPropagation()} className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto">
                <div className="relative p-4 w-full max-w-3xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <div className="bg-twoo flex items-center justify-between p-4 border-b rounded-t border-gray-200">
                            <h3 className="text-lg font-semibold text-white">
                                Subir Foto de Perfil
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
                                idUser: usuario.idUser
                            }}
                            validate={values => {
                                const errors = {};
                                
                                return errors
                            }}
                            onSubmit={async(values, { setSubmitting}) => {
                                const formData = new FormData();
                                formData.append("foto", archivo);
                                
                                setLoading(true)
                                
                                try {
                                        const response = await axios.post(
                                            `${API_URL}/api/Usuario/SubirFoto/${values.idUser}`,
                                            formData,
                                            {
                                                headers: {
                                                "Content-Type": "multipart/form-data",
                                                },
                                            }
                                            );
                                            Swal.fire({
                                                title: "Listo",
                                                text: "El archivo se ha subido correctamente.",
                                                icon: "success"
                                                }).then(async(result)=>{
                                                if(result.isConfirmed){
                                                    window.location.reload();
                                                }
                                            });
                                } catch (error) {
                                    Swal.fire({
                                        title: "No se pudo subir el archivo",
                                        icon: "error",
                                        draggable: true
                                    });
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
                                }) => (
                            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-xl rounded-lg items-center justify-center">
                                <div className="flex flex-col items-center gap-3">
                                    <label className="w-full max-w-md flex flex-col items-center justify-center p-5 border-2 border-dashed border-accent rounded-2xl bg-white shadow-lg cursor-pointer transition hover:border-tertiary hover:bg-accent/10">
                                        <UploadCloud className="w-10 h-10 text-tertiary mb-2" />
                                        <span className="text-sm text-gray-600 font-medium">{file}</span>
                                        <input type="file" className="hidden" onChange={manejarArchivo} accept="image/*"/>
                                    </label>
                                    <p className="text-xs text-gray-500">Arrastra y suelta un archivo o haz clic para seleccionar.</p>
                                </div>
                                <div className="mt-6">
                                <button type="submit" className="w-full bg-five hover:bg-four text-white py-2 rounded-md disabled:opacity-50"  >
                                    Subir Archivo
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