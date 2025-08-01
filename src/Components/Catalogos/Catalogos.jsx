import { useState, useMemo, useEffect  } from "react";
import {
  Box, Tabs, Tab, Paper, Typography
} from '@mui/material';
import Areas from './Tablas/Areas'
import Ubicaciones from './Tablas/Ubicaciones'
import TipoEquipo from "./Tablas/TipoEquipo";
import SistemaOperativo from "./Tablas/SistemaOperativo";
import { useNavigate } from "react-router-dom";

const Catalogos = () =>{

    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedSubtab, setSelectedSubtab] = useState(0);
    const [search, setSearch] = useState('');
    const [componentes, setComponentes] = useState([]);
    const [reloadFlag, setReloadFlag] = useState(false);
    const [loading, setLoading] = useState(false);

    // const { userData } = useUser() //Se usa para ver el usuario logueado
    // const navigate = useNavigate();
    
    // useEffect(() => {
    //     if (userData && userData.C_Rol.rol !== 'Admin') {
    //         navigate('/no-autorizado'); // Ruta a la que quieres redirigir si no es admin
    //     }
    // }, [userData, navigate]);

    const tabs = ["Areas", "Ubicaciones", "Tipo de Equipo", "Sistema Operativo"];

    const handleRefresh = () => {
      setReloadFlag(prev => !prev); // Cambiar el valor para que se dispare el useEffect de la tabla
    };

    const subtabOptions = useMemo(() => {
        if (tabs[selectedTab] === "Subcomponentes") {
        return componentes;
        }
        return [];
    }, [selectedTab, componentes]);

    const renderCurrentTable = () => {

        const commonProps = {
            search,
            reloadFlag,
            onRefresh: handleRefresh,
        };

    switch (tabs[selectedTab]) {
      case "Areas":
        return <Areas {...commonProps} />;
      case "Ubicaciones":
        return <Ubicaciones {...commonProps} />;
      case "Tipo de Equipo":
        return <TipoEquipo {...commonProps} />;
      case "Sistema Operativo":
        return <SistemaOperativo {...commonProps} />;
      default:
        return null;
    }
  };

    return(
        <Box sx={{width: '100%', mt: 1, px: 2}}>
            <Paper elevation={3} sx={{p: 2}} className="bg-blue-900">
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Catálogos
                </Typography>
                <Tabs value={selectedTab} onChange={(e, val) => {
                    setSelectedTab(val);
                    setSearch('');
                    setSelectedSubtab(0);
                }}>
                    {tabs.map((label, i) => (
                        <Tab key={i} label={label} />
                    ))}
                </Tabs>
                {subtabOptions.length > 0 && (
                    <Tabs value={selectedSubtab} onChange={(e, val) => setSelectedSubtab(val)} sx={{ mt: 2 }}>
                        {subtabOptions.map((label, i) => (
                        <Tab key={i} label={label} />
                        ))}
                    </Tabs>
                )}
                <Box sx={{ my: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <div className="p-5 overflow-hidden w-[60px] h-[30px] hover:w-[270px] bg-three shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
                    <div className="flex items-center justify-center fill-white">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width={22} height={22}>
                        <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z" />
                        </svg>
                    </div>
                    <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); }} className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4" />
                </div>
                </Box>
                {renderCurrentTable()}
            </Paper>
        </Box>
    )
}
export default Catalogos