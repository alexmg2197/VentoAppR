import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import Logo from '../../assets/logo-vento.png'
import ModalPerfil from "../Modal/ModalPerfil";
import axios from "axios";

export default function Header({  toggleSidebar, setIsAuthenticated,sidebarOpen}) {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [usuario, setUsuario] = useState([])
  const profileRef = useRef(null);
  
  const API_URL = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem("token");

  useEffect(() => {
      axios.get(`${API_URL}/api/Usuario/MyUser`,
        {
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
      )
        .then(res => setUsuario(res.data))
        .catch(err => console.error(err));
    }, []); // Solo una vez al montar

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);


  const navigate = useNavigate();

  const modalPerfil = () => {
    setModal(true)
    setShowProfileMenu(false)
  }

  const logout = ()=>{
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/Login");
  };

  return (
    <header className="h-16 bg-gray-200 text-one px-4 flex items-center justify-between shadow-md">
      {
        modal && <ModalPerfil modal={setModal} usuario={usuario}/>
      }
      <button onClick={toggleSidebar} className="text-xl text-one hidden md:block ">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H4c-.6 0-1 .4-1 1s.4 1 1 1h16c.6 0 1-.4 1-1s-.4-1-1-1M4 8h16c.6 0 1-.4 1-1s-.4-1-1-1H4c-.6 0-1 .4-1 1s.4 1 1 1m16 8H4c-.6 0-1 .4-1 1s.4 1 1 1h16c.6 0 1-.4 1-1s-.4-1-1-1"/></svg>
      </button>
       <div className="flex md:hidden">
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-50" >
            <span className="sr-only">Open main menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>

      <div className="relative inline-block px-5" ref={profileRef}>
        <div className="w-16 h-16 bg-gray-200 rounded-4xl shadow-lg hover:cursor-pointer flex justify-center items-center" onClick={() => setShowProfileMenu(!showProfileMenu)}>
          {
            usuario.fotoPerfil === null ?
            (
              <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 48 48"><g fill="none" strokeWidth="3"><path fill="#fff" d="M3 24c0 11.598 9.402 21 21 21s21-9.402 21-21S35.598 3 24 3S3 12.402 3 24"/><path fill="#8fbffa" d="M3.094 21.999C13.974 21.95 22.901 13.629 23.906 3C13.026 3.048 4.1 11.37 3.094 21.999m41.812 0C34.026 21.95 25.099 13.629 24.094 3c10.88.048 19.807 8.37 20.812 18.999"/><path stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M3 24c0 11.598 9.402 21 21 21s21-9.402 21-21S35.598 3 24 3S3 12.402 3 24"/><path stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M23.906 3c-1.005 10.629-9.931 18.951-20.812 18.999m41.812 0C34.026 21.95 25.099 13.629 24.094 3M16 24v2m16-2v2m-1 8c-3.062 4-10.937 4-14 0"/></g></svg>
            ) : (
              <img src={API_URL+usuario.fotoPerfil} alt='foto' className="w-full h-full object-cover rounded-full" />
            )
          }
        </div>
        {showProfileMenu && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="p-4 space-y-1">
            <li className="py-1 text-center border-b">{user.nombre}</li>
            <li className="">
              <a href="#" onClick={modalPerfil} className="flex p-2 items-center text-black rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 group" >
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2S7.5 4.019 7.5 6.5M20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1z"/></svg>
                <span className="ms-3">Perfil</span>
              </a>
            </li>
            <li className=" ">
              <a href="#" onClick={logout} className="flex p-2 items-center text-black rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 group" >
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"/></svg>
                <span className="ms-3">Cerrar Sesion</span>
              </a>
            </li>
          </ul>
        </div>
        )}
      </div>
      
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 left-0 z-10 w-65 overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 6h18M3 12h18M3 18h18"/></svg>
              <span className="sr-only">Close menu</span>
            </button> 
            <a href="#Inicio" className="-m-1.5 p-1.5">
              <span className="sr-only">Vento</span>
              <img
                alt=""
                src={Logo}
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                    <DisclosureButton as="a" onClick={() => setMobileMenuOpen(false)} href="#Inicio" className=" group flex w-full items-center justify-center rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-50 hover:bg-gray-50 hover:text-black">
                      Inicio
                    </DisclosureButton>
                  </Disclosure>
                <Disclosure as="div" className="-mx-3">
                    <DisclosureButton as="a" onClick={() => setMobileMenuOpen(false)} href="#CrearRegistro" className=" group flex w-full items-center justify-center rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-50 hover:bg-gray-50 hover:text-black">
                      Crear Registro
                    </DisclosureButton>
                  </Disclosure>
                <Disclosure as="div" className="-mx-3">
                    <DisclosureButton as="a" onClick={() => setMobileMenuOpen(false)} href="#VerColaboradores" className=" group flex w-full items-center justify-center rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-50 hover:bg-gray-50 hover:text-black">
                      Colaboradores
                    </DisclosureButton>
                  </Disclosure>
                <Disclosure as="div" className="-mx-3">
                    <DisclosureButton as="a" onClick={() => setMobileMenuOpen(false)} href="#VerEquipos" className=" group flex w-full items-center justify-center rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-50 hover:bg-gray-50 hover:text-black">
                      Equipos de Computo
                    </DisclosureButton>
                  </Disclosure>
                <Disclosure as="div" className="-mx-3">
                    <DisclosureButton as="a" onClick={() => setMobileMenuOpen(false)} href="#VerResponsiva" className=" group flex w-full items-center justify-center rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-50 hover:bg-gray-50 hover:text-black">
                      Responsivas
                    </DisclosureButton>
                  </Disclosure>
                <Disclosure as="div" className="-mx-3">
                    <DisclosureButton as="a" onClick={() => setMobileMenuOpen(false)} href="#VerCorreos" className=" group flex w-full items-center justify-center rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-50 hover:bg-gray-50 hover:text-black">
                      Correos Electronicos
                    </DisclosureButton>
                  </Disclosure>
                <Disclosure as="div" className="-mx-3">
                    <DisclosureButton as="a" onClick={() => setMobileMenuOpen(false)} href="#VerExtensiones" className=" group flex w-full items-center justify-center rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-50 hover:bg-gray-50 hover:text-black">
                      Extensiones
                    </DisclosureButton>
                  </Disclosure>
                  {
                    user.rol === 'Admin' && (
                      <>
                        <Disclosure as="div" className="-mx-3">
                            <DisclosureButton as="a" onClick={() => setMobileMenuOpen(false)} href="#VerUsuarios" className=" group flex w-full items-center justify-center rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-50 hover:bg-gray-50 hover:text-black">
                              Usuarios
                            </DisclosureButton>
                          </Disclosure>
                        <Disclosure as="div" className="-mx-3">
                            <DisclosureButton as="a" onClick={() => setMobileMenuOpen(false)} href="#Catalogos" className=" group flex w-full items-center justify-center rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-50 hover:bg-gray-50 hover:text-black">
                              Catalogos
                            </DisclosureButton>
                          </Disclosure>
                      </>
                    ) 
                  }
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}