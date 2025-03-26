import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react';
import Logo from '../../assets/logo-vento.png'

export default function Header({  toggleSidebar, setIsAuthenticated,sidebarOpen }) {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();


  const logout = ()=>{
    localStorage.removeItem("usuario");
    setIsAuthenticated(false);
    navigate("/Login");
  };

  return (
    <header className="flex items-center justify-between bg-gray-200 text-one p-4">
      <button onClick={toggleSidebar} className="text-xl text-one hidden md:block ">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H4c-.6 0-1 .4-1 1s.4 1 1 1h16c.6 0 1-.4 1-1s-.4-1-1-1M4 8h16c.6 0 1-.4 1-1s-.4-1-1-1H4c-.6 0-1 .4-1 1s.4 1 1 1m16 8H4c-.6 0-1 .4-1 1s.4 1 1 1h16c.6 0 1-.4 1-1s-.4-1-1-1"/></svg>
      </button>
       <div className="flex md:hidden">
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-50" >
            <span className="sr-only">Open main menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      <div className="pr-6 ">
                <a
                  href="#"
                  onClick={logout}
                  className="-mx-3 block rounded-lg text-base/7 font-semibold text-one hover:bg-gray-50"
                >
                  Log out
                </a>
      </div>
      
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src={Logo}
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="mt-6 flow-root">
            
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}