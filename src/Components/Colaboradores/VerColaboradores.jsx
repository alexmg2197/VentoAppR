import {React, useState, useEffect} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField,InputAdornment, Box } from "@mui/material";
import ModalNewColaborador from "../Modal/ModalNewColaborador";
import ModalEditColaborador from "../Modal/ModalEditColaborador";
import Swal from "sweetalert2";
import axios from "axios";

export default function VerColaboradores(){

    const API_URL = import.meta.env.VITE_API_URL;

    const [colaboradores, setColaboradores] = useState([]);
    const [colaborador, setColaborador] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalNew, setModalNew] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [itemsPerPage, setItemsPerPage] = useState(5); // Elementos por página
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda44

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem("token");

    useEffect(() => {
            setLoading(true);

                axios.get(`${API_URL}/api/Colaboradores`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(res => {
                        setLoading(false);
                        setColaboradores(res.data)
                    });
        }, []);

    const filteredRows = colaboradores.filter(item => 
        item.nombreColaborador.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.apellidoColaborador.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.puesto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ubicacion.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.area.nombreArea.toLowerCase().includes(searchTerm.toLowerCase())
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

        const newC = () =>{
            setModalNew(true)
        }

        const editC = (datos) =>{
            setModalEdit(true);
            setColaborador(datos)
        }

        const deleteC = (datos) => {
            Swal.fire({
                title: `¿Estas seguro que deseas eliminar al colaborador ${datos.nombreColaborador + ' ' + datos.apellidoColaborador}?`,
                text: "Esta acción no se puede revertir!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, Eliminar",
                cancelButtonText: "Cancelar"
                }).then((result) => {
                if (result.isConfirmed) {
                    setLoading(true);
                    try {
                        axios.patch(`${API_URL}/api/Colaboradores/EliminarColaborador/${datos.idColaborador}`)
                        Swal.fire({
                                title: "¡Éxito!",
                                text: "Colaborador eliminado correctamente.",
                                icon: "success",
                                confirmButtonText: "OK"
                            }).then(() => {
                                window.location.reload(); // Recargar la página
                            });
                        } catch (error) {
                        console.error(error)
                            Swal.fire({
                                    title: "Error",
                                    text: "Hubo un error al eliminar los datos",
                                    icon: "error",
                                    confirmButtonText: "OK"
                                })
                        } finally {
                        setLoading(false);
                    
                }
            }
            });
        }

    return(
        <div className="container mx-auto p-6">
            {
                modalNew && <ModalNewColaborador modal={setModalNew} />
            }
            {
                modalEdit && <ModalEditColaborador modal={setModalEdit} colaborador={colaborador} />
            }
            <div className="bg-three text-white text-center py-3 px-4 rounded-t-xl flex items-center justify-between">
                <h2 className="text-2xl font-bold text-center pl-20">Colaboradores</h2>
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} className="bg-three">
                <button onClick={()=>{newC()}} className="group mr-3 mb-3 flex items-center justify-start w-11 h-8 bg-green-500 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-40 hover:rounded-lg active:translate-x-1 active:translate-y-1">
                    <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3 text-three">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                    </div>
                    <div className="absolute right-5 transform translate-x-full opacity-0 text-three text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        Colaborador
                    </div>
                </button>  
            </Box>

            <TableContainer>
                <Table sx={{minWidth:650}} aria-label="simple table">
                    <TableHead sx={{backgroundColor:'#26292c'}}>
                        <TableRow>
                            <TableCell sx={{color:'white', fontWeight:'bold', textAlign:'center'}}>Nombre</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold', textAlign:'center'}}>Puesto</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold', textAlign:'center'}}>Area</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold', textAlign:'center'}}>Ubicacíon</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold', textAlign:'center'}}>Opciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((colaborador, index) => (
                            <TableRow key={colaborador.idColaborador}>
                                <TableCell sx={{textAlign:'center'}}>{colaborador.nombreColaborador + ' ' + colaborador.apellidoColaborador}</TableCell>
                                <TableCell sx={{textAlign:'center'}}>{colaborador.puesto}</TableCell>
                                <TableCell sx={{textAlign:'center'}}>{colaborador.area.nombreArea}</TableCell>
                                <TableCell sx={{textAlign:'center'}}>{colaborador.ubicacion.ubicacion}</TableCell>
                                <TableCell sx={{textAlign:'center'}}>
                                    <div className="flex items-center justify-center gap-x-2">
                                        <button onClick={() => {editC(colaborador)}} className="group relative  flex items-center justify-start w-fit px-3 py-1 bg-yellow-500 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                            <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M15.748 2.947a2 2 0 0 1 2.828 0l2.475 2.475a2 2 0 0 1 0 2.829L9.158 20.144l-6.38 1.076l1.077-6.38zm-.229 3.057l2.475 2.475l1.643-1.643l-2.475-2.474zm1.06 3.89l-2.474-2.475l-8.384 8.384l-.503 2.977l2.977-.502z"/>
                                                </svg>
                                                <span>Editar</span>
                                            </div>
                                        </button> 
                                        {
                                            user.rol != 'Analista' && (
                                                <button onClick={() => { deleteC(colaborador) }} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-red-600 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                                    <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"/></svg>
                                                        <span>Eliminar</span>
                                                    </div>
                                                </button> 
                                            )
                                        }
                                    </div>
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