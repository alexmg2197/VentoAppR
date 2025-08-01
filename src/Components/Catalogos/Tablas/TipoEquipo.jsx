import {React, useState, useEffect, useMemo} from "react";
import Swal from "sweetalert2";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,  Pagination, Paper, Box, Typography  } from "@mui/material";
import axios from "axios";
import Loader from "../../Loader";
import ModalTipoEquipo from "../../Modal/ModalTipoEquipo";

export default function TipoEquipo({search, onComponentListChange, reloadFlag, onRefresh}){
    
    const API_URL = import.meta.env.VITE_API_URL;
    
    const [equipos, setEquipos] = useState([]);
    const [equipo, setEquipo] = useState([]);
    const [ismodal, setIsModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [itemsPerPage, setItemsPerPage] = useState(5); // Elementos por página
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const rowsPerPage = 5;
    const [page, setPage] = useState(1);
    
    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/api/TipoEquipo`)
            .then((response) => response.json())
            .then((data) => {setLoading(false); setEquipos(data)});
    }, [reloadFlag]);

    

    // Filtrar las filas de la tabla según el término de búsqueda
    // Función para aplicar el filtro y devolver las filas filtradas
    const filteredRows = equipos.filter(item =>
        item.tipoEquipo.toLowerCase().includes(search.toLowerCase()) 
    );

        const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredRows.slice(start, start + rowsPerPage);
    }, [filteredRows, page]);

    // Filtrar los elementos para la página actual
    const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
    };

    // Cambiar el número de filas por página
    const handleChangeRowsPerPage = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); // Resetea a la primera página al cambiar el número de elementos por página
    };

    // Obtener las filas a mostrar en la página actual
    const currentItems = filteredRows.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const editE = (datos) =>{
        setEquipo(datos);
        setIsModal(true)
        setModalEdit(true)
    }
    
    const deleteE = (datos) => {
        Swal.fire({
            title: "¿Estas seguro que deseas eliminar el equipo?",
            text: "Esta acción no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "Cancelar"
        }).then(async(result) => {
            if (result.isConfirmed) {
            try {
                await axios.patch(`${API_URL}/api/TipoEquipo/EliminarTipoEquipo/${datos.idTipoEquipo}`)
    
                await Swal.fire({
                    title: "Eliminado",
                    text: "Ubicacion ha sido eliminada.",
                    icon: "success"
                    }).then(async(result)=>{
                    if(result.isConfirmed){
                        await onRefresh()
                    }
                    });
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                title: "No se pudo eliminar la ubicación",
                icon: "error",
                draggable: true
                });
            }
            
            }
        });
    }
    
    const newEq = () => {
        setEquipo(null);
        setIsModal(false)
        setModalEdit(true)
    }

    return(
            <div className="p-4">
                    {
                    modalEdit && <ModalTipoEquipo modal={setModalEdit} equipo={equipo} isEdit={ismodal} onRefresh={onRefresh}/>
                    }
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={()=>{newEq()}} className="group flex items-center justify-start w-11 h-11 bg-green-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-35 hover:rounded-lg active:translate-x-1 active:translate-y-1">
                            <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                            </div>
                            <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                Equipo
                            </div>
                        </button>  
                    </Box>
                    <TableContainer>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell sx={{fontWeight:'bold' }}>#</TableCell>
                            <TableCell sx={{fontWeight:'bold' }}>Tipo de Equipo</TableCell>
                            <TableCell sx={{fontWeight:'bold' }}>Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItems.map((equipo, i) => (
                            <TableRow key={equipo.idTipoEquipo}>
                                <TableCell>{i+1}</TableCell>
                                <TableCell>{`${equipo.tipoEquipo}`}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-x-2">
                                        <button onClick={() => {editE(equipo)}} className="group relative  flex items-center justify-start w-fit px-3 py-1 bg-yellow-500 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                            <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M15.748 2.947a2 2 0 0 1 2.828 0l2.475 2.475a2 2 0 0 1 0 2.829L9.158 20.144l-6.38 1.076l1.077-6.38zm-.229 3.057l2.475 2.475l1.643-1.643l-2.475-2.474zm1.06 3.89l-2.474-2.475l-8.384 8.384l-.503 2.977l2.977-.502z"/>
                                                </svg>
                                                <span>Editar</span>
                                            </div>
                                        </button> 
                                        <button onClick={() => { deleteE(equipo) }} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-red-600 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                            <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"/></svg>
                                                <span>Eliminar</span>
                                            </div>
                                        </button>
                                    </div>                                </TableCell>
                            </TableRow>
                            ))}
                            {paginatedData.length === 0 && (
                                <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No hay resultados.
                                </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </TableContainer>
        
                    {/* Paginación debajo de la tabla */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Typography variant="body2">
                            Página {page} de {Math.ceil(filteredRows.length / rowsPerPage)}
                        </Typography>
                        <Pagination
                        sx={ { 
                                            '& .MuiPaginationItem-root svg': {
                                            fill: 'black', // 🔥 Esto cambia el color de las flechas SVG
                                            },
                                            '& .MuiPaginationItem-root.Mui-disabled svg': {
                                            fill: 'gray', // Opcional: flechas deshabilitadas
                                            },
                                            }}
                            count={Math.ceil(filteredRows.length / rowsPerPage)}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            color="primary"
                            siblingCount={2}   // Cuántas páginas mostrar a los lados de la actual
                            boundaryCount={2}  // Cuántas páginas mostrar al inicio y al final
                            showFirstButton    // (opcional) muestra el botón "Primera página"
                            showLastButton 
                        />

                    </Box>
                    {loading && (
                    <Loader/>
                    )}
        </div>
    )
}