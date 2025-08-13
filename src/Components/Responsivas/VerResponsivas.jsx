import {React, useState, useEffect} from "react";
import Swal from "sweetalert2";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField,InputAdornment } from "@mui/material";
import ModalEditR from "../Modal/ModalEditR";
import ModalUploadR from "../Modal/ModalUploadR";
import ModalPrestamoEquipo from "../Modal/ModalPrestamoEquipo";
import {generarPDF} from "../PDFS/generarPDF"
import {generarPDFDevolucion} from "../PDFS/generarPDFDEvolucion"
import { generarPDFPrestamo } from "../PDFS/generarPDFPrestamo";
import Loader from "../Loader";
import axios from "axios";


export default function VerResponsiva() {

    const API_URL = import.meta.env.VITE_API_URL;
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const [responsivas, setResponsivas] = useState([]);
    const [responsiva, setResponsiva] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalUpload,setModalUpload] = useState(false);
    const [modalPrestamo,setModalPrestamo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [itemsPerPage, setItemsPerPage] = useState(5); // Elementos por página
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem("token");
    
    useEffect(() => {
      setLoading(true);
      fetch(`${API_URL}/api/Responsivas`,
        {
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
      )
        .then((response) => response.json())
        .then((data) => {setLoading(false); setResponsivas(data)});
    }, []);

          // Filtrar las filas de la tabla según el término de búsqueda
    // Función para aplicar el filtro y devolver las filas filtradas
    const filteredRows = responsivas.filter((r) => 
      ["tipoResponsiva", "estado", "placaActivo"]
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

    const editR = (datos) =>{
    setResponsiva(datos);
    setModalEdit(true)
    }

    const uploadR = (datos) =>{
    setModalUpload(true)
    setResponsiva(datos);
    }

    const deleteR = async (datos) => {
    const result = await Swal.fire({
      title: "¿Estas seguro que deseas eliminar esta responsiva?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar"
    })
      if (result.isConfirmed) {
        setLoading(true);

        try{
          const res = await axios.patch(`${API_URL}/api/Responsivas/EliminarResponsiva/${datos.idResponsiva}`,{},
            {
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
          )
          await Swal.fire({
              title: "¡Éxito!",
              text: "Responsiva eliminada correctamente.",
              icon: "success",
              confirmButtonText: "OK"
          }).then(() => {
              window.location.reload(); // Recargar la página
          });
        }catch(error){
          Swal.fire({
                title: "Error",
                text: "Hubo un error al eliminar los datos",
                icon: "error",
                confirmButtonText: "OK"
            })
        }finally {
          setLoading(false);
          
      }
        
      }
    }

    const viewR = (datos) => {
      generarPDF(datos,true)
    }

    const viewRF = (responsiva) =>{
      const archivoUrl = API_URL + responsiva.docResponsiva;
    
      // Obtener la extensión del archivo
      const extension = archivoUrl.split('.').pop().toLowerCase();
  
      // Si el archivo es un PDF, abrirlo en el visor de PDF del navegador
      if (extension === 'pdf') {
        window.open(archivoUrl, '_blank');
      }
      // Si el archivo es una imagen, abrirlo en una nueva ventana
      else if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
        window.open(archivoUrl, '_blank');
      }
      // Para otros tipos de archivos, puedes abrir el archivo en una nueva ventana o dar un mensaje
      else {
        Swal.fire({
          title: "Este tipo de archivo no es compatible para ver directamente.",
          icon: "error",
          draggable: true
        });
      }
    }

    const devoR = (datos) =>{
      
      Swal.fire({
        title: `<strong>Devolución de equipo de: </strong> ${datos.colaborador.nombre} ${datos.colaborador.apellido}`,
        icon: "info",
        text:``,
        html: `
          <textarea id="mensajeTextarea" rows="5" style="width:100%" placeholder="Escribe tus observaciones..."></textarea>
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
          <i class="fa fa-paper-plane"></i> Enviar
        `,
        cancelButtonText: `
          <i class="fa fa-times"></i> Cancelar
        `,
        preConfirm: () => {
          const mensaje = document.getElementById("mensajeTextarea").value; false;
          return mensaje; // Devuelve el valor para usarlo en .then()
        }
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`${API_URL}/api/Responsivas/DevolverEquipo`, {
            ResponsivaAsignacionId:datos.idResponsiva,
            Observaciones: result.value,
          },{
            headers:{
                    Authorization: `Bearer ${token}`,
                }
          })
          .then(async(response) => {
            Swal.fire("¡Éxito!", "Equipo devuelto correctamente.", "success");
            await generarPDFDevolucion(datos,true)
            window.location.reload();
          })
          .catch(error => {
            Swal.fire("Error", "El equipo no se pudo devolver.", "error");
          });
        }
      });
    }

    const viewRDF = (responsiva) => {
      const archivoUrl = API_URL + responsiva.docResponsiva;
    
      // Obtener la extensión del archivo
      const extension = archivoUrl.split('.').pop().toLowerCase();
  
      // Si el archivo es un PDF, abrirlo en el visor de PDF del navegador
      if (extension === 'pdf') {
        window.open(archivoUrl, '_blank');
      }
      // Si el archivo es una imagen, abrirlo en una nueva ventana
      else if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
        window.open(archivoUrl, '_blank');
      }
      // Para otros tipos de archivos, puedes abrir el archivo en una nueva ventana o dar un mensaje
      else {
        Swal.fire({
          title: "Este tipo de archivo no es compatible para ver directamente.",
          icon: "error",
          draggable: true
        });
      }
    }

    const viewRD = (datos) =>{
      generarPDFDevolucion(datos,true)
    }

    const newResponsiva = () => {
      setModalPrestamo(true)
    }

    const viewRP = (datos) => {
      generarPDFPrestamo(datos,true)
    }
      
    return(
        <div className="p-4">
          {
                modalEdit && <ModalEditR modal={setModalEdit} responsiva={responsiva}/>
          }
          {
            modalUpload && <ModalUploadR modal={setModalUpload} responsiva={responsiva}/>
          }
          {
            modalPrestamo && <ModalPrestamoEquipo modal={setModalPrestamo}/>
          }
           <div className="bg-three text-white py-3 rounded-t-xl flex items-center justify-between px-4">
                <h2 className="text-2xl font-bold text-center flex-1">Responsiva de equipo de computo</h2>
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
                <button onClick={()=>{newResponsiva()}} className="group mr-3 mb-3 flex items-center justify-start w-11 h-8 bg-green-500 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-38 hover:rounded-lg active:translate-x-1 active:translate-y-1">
                    <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3 text-three">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                    </div>
                    <div className="absolute right-5 transform translate-x-full opacity-0 text-three text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        Responsiva
                    </div>
                </button>  
            </Box>
        <TableContainer component={Paper} className=" overflow-hidden">
          <Table className="min-w-full">
            <TableHead className="bg-five">
              <TableRow>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>Nombre del Responsable</TableCell>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>Área del Responsable</TableCell>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>Responsable del Área</TableCell>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>Marca</TableCell>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>Modelo</TableCell>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>No de Serie</TableCell>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>Sistema Operativo</TableCell>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>RAM</TableCell>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>Procesador</TableCell>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>Disco Duro</TableCell>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>Placa Activo</TableCell>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>Tipo de Responsiva</TableCell>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>Estado</TableCell>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {currentItems.map((responsiva, index) => (
                <TableRow key={responsiva.idResponsiva}>
                    <TableCell>{responsiva.colaborador.nombre + ' ' + responsiva.colaborador.apellido}</TableCell>
                    <TableCell>{responsiva.colaborador.area}</TableCell>
                    <TableCell>{responsiva.colaborador.responsableArea}</TableCell>
                    <TableCell>{responsiva.equipo[0].marca}</TableCell>
                    <TableCell>{responsiva.equipo[0].modeloEquipo}</TableCell>
                    <TableCell>{responsiva.equipo[0].nSerie}</TableCell>
                    <TableCell>{responsiva.equipo[0].sistemaOperativo}</TableCell>
                    <TableCell>{responsiva.equipo[0].ram}</TableCell>
                    <TableCell>{responsiva.equipo[0].procesador}</TableCell>
                    <TableCell>{responsiva.equipo[0].almacenamientos.map((alm, idx) => (
                      <div key={idx}>{alm}</div>
                    ))}</TableCell>
                    <TableCell>{responsiva.equipo[0].activoFijo}</TableCell>
                    <TableCell>{responsiva.tipoResponsiva}</TableCell>
                    <TableCell>{responsiva.estado}</TableCell>
                    <TableCell>
                      {
                      ((responsiva.docResponsiva === '' || responsiva.docResponsiva=== null && responsiva.tipoResponsiva === 'Asignación') ?
                      (
                        <div className="flex flex-col items-center justify-center gap-y-1">
                            <button onClick={() => { viewR(responsiva) }} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-three rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>
                                    <span>Responsiva</span>
                                </div>
                            </button> 
                            {
                              user.rol != 'Analista' && (
                                <button onClick={() => {deleteR(responsiva)}} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-red-600 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                    <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"/></svg>
                                        <span>Eliminar</span>
                                    </div>
                                </button> 
                              )
                            }
                            <button onClick={() => { uploadR(responsiva) }} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-yellow-600 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M1.44.44A1.5 1.5 0 0 1 2.5 0h6a.5.5 0 0 1 .354.146l4 4A.5.5 0 0 1 13 4.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 12.5v-11c0-.398.158-.78.44-1.06m5.747 2.993l.104.104c.116.076.216.176.292.292l1.854 1.854a.625.625 0 0 1-.442 1.067h-1.25v3.625a1 1 0 1 1-2 0V6.75h-1.25a.625.625 0 0 1-.442-1.067L5.907 3.83c.076-.116.176-.216.292-.292l.104-.104a.625.625 0 0 1 .884 0Z" clipRule="evenodd"/></svg>
                                    <span>Subir Firmada</span>
                                </div>
                            </button> 
                        </div>
                        // <>
                        // <button onClick={()=>{viewR(responsiva)}} title="Ver Responsiva" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg></button>
                        // <button onClick={()=>{deleteR(responsiva)}} title="Eliminar Responsiva" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="IconifyId19491a687d6412eb80"><g fill="none" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M9 10v34h30V10z"/><path stroke="#000" strokeLinecap="round" d="M20 20v13m8-13v13"/><path stroke="#fff" strokeLinecap="round" d="M4 10h40"/><path fill="#fff" stroke="#fff" d="m16 10l3.289-6h9.488L32 10z"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#IconifyId19491a687d6412eb80)"/></svg></button>
                        // <button onClick={()=>{uploadR(responsiva)}} title="Subir Responsiva Firmada" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M1.44.44A1.5 1.5 0 0 1 2.5 0h6a.5.5 0 0 1 .354.146l4 4A.5.5 0 0 1 13 4.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 12.5v-11c0-.398.158-.78.44-1.06m5.747 2.993l.104.104c.116.076.216.176.292.292l1.854 1.854a.625.625 0 0 1-.442 1.067h-1.25v3.625a1 1 0 1 1-2 0V6.75h-1.25a.625.625 0 0 1-.442-1.067L5.907 3.83c.076-.116.176-.216.292-.292l.104-.104a.625.625 0 0 1 .884 0Z" clipRule="evenodd"/></svg></button>
                        // </>
                      ):((responsiva.docResponsiva === '' || responsiva.docResponsiva=== null && responsiva.tipoResponsiva === 'Devolución') ?
                      (
                        <div className="flex flex-col items-center justify-center gap-y-1">
                            <button onClick={() => { viewRD(responsiva) }} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-three rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>
                                    <span>Devolución</span>
                                </div>
                            </button> 
                            <button onClick={() => { uploadR(responsiva) }} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-yellow-600 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M1.44.44A1.5 1.5 0 0 1 2.5 0h6a.5.5 0 0 1 .354.146l4 4A.5.5 0 0 1 13 4.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 12.5v-11c0-.398.158-.78.44-1.06m5.747 2.993l.104.104c.116.076.216.176.292.292l1.854 1.854a.625.625 0 0 1-.442 1.067h-1.25v3.625a1 1 0 1 1-2 0V6.75h-1.25a.625.625 0 0 1-.442-1.067L5.907 3.83c.076-.116.176-.216.292-.292l.104-.104a.625.625 0 0 1 .884 0Z" clipRule="evenodd"/></svg>
                                    <span>Subir</span>
                                </div>
                            </button>
                        </div>
                        // <>
                        // <button onClick={()=>{viewRD(responsiva)}} title="Ver Responsiva de Devolución" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg></button>
                        // <button onClick={()=>{uploadR(responsiva)}} title="Subir Responsiva Firmada de Devolucion" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M1.44.44A1.5 1.5 0 0 1 2.5 0h6a.5.5 0 0 1 .354.146l4 4A.5.5 0 0 1 13 4.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 12.5v-11c0-.398.158-.78.44-1.06m5.747 2.993l.104.104c.116.076.216.176.292.292l1.854 1.854a.625.625 0 0 1-.442 1.067h-1.25v3.625a1 1 0 1 1-2 0V6.75h-1.25a.625.625 0 0 1-.442-1.067L5.907 3.83c.076-.116.176-.216.292-.292l.104-.104a.625.625 0 0 1 .884 0Z" clipRule="evenodd"/></svg></button>
                        // </>
                      ):((responsiva.estado === "Terminada" || (responsiva.tipoResponsiva === "Devolución" && responsiva.estado ==="Firmada")) ?
                        (
                          <div className="flex flex-col items-center justify-center gap-y-1">
                            <button onClick={() => { viewRF(responsiva) }} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-three rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                    <svg className="" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18c.56 0 1 .44 1 1s-.44 1-1 1s-1-.44-1-1s.44-1 1-1m0-3c-2.73 0-5.06 1.66-6 4c.94 2.34 3.27 4 6 4s5.06-1.66 6-4c-.94-2.34-3.27-4-6-4m0 6.5a2.5 2.5 0 0 1-2.5-2.5a2.5 2.5 0 0 1 2.5-2.5a2.5 2.5 0 0 1 2.5 2.5a2.5 2.5 0 0 1-2.5 2.5m-7.86-1.75L8.85 19l.29-.74C10.43 15.06 13.5 13 17 13c1.05 0 2.06.21 3 .56V8l-6-6H6c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h4.5c-.55-.66-1-1.42-1.36-2.25M13 3.5L18.5 9H13z"/></svg>
                                    <span>Firmada</span>
                                </div>
                            </button> 
                          </div>
                        // <button onClick={() => {viewRF(responsiva)}} title="Ver Responsiva Firmada" className='icon-button p-1 cursor-pointer'>
                        //   <svg className="" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18c.56 0 1 .44 1 1s-.44 1-1 1s-1-.44-1-1s.44-1 1-1m0-3c-2.73 0-5.06 1.66-6 4c.94 2.34 3.27 4 6 4s5.06-1.66 6-4c-.94-2.34-3.27-4-6-4m0 6.5a2.5 2.5 0 0 1-2.5-2.5a2.5 2.5 0 0 1 2.5-2.5a2.5 2.5 0 0 1 2.5 2.5a2.5 2.5 0 0 1-2.5 2.5m-7.86-1.75L8.85 19l.29-.74C10.43 15.06 13.5 13 17 13c1.05 0 2.06.21 3 .56V8l-6-6H6c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h4.5c-.55-.66-1-1.42-1.36-2.25M13 3.5L18.5 9H13z"/></svg>
                        // </button>
                        ) : (responsiva.docResponsiva === '' || responsiva.docResponsiva=== null && responsiva.tipoResponsiva === 'Prestamo') 
                        ?
                        (
                          <div className="flex flex-col items-center justify-center gap-y-1">
                            <button onClick={() => { viewRP(responsiva) }} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-three rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>
                                    <span>Prestamo</span>
                                </div>
                            </button> 
                            <button onClick={() => {deleteR(responsiva)}} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-red-600 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                              <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"/></svg>
                                  <span>Eliminar</span>
                              </div>
                            </button> 
                            <button onClick={() => { uploadR(responsiva) }} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-yellow-600 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M1.44.44A1.5 1.5 0 0 1 2.5 0h6a.5.5 0 0 1 .354.146l4 4A.5.5 0 0 1 13 4.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 12.5v-11c0-.398.158-.78.44-1.06m5.747 2.993l.104.104c.116.076.216.176.292.292l1.854 1.854a.625.625 0 0 1-.442 1.067h-1.25v3.625a1 1 0 1 1-2 0V6.75h-1.25a.625.625 0 0 1-.442-1.067L5.907 3.83c.076-.116.176-.216.292-.292l.104-.104a.625.625 0 0 1 .884 0Z" clipRule="evenodd"/></svg>
                                    <span>Subir</span>
                                </div>
                            </button> 
                          </div>
                          // <>
                          //   <button onClick={()=>{viewRP(responsiva)}} title="Ver Responsiva" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg></button>
                          //   <button onClick={()=>{deleteR(responsiva)}} title="Eliminar Responsiva" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="IconifyId19491a687d6412eb80"><g fill="none" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M9 10v34h30V10z"/><path stroke="#000" strokeLinecap="round" d="M20 20v13m8-13v13"/><path stroke="#fff" strokeLinecap="round" d="M4 10h40"/><path fill="#fff" stroke="#fff" d="m16 10l3.289-6h9.488L32 10z"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#IconifyId19491a687d6412eb80)"/></svg></button>
                          //   <button onClick={()=>{uploadR(responsiva)}} title="Subir Responsiva Firmada" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M1.44.44A1.5 1.5 0 0 1 2.5 0h6a.5.5 0 0 1 .354.146l4 4A.5.5 0 0 1 13 4.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 12.5v-11c0-.398.158-.78.44-1.06m5.747 2.993l.104.104c.116.076.216.176.292.292l1.854 1.854a.625.625 0 0 1-.442 1.067h-1.25v3.625a1 1 0 1 1-2 0V6.75h-1.25a.625.625 0 0 1-.442-1.067L5.907 3.83c.076-.116.176-.216.292-.292l.104-.104a.625.625 0 0 1 .884 0Z" clipRule="evenodd"/></svg></button>
                          // </>
                        ):
                      (
                        <div className="flex flex-col items-center justify-center gap-y-1">
                            <button onClick={() => { viewRF(responsiva) }} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-three rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                    <svg className="" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18c.56 0 1 .44 1 1s-.44 1-1 1s-1-.44-1-1s.44-1 1-1m0-3c-2.73 0-5.06 1.66-6 4c.94 2.34 3.27 4 6 4s5.06-1.66 6-4c-.94-2.34-3.27-4-6-4m0 6.5a2.5 2.5 0 0 1-2.5-2.5a2.5 2.5 0 0 1 2.5-2.5a2.5 2.5 0 0 1 2.5 2.5a2.5 2.5 0 0 1-2.5 2.5m-7.86-1.75L8.85 19l.29-.74C10.43 15.06 13.5 13 17 13c1.05 0 2.06.21 3 .56V8l-6-6H6c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h4.5c-.55-.66-1-1.42-1.36-2.25M13 3.5L18.5 9H13z"/></svg>
                                    <span>Firmada</span>
                                </div>
                            </button> 
                            <button onClick={() => { devoR(responsiva) }} className="group relative flex items-center justify-start w-fit px-3 py-1 bg-fuchsia-800 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                <div className="flex items-center space-x-1 text-white text-xs font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 20 20"><path fill="currentColor" d="M19 5.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-2.147.354l.003-.003A.5.5 0 0 0 17 5.503v-.006a.5.5 0 0 0-.146-.35l-2-2a.5.5 0 0 0-.708.707L15.293 5H12.5a.5.5 0 0 0 0 1h2.793l-1.147 1.146a.5.5 0 0 0 .708.708zM14.5 11c1.33 0 2.55-.472 3.5-1.257V13.5a1.5 1.5 0 0 1-1.5 1.5H13v2h1.5a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1H7v-2H3.5A1.5 1.5 0 0 1 2 13.5v-10A1.5 1.5 0 0 1 3.5 2h6.757a5.5 5.5 0 0 0 4.243 9M12 17v-2H8v2z"/></svg>
                                    <span>Devolver Equipo</span>
                                </div>
                            </button> 
                        </div>
                        // <>
                        //   <button onClick={() => {viewRF(responsiva)}} title="Ver Responsiva Firmada" className='icon-button p-1 cursor-pointer'>
                        //     <svg className="" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18c.56 0 1 .44 1 1s-.44 1-1 1s-1-.44-1-1s.44-1 1-1m0-3c-2.73 0-5.06 1.66-6 4c.94 2.34 3.27 4 6 4s5.06-1.66 6-4c-.94-2.34-3.27-4-6-4m0 6.5a2.5 2.5 0 0 1-2.5-2.5a2.5 2.5 0 0 1 2.5-2.5a2.5 2.5 0 0 1 2.5 2.5a2.5 2.5 0 0 1-2.5 2.5m-7.86-1.75L8.85 19l.29-.74C10.43 15.06 13.5 13 17 13c1.05 0 2.06.21 3 .56V8l-6-6H6c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h4.5c-.55-.66-1-1.42-1.36-2.25M13 3.5L18.5 9H13z"/></svg>
                        //   </button>
                        //   <button onClick={()=>{devoR(responsiva)}} title="Devolución de Equipo" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 20 20"><path fill="currentColor" d="M19 5.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-2.147.354l.003-.003A.5.5 0 0 0 17 5.503v-.006a.5.5 0 0 0-.146-.35l-2-2a.5.5 0 0 0-.708.707L15.293 5H12.5a.5.5 0 0 0 0 1h2.793l-1.147 1.146a.5.5 0 0 0 .708.708zM14.5 11c1.33 0 2.55-.472 3.5-1.257V13.5a1.5 1.5 0 0 1-1.5 1.5H13v2h1.5a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1H7v-2H3.5A1.5 1.5 0 0 1 2 13.5v-10A1.5 1.5 0 0 1 3.5 2h6.757a5.5 5.5 0 0 0 4.243 9M12 17v-2H8v2z"/></svg></button>
                        // </>
                      )
                      )))
                      
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