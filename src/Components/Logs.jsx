import {React, useState, useEffect} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField,InputAdornment, Box } from "@mui/material";
import ModalNewColaborador from "./Modal/ModalNewColaborador";
import ModalEditColaborador from "./Modal/ModalEditColaborador";
import Swal from "sweetalert2";
import axios from "axios";

export default function Logs(){

    const API_URL = import.meta.env.VITE_API_URL;

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [itemsPerPage, setItemsPerPage] = useState(8); // Elementos por página
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda44

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem("token");

    useEffect(() => {
            setLoading(true);

                axios.get(`${API_URL}/api/Logs`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(res => {
                        setLoading(false);
                        setLogs(res.data)
                    });
        }, []);

    const filteredRows = logs.filter(item => 
        item.tabla.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.accion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.usuarioNombre.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
        // Definir el total de páginas
    const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
    
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

        

    return(
        <div className="container mx-auto p-6">
            <div className="bg-three text-white text-center py-3 px-4 rounded-t-xl flex items-center justify-between">
                <h2 className="text-2xl font-bold text-center pl-20">Logs</h2>
                <TextField onChange={(e) => setSearchTerm(e.target.value)} id="standard-basic" label="" variant="standard"  slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="end" className="p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34M208 336c-70.7 0-128-57.2-128-128c0-70.7 57.2-128 128-128c70.7 0 128 57.2 128 128c0 70.7-57.2 128-128 128"/></svg>
                        </InputAdornment>
                    ),
                },
            }} className="bg-white rounded-2xl"  sx={{
                "& .MuiInput-underline:before": { borderBottom: "none" },
                "& .MuiInput-underline:after": { borderBottom: "none" },
            }}/> 
            </div>

            <TableContainer>
                <Table sx={{minWidth:650}} aria-label="simple table">
                    <TableHead sx={{backgroundColor:'#26292c'}}>
                        <TableRow>
                            <TableCell sx={{color:'white', fontWeight:'bold', textAlign:'center'}}>Fecha</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold', textAlign:'center'}}>Tabla</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold', textAlign:'center'}}>Accion</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold', textAlign:'center'}}>Usuario</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold', textAlign:'center'}}>Registro</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((log, index) => (
                            <TableRow key={log.idLog}>
                                <TableCell sx={{textAlign:'center'}}>{new Date(log.fecha).toLocaleDateString("es-MX", { day: "2-digit", month: "2-digit", year: "numeric" })}</TableCell>
                                <TableCell sx={{textAlign:'center'}}>{log.tabla}</TableCell>
                                <TableCell sx={{textAlign:'center'}}>{log.accion}</TableCell>
                                <TableCell sx={{textAlign:'center'}}>{log.usuarioNombre}</TableCell>
                                <TableCell sx={{textAlign:'center'}}>
                                    {
                                        log.tabla === "Equipos" ? log.registroDatos?.activoFijo :
                                        log.tabla === "Correos" ? log.registroDatos?.correo :
                                        log.tabla === "Usuarios" ? log.registroDatos?.nombreCompleto :
                                        log.tabla === "Colaboradores" ? log.registroDatos?.nombreCompleto :
                                        log.tabla === "Areas" ? log.registroDatos?.nombreArea :
                                        log.tabla === "Extensiones" ? log.registroDatos?.extension :
                                        log.tabla === "Ubicaciones" ? log.registroDatos?.ubicacion :
                                        log.tabla === "Responsivas" ? log.registroDatos?.responsiva :
                                        ""
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                className="bg-three text-white rounded-b-xl"
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={itemsPerPage}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Filas por página"
                    sx={{color: '#FFFFFF'}}
            />
            {loading && (
                <div className="fixed inset-0 bg-black opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <svg className="animate-spin h-10 w-10 text-blue-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <p className="text-gray-700">Cargando...</p>
                    </div>
                </div>
            )}
        </div>
    )
}