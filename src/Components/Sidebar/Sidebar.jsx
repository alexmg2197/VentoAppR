import {React,useState, useEffect} from "react";
import Logo from '../../assets/logo-vento.png'
import LogoS from '../../assets/vento-logo.png'

export default function Sidebar({ sidebarOpen,toggleSidebar }) {

    const [mostrarCatalogos, setMostrarCatalogos] = useState(false);

    const toggleVisibilidadCatalogos = () => {
        setMostrarCatalogos(!mostrarCatalogos);
    };

    return (
       <>
            <div className={`bg-one text-white transition-all duration-300 ${sidebarOpen ? 'w-60' : 'w-20'} h-screen hidden md:block`}>
                <div className="flex justify-center items-center pt-4">
                    <a href="#Inicio" className="-m-1.5 p-1.5">
                        <span className="sr-only">Vento</span>
                            <img alt="" src={sidebarOpen ? Logo : LogoS} className={`${sidebarOpen ? 'h-10' : 'h-13'} w-auto`} />
                    </a>
                </div>
                <ul className="space-y-2 pt-10">
                    <li>
                        <a href="#Inicio" className={`flex items-center ${!sidebarOpen ? 'justify-center' : ''} p-2 text-white hover:text-black rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                            {
                                sidebarOpen ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 512 512"><path fill="currentColor" d="M261.56 101.28a8 8 0 0 0-11.06 0L66.4 277.15a8 8 0 0 0-2.47 5.79L63.9 448a32 32 0 0 0 32 32H192a16 16 0 0 0 16-16V328a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v136a16 16 0 0 0 16 16h96.06a32 32 0 0 0 32-32V282.94a8 8 0 0 0-2.47-5.79Z"/><path fill="currentColor" d="m490.91 244.15l-74.8-71.56V64a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0 0 43 267.56L250.5 69.28a8 8 0 0 1 11.06 0l207.52 198.28a16 16 0 0 0 22.59-.44c6.14-6.36 5.63-16.86-.76-22.97"/></svg>
                                        <span className="ms-3">Home</span>
                                    </>
                                ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 512 512"><path fill="currentColor" d="M261.56 101.28a8 8 0 0 0-11.06 0L66.4 277.15a8 8 0 0 0-2.47 5.79L63.9 448a32 32 0 0 0 32 32H192a16 16 0 0 0 16-16V328a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v136a16 16 0 0 0 16 16h96.06a32 32 0 0 0 32-32V282.94a8 8 0 0 0-2.47-5.79Z"/><path fill="currentColor" d="m490.91 244.15l-74.8-71.56V64a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0 0 43 267.56L250.5 69.28a8 8 0 0 1 11.06 0l207.52 198.28a16 16 0 0 0 22.59-.44c6.14-6.36 5.63-16.86-.76-22.97"/></svg>
                                        </>
                                )
                            }
                        </a>
                    </li>
                    <li>
                        <a href="#CrearRegistro" className={`flex items-center ${!sidebarOpen ? 'justify-center' : ''} p-2 text-white hover:text-black rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                            {
                                sidebarOpen ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 15h2v-3h3v-2h-3V7h-2v3H8v2h3zm-3 6v-2H4q-.825 0-1.412-.587T2 17V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v12q0 .825-.587 1.413T20 19h-4v2z"/></svg>
                                        <span className="ms-3">Crear Registro</span>
                                    </>
                                ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 15h2v-3h3v-2h-3V7h-2v3H8v2h3zm-3 6v-2H4q-.825 0-1.412-.587T2 17V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v12q0 .825-.587 1.413T20 19h-4v2z"/></svg>
                                        </>
                                )
                            }
                        </a>
                    </li>
                    <li>
                        <a href="#VerColaboradores" title="Colaboradores" className={`flex items-center ${!sidebarOpen ? 'justify-center' : ''} p-2 text-white hover:text-black rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                            {
                                sidebarOpen ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 512 512"><path fill="currentColor" d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0S112 64.5 112 144s64.5 144 144 144m128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128"/></svg>
                                        <span className="ms-3">Colaboradores</span>
                                    </>
                                ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 512 512"><path fill="currentColor" d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0S112 64.5 112 144s64.5 144 144 144m128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128"/></svg>
                                        </>
                                )
                            }
                        </a>
                    </li>
                    <li>
                        <a href="#VerEquipos" title="Equipos" className={`flex items-center ${!sidebarOpen ? 'justify-center' : ''} p-2 text-white hover:text-black rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                            {
                                sidebarOpen ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="-2 -3.5 24 24"><path fill="currentColor" d="M1 .565h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-14a1 1 0 0 1 1-1m0 11v2h2v-2zm9-8h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m2 11h4a1 1 0 0 1 0 2h-4a1 1 0 0 1 0-2"/></svg>
                                        <span className="ms-3">Equipos de Computo</span>
                                    </>
                                ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="-2 -3.5 24 24"><path fill="currentColor" d="M1 .565h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-14a1 1 0 0 1 1-1m0 11v2h2v-2zm9-8h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m2 11h4a1 1 0 0 1 0 2h-4a1 1 0 0 1 0-2"/></svg>
                                        </>
                                )
                            }
                        </a>
                    </li>
                    <li>
                        <a href="#VerResponsiva" title="Responsivas" className={`flex items-center ${!sidebarOpen ? 'justify-center' : ''} p-2 text-white hover:text-black rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                            {
                                sidebarOpen ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172S21 17.771 21 14v-4c0-3.771 0-5.657-1.172-6.828S16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M7.25 8A.75.75 0 0 1 8 7.25h8a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 8m0 4a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75M8 15.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z" clipRule="evenodd"/></svg>
                                        <span className="ms-3">Responsivas</span>
                                    </>
                                ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172S21 17.771 21 14v-4c0-3.771 0-5.657-1.172-6.828S16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M7.25 8A.75.75 0 0 1 8 7.25h8a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 8m0 4a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75M8 15.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z" clipRule="evenodd"/></svg>
                                        </>
                                )
                            }
                        </a>
                    </li>
                    <li>
                        <a href="#VerCorreos" title="Correos" className={`flex items-center ${!sidebarOpen ? 'justify-center' : ''} p-2 text-white hover:text-black rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                            {
                                sidebarOpen ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/></svg>
                                        <span className="ms-3">Correos Electronicos</span>
                                    </>
                                ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/></svg>
                                        </>
                                )
                            }
                        </a>
                    </li>
                    <li>
                        <a href="#VerExtensiones" title="Extensiones" className={`flex items-center ${!sidebarOpen ? 'justify-center' : ''} p-2 text-white hover:text-black rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                            {
                                sidebarOpen ? (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16"><path fill="currentColor" d="m15.88 3.86l-.61-1.31a1.21 1.21 0 0 0-.792-.658c-1.938-.528-4.161-.851-6.453-.891a27.5 27.5 0 0 0-6.687.934c-.165.048-.453.29-.605.609L.12 3.861a1.2 1.2 0 0 0-.12.52v.87l-.001.041c0 .392.318.71.71.71l.033-.001H3.26a.76.76 0 0 0 .742-.76L4 5.188v-.85a.65.65 0 0 1 .298-.546a6.9 6.9 0 0 1 3.724-.791a6.97 6.97 0 0 1 3.717.788c.143.099.262.3.262.529v.872a.76.76 0 0 0 .739.81h2.521l.031.001a.71.71 0 0 0 .71-.71l-.001-.043V4.38a1.2 1.2 0 0 0-.123-.527z"/><path fill="currentColor" d="M12 8.3a4.73 4.73 0 0 1-1.001-2.92L11 5.296V5h-1v1H6V5H5v.33l.001.08a4.74 4.74 0 0 1-1.009 2.93L1 12v3h14v-3zM8 13a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/><path fill="currentColor" d="M10 10a2 2 0 1 1-3.999.001A2 2 0 0 1 10 10"/></svg>
                                            <span className="ms-3">Extensiones</span>
                                        </>
                                ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16"><path fill="currentColor" d="m15.88 3.86l-.61-1.31a1.21 1.21 0 0 0-.792-.658c-1.938-.528-4.161-.851-6.453-.891a27.5 27.5 0 0 0-6.687.934c-.165.048-.453.29-.605.609L.12 3.861a1.2 1.2 0 0 0-.12.52v.87l-.001.041c0 .392.318.71.71.71l.033-.001H3.26a.76.76 0 0 0 .742-.76L4 5.188v-.85a.65.65 0 0 1 .298-.546a6.9 6.9 0 0 1 3.724-.791a6.97 6.97 0 0 1 3.717.788c.143.099.262.3.262.529v.872a.76.76 0 0 0 .739.81h2.521l.031.001a.71.71 0 0 0 .71-.71l-.001-.043V4.38a1.2 1.2 0 0 0-.123-.527z"/><path fill="currentColor" d="M12 8.3a4.73 4.73 0 0 1-1.001-2.92L11 5.296V5h-1v1H6V5H5v.33l.001.08a4.74 4.74 0 0 1-1.009 2.93L1 12v3h14v-3zM8 13a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/><path fill="currentColor" d="M10 10a2 2 0 1 1-3.999.001A2 2 0 0 1 10 10"/></svg>
                                        </>
                                )
                            }
                        </a>
                    </li>
                    <li>
                        <a href="#VerUsuarios" title="Usuarios" className={`flex items-center ${!sidebarOpen ? 'justify-center' : ''} p-2 text-white hover:text-black rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                            {
                                sidebarOpen ? (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 2a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11m8 10.75v1.376c.715.184 1.352.56 1.854 1.072l1.192-.689l1 1.732l-1.191.688a4 4 0 0 1 0 2.142l1.191.688l-1 1.732l-1.192-.689a4 4 0 0 1-1.854 1.072v1.376h-2v-1.376a4 4 0 0 1-1.854-1.072l-1.193.689l-1-1.732l1.192-.688a4 4 0 0 1 0-2.142l-1.192-.688l1-1.732l1.193.688a4 4 0 0 1 1.854-1.071V12.75zm-2.751 4.283a2 2 0 0 0-.25.967c0 .35.091.68.25.967l.036.063a2 2 0 0 0 3.43 0l.036-.063c.159-.287.249-.616.249-.967c0-.35-.09-.68-.249-.967l-.037-.063a2 2 0 0 0-3.429 0zM13.062 14a6.72 6.72 0 0 0-1.312 4a6.72 6.72 0 0 0 1.312 4H2v-2a6 6 0 0 1 6-6z"/></svg>
                                            <span className="ms-3">Usuarios</span>
                                        </>
                                ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 2a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11m8 10.75v1.376c.715.184 1.352.56 1.854 1.072l1.192-.689l1 1.732l-1.191.688a4 4 0 0 1 0 2.142l1.191.688l-1 1.732l-1.192-.689a4 4 0 0 1-1.854 1.072v1.376h-2v-1.376a4 4 0 0 1-1.854-1.072l-1.193.689l-1-1.732l1.192-.688a4 4 0 0 1 0-2.142l-1.192-.688l1-1.732l1.193.688a4 4 0 0 1 1.854-1.071V12.75zm-2.751 4.283a2 2 0 0 0-.25.967c0 .35.091.68.25.967l.036.063a2 2 0 0 0 3.43 0l.036-.063c.159-.287.249-.616.249-.967c0-.35-.09-.68-.249-.967l-.037-.063a2 2 0 0 0-3.429 0zM13.062 14a6.72 6.72 0 0 0-1.312 4a6.72 6.72 0 0 0 1.312 4H2v-2a6 6 0 0 1 6-6z"/></svg>
                                        </>
                                )
                            }
                        </a>
                    </li>
                    <li>
                        <a onClick={toggleVisibilidadCatalogos} className={`relative flex items-center ${!sidebarOpen ? 'justify-center' : ''} p-2 text-white hover:text-black rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                            {
                                sidebarOpen ? (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 512 512"><path fill="currentColor" d="M202.24 74C166.11 56.75 115.61 48.3 48 48a31.36 31.36 0 0 0-17.92 5.33A32 32 0 0 0 16 79.9V366c0 19.34 13.76 33.93 32 33.93c71.07 0 142.36 6.64 185.06 47a4.11 4.11 0 0 0 6.94-3V106.82a15.9 15.9 0 0 0-5.46-12A143 143 0 0 0 202.24 74m279.68-20.7A31.33 31.33 0 0 0 464 48c-67.61.3-118.11 8.71-154.24 26a143.3 143.3 0 0 0-32.31 20.78a15.93 15.93 0 0 0-5.45 12v337.13a3.93 3.93 0 0 0 6.68 2.81c25.67-25.5 70.72-46.82 185.36-46.81a32 32 0 0 0 32-32v-288a32 32 0 0 0-14.12-26.61"/></svg>
                                            <span className="ms-3">
                                                Catalogos
                                            </span>
                                            {!mostrarCatalogos ? 
                                                <svg className="absolute right-4" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M31 36L19 24l12-12"/></svg> 
                                            : 
                                            <svg className="absolute right-4" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M36 18L24 30L12 18"/></svg>}
                                        </>
                                ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 512 512"><path fill="currentColor" d="M202.24 74C166.11 56.75 115.61 48.3 48 48a31.36 31.36 0 0 0-17.92 5.33A32 32 0 0 0 16 79.9V366c0 19.34 13.76 33.93 32 33.93c71.07 0 142.36 6.64 185.06 47a4.11 4.11 0 0 0 6.94-3V106.82a15.9 15.9 0 0 0-5.46-12A143 143 0 0 0 202.24 74m279.68-20.7A31.33 31.33 0 0 0 464 48c-67.61.3-118.11 8.71-154.24 26a143.3 143.3 0 0 0-32.31 20.78a15.93 15.93 0 0 0-5.45 12v337.13a3.93 3.93 0 0 0 6.68 2.81c25.67-25.5 70.72-46.82 185.36-46.81a32 32 0 0 0 32-32v-288a32 32 0 0 0-14.12-26.61"/></svg>
                                        </>
                                )
                            }
                        </a>
                        {
                            mostrarCatalogos && (
                                <ul className="space-y-2">
                                    <li className="pl-4">
                                        <a href="#Areas" className={`relative flex items-center ${!sidebarOpen ? 'justify-center' : ''} p-2 text-white hover:text-black rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                                            {
                                                sidebarOpen ? (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 20h2v2H1v-2h2V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1zM8 11v2h3v-2zm0-4v2h3V7zm0 8v2h3v-2zm5 0v2h3v-2zm0-4v2h3v-2zm0-4v2h3V7z"/></svg>
                                                            <span className="ms-3">
                                                                Areas
                                                            </span>
                                                        </>
                                                ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 20h2v2H1v-2h2V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1zM8 11v2h3v-2zm0-4v2h3V7zm0 8v2h3v-2zm5 0v2h3v-2zm0-4v2h3v-2zm0-4v2h3V7z"/></svg>
                                                        </>
                                                )
                                            }
                                        </a>
                                    </li>
                                </ul>
                            )
                        }
                    </li>
                </ul>
            </div>

                  
       </>
  );
}