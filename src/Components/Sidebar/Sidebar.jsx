import Logo from '../../assets/logo-vento.png'
import LogoS from '../../assets/vento-logo.png'

export default function Sidebar({ sidebarOpen,toggleSidebar }) {
    return (
       <>
            <div className={`transition-all duration-300 ${sidebarOpen ? 'w-50' : 'w-20'} bg-one p-4 h-full hidden md:block flex justify-center items-center`}>
                <div className="flex justify-center items-center">
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="16" strokeDashoffset="16" d="M4.5 21.5h15"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0"/></path><path strokeDasharray="16" strokeDashoffset="16" d="M4.5 21.5v-13.5M19.5 21.5v-13.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="16;0"/></path><path strokeDasharray="28" strokeDashoffset="28" d="M2 10l10 -8l10 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="28;0"/></path><path strokeDasharray="24" strokeDashoffset="24" d="M9.5 21.5v-9h5v9"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.4s" values="24;0"/></path></g></svg>
                                        <span className="ms-3">Home</span>
                                    </>
                                ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="16" strokeDashoffset="16" d="M4.5 21.5h15"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0"/></path><path strokeDasharray="16" strokeDashoffset="16" d="M4.5 21.5v-13.5M19.5 21.5v-13.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="16;0"/></path><path strokeDasharray="28" strokeDashoffset="28" d="M2 10l10 -8l10 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="28;0"/></path><path strokeDasharray="24" strokeDashoffset="24" d="M9.5 21.5v-9h5v9"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.4s" values="24;0"/></path></g></svg>
                                        </>
                                )
                            }
                        </a>
                    </li>
                </ul>
            </div>

                  
       </>
  );
}