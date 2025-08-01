import LogoS from '../assets/logo-vento.png'
export default function Loader() {
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="flex flex-col gap-4 w-full items-center justify-center">
        
                {/* Contenedor giratorio con posición relativa */}
                <div className="relative w-28 h-28">
                    {/* Círculo giratorio */}
                    <div className="w-full h-full border-8 border-gray-300 border-t-blue-900 rounded-full animate-spin" />
                    
                    {/* Imagen centrada y fija */}
                    <img
                        src={LogoS}
                        alt="Logo"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-23"
                    />
                </div>
            </div>
        </div>
    )
}