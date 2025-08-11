import {React, useState, useEffect} from "react";
import Swal from "sweetalert2";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField,InputAdornment } from "@mui/material";
import ModalEditEquipo from "../Modal/ModalEditEquipo";
import ModalAsignarEquipo from "../Modal/ModalAsignarEquipo";
import Loader from "../Loader";
import axios from "axios";

export default function VerEquipos(){

        const API_URL = import.meta.env.VITE_API_URL;

        const [equipos, setEquipos] = useState([]);
        const [equipo, setEquipo] = useState([]);
        const [ismodal, setIsModal] = useState(false);
        const [modalEdit, setModalEdit] = useState(false);
        const [modalAsignar, setModalAsignar] = useState(false);
        const [loading, setLoading] = useState(false);
        const [currentPage, setCurrentPage] = useState(0); // Página actual
        const [itemsPerPage, setItemsPerPage] = useState(5); // Elementos por página
        const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda44

        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem("token");

        useEffect(() => {
              setLoading(true);
              fetch(`${API_URL}/api/Equipos/EquiposCompletos`,
                {
                  headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
              )
                .then((response) => response.json())
                .then((data) => {setLoading(false); setEquipos(data)});
            }, []);

         // Filtrar las filas de la tabla según el término de búsqueda
          // Función para aplicar el filtro y devolver las filas filtradas
          const filteredRows = equipos.filter((r) => 
            ["usuario", "ubicacion", "activoFijo"]
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
        
          const editE = (datos) =>{
          setEquipo(datos);
          setIsModal(true)
          setModalEdit(true);
          }
        
          const deleteE = (datos) => {
          Swal.fire({
            title: "¿Estas seguro que deseas eliminar este equipo?",
            text: "Esta acción no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "Cancelar"
          }).then(async (result) => {
            if (result.isConfirmed) {
              setLoading(true);
              try {
                const response = await axios.delete(`${API_URL}/api/Equipos/EliminarEquipo/${datos.idEquipo}`);
                setLoading(false);
                  Swal.fire({
                    title: "Eliminada",
                    text: response.data.message,
                    icon: "success"
                  }).then((result)=>{
                    if(result.isConfirmed){
                      window.location.reload();
                    }
                  });
              } catch (error) {
                setLoading(false);
                Swal.fire({
                  title: "No se pudo eliminar el equipo " + error,
                  icon: "error",
                  draggable: true
                });
              }
              
            }
          });
          }

          const newE = () =>{
            setEquipo(null);
            setIsModal(false)
            setModalEdit(true);
          }

          const asignarE = (datos) =>{
            setModalAsignar(true)
            setEquipo(datos);
          }

    return(
            <div className="container mx-auto pb-6">
              {
                modalEdit && <ModalEditEquipo modal={setModalEdit} equipo={equipo} isEdit={ismodal}/>
              }
              {
                modalAsignar && <ModalAsignarEquipo modal={setModalAsignar} equipo={equipo} />
              }
              <div className="bg-three text-white py-3 px-4 rounded-t-xl flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-center flex-1">Equipos de computo</h2>
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
                    <button onClick={()=>{newE()}} className="group mr-3 mb-3 flex items-center justify-start w-11 h-8 bg-green-500 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-30 hover:rounded-lg active:translate-x-1 active:translate-y-1">
                        <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3 text-three">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                        </div>
                        <div className="absolute right-5 transform translate-x-full opacity-0 text-three text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                            Equipo
                        </div>
                    </button>  
                </Box>
            <TableContainer component={Paper} className="">
              <Table className="">
                <TableHead className="bg-five">
                  <TableRow>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Equipo</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Marca</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>No de Serie</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Procesador</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>RAM</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Almacenamiento</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Activo Fijo</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Monitor</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Marca Monitor</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Teclado</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Marca Teclado</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Mouse</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Marca Mouse</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Diadema</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Marca Diadema</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Estado</TableCell>
                    <TableCell sx={{color:'white', fontWeight:'bold' }}>Opciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {currentItems.map((equipo, index) => (
                    <TableRow key={equipo.idEquipo}>
                        <TableCell>{equipo.tipoEquipo}</TableCell>
                        <TableCell>{equipo.marcaEquipo}</TableCell>
                        <TableCell>{equipo.nSerie}</TableCell>
                        <TableCell>{equipo.procesador}</TableCell>
                        <TableCell>{equipo.ram}</TableCell>
                        <TableCell>{equipo.almacenamientos?.map((alm, idx) => (
                          <div key={idx}>{`${alm.capacidad} ${alm.tipo}`}</div>
                        ))}</TableCell>
                        <TableCell>{equipo.activoFijo}</TableCell>
                        <TableCell>{equipo.monitor ? 'Si':'No'}</TableCell>
                        <TableCell>{equipo.monitor ? equipo.marcaMonitor:'N/A'}</TableCell>
                        <TableCell>{equipo.teclado ? 'Si':'No'}</TableCell>
                        <TableCell>{equipo.teclad ? equipo.marcaMonitor:'N/A'}</TableCell>
                        <TableCell>{equipo.mouse ? 'Si' : 'No'}</TableCell>
                        <TableCell>{equipo.mouse ? equipo.marcaMouse : 'N/A'}</TableCell>
                        <TableCell>{equipo.diadema ? 'Si' : 'No'}</TableCell>
                        <TableCell>{equipo.diadema ? equipo.marcaDiadema : 'N/A'}</TableCell>
                        <TableCell>{equipo.estado}</TableCell>
                        <TableCell>
                          {
                            (equipo.colaboradorNombre == null || equipo.colaboradorNombre == ' ' || equipo.colaboradorNombre == '') ?
                            (
                              <div className="flex flex-col items-center justify-center gap-y-1">
                                    <button onClick={() => { asignarE(equipo) }} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-three rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                        <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M7.5 14.4c-.8-.8-.8-2 0-2.8s2-.8 2.8 0l.6.6l1.9-2.1c-.7-.4-1.3-.4-2-.4c-.7-.1-1.4-.3-1.4-.9s.8-.4 1.4-1.5c0 0 2.7-7.3-2.9-7.3c-5.5 0-2.8 7.3-2.8 7.3c.6 1 1.4.8 1.4 1.5s-.7.7-1.4.8C4 9.7 3 9.5 2 11.3c-.6 1.1-.9 4.7-.9 4.7h8zm5.3 1.6h2.1s-.1-.9-.2-2z"/><path fill="currentColor" d="M11 16c-.3 0-.5-.1-.7-.3l-2-2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l1.3 1.3l3.3-3.6c.4-.4 1-.4 1.4-.1c.4.4.4 1 .1 1.4l-4 4.3c-.3.3-.5.4-.8.4"/></svg>
                                            <span>Asignar</span>
                                        </div>
                                    </button> 
                                    <button onClick={() => {editE(equipo)}} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-orange-400 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                        <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M15.748 2.947a2 2 0 0 1 2.828 0l2.475 2.475a2 2 0 0 1 0 2.829L9.158 20.144l-6.38 1.076l1.077-6.38zm-.229 3.057l2.475 2.475l1.643-1.643l-2.475-2.474zm1.06 3.89l-2.474-2.475l-8.384 8.384l-.503 2.977l2.977-.502z"/>
                                            </svg>
                                            <span>Editar</span>
                                        </div>
                                    </button> 
                                    {
                                      user.rol != 'Analista' && (
                                        <button onClick={() => { deleteE(equipo) }} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-red-600 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                            <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"/></svg>
                                                <span>Eliminar</span>
                                            </div>
                                        </button> 
                                      )
                                    }
                                </div>
                              // <>
                              //   <button onClick={()=>{asignarE(equipo)}} title="Asignar Equipo" className='icon-button p-1'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M7.5 14.4c-.8-.8-.8-2 0-2.8s2-.8 2.8 0l.6.6l1.9-2.1c-.7-.4-1.3-.4-2-.4c-.7-.1-1.4-.3-1.4-.9s.8-.4 1.4-1.5c0 0 2.7-7.3-2.9-7.3c-5.5 0-2.8 7.3-2.8 7.3c.6 1 1.4.8 1.4 1.5s-.7.7-1.4.8C4 9.7 3 9.5 2 11.3c-.6 1.1-.9 4.7-.9 4.7h8zm5.3 1.6h2.1s-.1-.9-.2-2z"/><path fill="currentColor" d="M11 16c-.3 0-.5-.1-.7-.3l-2-2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l1.3 1.3l3.3-3.6c.4-.4 1-.4 1.4-.1c.4.4.4 1 .1 1.4l-4 4.3c-.3.3-.5.4-.8.4"/></svg></button>
                              //   <button onClick={()=>{editE(equipo)}} title="Editar Equipo" className='icon-button p-1'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="m2.292 13.36l4.523 4.756L.5 20zM12.705 2.412l4.522 4.755L7.266 17.64l-4.523-4.754zM16.142.348l2.976 3.129c.807.848.086 1.613.086 1.613l-1.521 1.6l-4.524-4.757L14.68.334l.02-.019c.119-.112.776-.668 1.443.033"/></svg></button>
                              //   <button onClick={()=>{deleteE(equipo)}} title="Eliminar Equipo" className='icon-button p-1'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="IconifyId19491a687d6412eb80"><g fill="none" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M9 10v34h30V10z"/><path stroke="#000" strokeLinecap="round" d="M20 20v13m8-13v13"/><path stroke="#fff" strokeLinecap="round" d="M4 10h40"/><path fill="#fff" stroke="#fff" d="m16 10l3.289-6h9.488L32 10z"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#IconifyId19491a687d6412eb80)"/></svg></button>
                              // </>
                            ):(
                              <>
                                {/* <button onClick={()=>{editE(equipo)}} className='icon-button p-1'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="m2.292 13.36l4.523 4.756L.5 20zM12.705 2.412l4.522 4.755L7.266 17.64l-4.523-4.754zM16.142.348l2.976 3.129c.807.848.086 1.613.086 1.613l-1.521 1.6l-4.524-4.757L14.68.334l.02-.019c.119-.112.776-.668 1.443.033"/></svg></button>
                                <button onClick={()=>{deleteE(equipo)}} className='icon-button p-1'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="IconifyId19491a687d6412eb80"><g fill="none" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M9 10v34h30V10z"/><path stroke="#000" strokeLinecap="round" d="M20 20v13m8-13v13"/><path stroke="#fff" strokeLinecap="round" d="M4 10h40"/><path fill="#fff" stroke="#fff" d="m16 10l3.289-6h9.488L32 10z"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#IconifyId19491a687d6412eb80)"/></svg></button> */}
                              </>
                            )
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
              <Loader/>
            )}
          </div>
      );
}