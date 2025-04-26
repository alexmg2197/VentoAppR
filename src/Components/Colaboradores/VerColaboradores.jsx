import {React, useState, useEffect} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField,InputAdornment } from "@mui/material";
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

    useEffect(() => {
            setLoading(true);
            fetch(`${API_URL}/api/Colaboradores`)
            .then((response) => response.json())
            .then((data) => {setLoading(false); setColaboradores(data)});
        }, []);

    const filteredRows = colaboradores.filter((r) => 
        ["nombreColaborador", "apellidoColaborador", "puesto"]
        .some((campo) =>
        r[campo]?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
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
            console.log('datos')
            setModalNew(true)
        }

        const editC = (datos) =>{
            console.log(datos);
            setModalEdit(true);
            setColaborador(datos)
        }

        const deleteC = (datos) => {
            console.log(datos.idColaborador)
            Swal.fire({
                title: "¿Estas seguro que deseas eliminar al colaborador?",
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
                    console.log('aqui 1')
                    try {
                        console.log('aqui 2')
                        axios.patch(`${API_URL}/api/Colaboradores/EliminarColaborador/${datos.idColaborador}`)
                        console.log('aqui 3')
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
            <div className="flex justify-end bg-three relative pr-5">
                <div className="relative group">
                    <button onClick={()=>{newC()}} className="icon-button text-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                        <path fill="currentColor" fillRule="evenodd" d="M5.4 3h13.2A2.4 2.4 0 0 1 21 5.4v13.2a2.4 2.4 0 0 1-2.4 2.4H5.4A2.4 2.4 0 0 1 3 18.6V5.4A2.4 2.4 0 0 1 5.4 3M12 7a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 0 1 1-1" clipRule="evenodd"/>
                    </svg>
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-sm rounded px-2 py-1 whitespace-nowrap z-10">
                        Crear nuevo colaborador
                    </div>
                </div>
            </div>

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
                                    <button title="Editar" onClick={()=>{editC(colaborador)}} className='icon-button  cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="m2.292 13.36l4.523 4.756L.5 20zM12.705 2.412l4.522 4.755L7.266 17.64l-4.523-4.754zM16.142.348l2.976 3.129c.807.848.086 1.613.086 1.613l-1.521 1.6l-4.524-4.757L14.68.334l.02-.019c.119-.112.776-.668 1.443.033"/></svg></button>
                                    <button title="Eliminar" onClick={()=>{deleteC(colaborador)}} className='icon-button pl-3 pr-3 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="IconifyId19491a687d6412eb80"><g fill="none" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M9 10v34h30V10z"/><path stroke="#000" strokeLinecap="round" d="M20 20v13m8-13v13"/><path stroke="#fff" strokeLinecap="round" d="M4 10h40"/><path fill="#fff" stroke="#fff" d="m16 10l3.289-6h9.488L32 10z"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#IconifyId19491a687d6412eb80)"/></svg></button>
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