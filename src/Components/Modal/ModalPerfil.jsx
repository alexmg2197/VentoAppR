import { useState } from "react"
import ModalUploadFotoP from "./ModalUploadFotoP";

export default function ModalPerfil({modal, usuario}){

    const [modalPhoto, setModalPhoto] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    const API_URL = import.meta.env.VITE_API_URL;
    

    const subirFoto = () => {
        setModalPhoto(true)
    }

    return(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => modal(false)} // cerrar al hacer clic fuera
        >
            {
                modalPhoto && <ModalUploadFotoP modal={setModalPhoto} usuario={user}/>
            }
            <div
                className="flex items-center p-3 w-auto h-auto bg-white rounded-md shadow-lg relative"
                onClick={(e) => e.stopPropagation()} // evitar cierre si se da clic dentro del modal
            >
                {/* Círculo con ícono */}
                <section className="relative flex justify-center items-center w-34 h-34 rounded-full shadow-md bg-gradient-to-r from-[#F9C97C] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:scale-110 duration-300 overflow-hidden">
                    {
                        usuario.fotoPerfil === null ?
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" width="7em" height="7em" viewBox="0 0 48 48"><g fill="none" strokeWidth="3"><path fill="#fff" d="M3 24c0 11.598 9.402 21 21 21s21-9.402 21-21S35.598 3 24 3S3 12.402 3 24"/><path fill="#8fbffa" d="M3.094 21.999C13.974 21.95 22.901 13.629 23.906 3C13.026 3.048 4.1 11.37 3.094 21.999m41.812 0C34.026 21.95 25.099 13.629 24.094 3c10.88.048 19.807 8.37 20.812 18.999"/><path stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M3 24c0 11.598 9.402 21 21 21s21-9.402 21-21S35.598 3 24 3S3 12.402 3 24"/><path stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M23.906 3c-1.005 10.629-9.931 18.951-20.812 18.999m41.812 0C34.026 21.95 25.099 13.629 24.094 3M16 24v2m16-2v2m-1 8c-3.062 4-10.937 4-14 0"/></g></svg>
                        ) : (
                            <img
                                src={API_URL+usuario.fotoPerfil}
                                alt="Foto de perfil"
                                className="w-full h-full object-cover rounded-full"
                            />
                        )
                    }
                    <button onClick={subirFoto} className="absolute cursor-pointer bottom-2 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white border border-gray-300 p-1.5 rounded-full shadow hover:bg-gray-100 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m8 3a5 5 0 0 0-5 5a5 5 0 0 0 5 5a5 5 0 0 0 5-5a5 5 0 0 0-5-5m0 2a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3"/></svg>
                    </button>
                </section>

                {/* Detalles */}
                <section className="block border-l border-gray-300 m-3">
                <div className="pl-3">
                    <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-[#005BC4] to-[#27272A] text-md font-bold">
                    Nombre:
                    </h3>
                    <h3 className="text-gray-600 font-semibold text-sm">{user.nombre}</h3>
                    <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-[#005BC4] to-[#27272A] text-md font-bold">
                    Ubicacion:
                    </h3>
                    <h3 className="text-gray-600 font-semibold text-sm">{user.nombreUbicacion}</h3>
                    <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-[#005BC4] to-[#27272A] text-md font-bold">
                    Rol:
                    </h3>
                    <h3 className="text-gray-600 font-semibold text-sm">{user.rol}</h3>
                </div>
                <div className="flex gap-3 pt-2 pl-3">
                    {/* Iconos de redes */}
                    <svg viewBox="0 0 24 24" className="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87..."></path>
                    </svg>
                    <svg viewBox="0 0 24 24" className="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2">
                    <path d="M22.54 6.42a2.78..."></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2">
                    <path d="M23 3a10.9..."></path>
                    </svg>
                    <svg viewBox="0 0 24 24" className="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2">
                    <path d="M21 2H3v16..."></path>
                    </svg>
                </div>
                </section>

                {/* Botón de cerrar */}
                <button
                onClick={() => modal(false)}
                className=" absolute top-1 right-2 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 shadow-md transition duration-200 cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}