import {React, useState, useEffect} from "react";
import Swal from "sweetalert2";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField,InputAdornment } from "@mui/material";
import ModalEditR from "../Modal/ModalEditR";
import ModalUploadR from "../Modal/ModalUploadR";
import ModalPrestamoEquipo from "../Modal/ModalPrestamoEquipo";
import {generarPDF} from "../PDFS/generarPDF"
import {generarPDFDevolucion} from "../PDFS/generarPDFDEvolucion"
import { generarPDFPrestamo } from "../PDFS/generarPDFPrestamo";
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
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda44
    
    useEffect(() => {
      setLoading(true);
      fetch(`${API_URL}/api/Responsivas`)
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
    console.log(datos)
    setResponsiva(datos);
    setModalEdit(true)
    }

    const uploadR = (datos) =>{
    setModalUpload(true)
    setResponsiva(datos);
    }

    const deleteR = (datos) => {
    Swal.fire({
      title: "¿Estas seguro que deseas eliminar esta responsiva?",
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

        try{
          axios.patch(`${API_URL}/api/Responsivas/EliminarResponsiva/${datos.idResponsiva}`)
          Swal.fire({
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
    });
    }

    const viewR = (datos) => {
      console.log(datos)
      console.log(usuario)
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
      console.log(datos)
      
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
        if (result.isConfirmed && result.value) {
          axios.post(`${API_URL}/api/Responsivas/DevolverEquipo`, {
            ResponsivaAsignacionId:datos.idResponsiva,
            Observaciones: result.value,
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
      console.log(modalPrestamo)
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
            <div className="flex justify-end bg-three relative pr-5">
                <div className="relative group">
                    <button onClick={()=>{newResponsiva()}} className="icon-button text-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                        <path fill="currentColor" fillRule="evenodd" d="M5.4 3h13.2A2.4 2.4 0 0 1 21 5.4v13.2a2.4 2.4 0 0 1-2.4 2.4H5.4A2.4 2.4 0 0 1 3 18.6V5.4A2.4 2.4 0 0 1 5.4 3M12 7a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 0 1 1-1" clipRule="evenodd"/>
                    </svg>
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-sm rounded px-2 py-1 whitespace-nowrap z-10">
                        Crear Prestamo
                    </div>
                </div>
              </div>
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
                        <>
                        {/* <button onClick={()=>{editR(responsiva)}} className='icon-button p-1'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="m2.292 13.36l4.523 4.756L.5 20zM12.705 2.412l4.522 4.755L7.266 17.64l-4.523-4.754zM16.142.348l2.976 3.129c.807.848.086 1.613.086 1.613l-1.521 1.6l-4.524-4.757L14.68.334l.02-.019c.119-.112.776-.668 1.443.033"/></svg></button> */}
                        <button onClick={()=>{viewR(responsiva)}} title="Ver Responsiva" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg></button>
                        <button onClick={()=>{deleteR(responsiva)}} title="Eliminar Responsiva" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="IconifyId19491a687d6412eb80"><g fill="none" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M9 10v34h30V10z"/><path stroke="#000" strokeLinecap="round" d="M20 20v13m8-13v13"/><path stroke="#fff" strokeLinecap="round" d="M4 10h40"/><path fill="#fff" stroke="#fff" d="m16 10l3.289-6h9.488L32 10z"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#IconifyId19491a687d6412eb80)"/></svg></button>
                        <button onClick={()=>{uploadR(responsiva)}} title="Subir Responsiva Firmada" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M1.44.44A1.5 1.5 0 0 1 2.5 0h6a.5.5 0 0 1 .354.146l4 4A.5.5 0 0 1 13 4.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 12.5v-11c0-.398.158-.78.44-1.06m5.747 2.993l.104.104c.116.076.216.176.292.292l1.854 1.854a.625.625 0 0 1-.442 1.067h-1.25v3.625a1 1 0 1 1-2 0V6.75h-1.25a.625.625 0 0 1-.442-1.067L5.907 3.83c.076-.116.176-.216.292-.292l.104-.104a.625.625 0 0 1 .884 0Z" clipRule="evenodd"/></svg></button>
                        </>
                      ):((responsiva.docResponsiva === '' || responsiva.docResponsiva=== null && responsiva.tipoResponsiva === 'Devolución') ?
                      (
                        <>
                        {/* <button onClick={()=>{editR(responsiva)}} className='icon-button p-1'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="m2.292 13.36l4.523 4.756L.5 20zM12.705 2.412l4.522 4.755L7.266 17.64l-4.523-4.754zM16.142.348l2.976 3.129c.807.848.086 1.613.086 1.613l-1.521 1.6l-4.524-4.757L14.68.334l.02-.019c.119-.112.776-.668 1.443.033"/></svg></button> */}
                        <button onClick={()=>{viewRD(responsiva)}} title="Ver Responsiva de Devolución" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg></button>
                        {/* <button onClick={()=>{deleteR(responsiva)}} title="Eliminar Responsiva" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="IconifyId19491a687d6412eb80"><g fill="none" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M9 10v34h30V10z"/><path stroke="#000" strokeLinecap="round" d="M20 20v13m8-13v13"/><path stroke="#fff" strokeLinecap="round" d="M4 10h40"/><path fill="#fff" stroke="#fff" d="m16 10l3.289-6h9.488L32 10z"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#IconifyId19491a687d6412eb80)"/></svg></button> */}
                        <button onClick={()=>{uploadR(responsiva)}} title="Subir Responsiva Firmada de Devolucion" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M1.44.44A1.5 1.5 0 0 1 2.5 0h6a.5.5 0 0 1 .354.146l4 4A.5.5 0 0 1 13 4.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 12.5v-11c0-.398.158-.78.44-1.06m5.747 2.993l.104.104c.116.076.216.176.292.292l1.854 1.854a.625.625 0 0 1-.442 1.067h-1.25v3.625a1 1 0 1 1-2 0V6.75h-1.25a.625.625 0 0 1-.442-1.067L5.907 3.83c.076-.116.176-.216.292-.292l.104-.104a.625.625 0 0 1 .884 0Z" clipRule="evenodd"/></svg></button>
                        </>
                      ):((responsiva.estado === "Terminada" || (responsiva.tipoResponsiva === "Devolución" && responsiva.estado ==="Firmada")) ?
                        ("") : (responsiva.docResponsiva === '' || responsiva.docResponsiva=== null && responsiva.tipoResponsiva === 'Prestamo') ?
                        (
                          <>
                            <button onClick={()=>{viewRP(responsiva)}} title="Ver Responsiva" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg></button>
                            <button onClick={()=>{deleteR(responsiva)}} title="Eliminar Responsiva" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="IconifyId19491a687d6412eb80"><g fill="none" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M9 10v34h30V10z"/><path stroke="#000" strokeLinecap="round" d="M20 20v13m8-13v13"/><path stroke="#fff" strokeLinecap="round" d="M4 10h40"/><path fill="#fff" stroke="#fff" d="m16 10l3.289-6h9.488L32 10z"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#IconifyId19491a687d6412eb80)"/></svg></button>
                            <button onClick={()=>{uploadR(responsiva)}} title="Subir Responsiva Firmada" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M1.44.44A1.5 1.5 0 0 1 2.5 0h6a.5.5 0 0 1 .354.146l4 4A.5.5 0 0 1 13 4.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 12.5v-11c0-.398.158-.78.44-1.06m5.747 2.993l.104.104c.116.076.216.176.292.292l1.854 1.854a.625.625 0 0 1-.442 1.067h-1.25v3.625a1 1 0 1 1-2 0V6.75h-1.25a.625.625 0 0 1-.442-1.067L5.907 3.83c.076-.116.176-.216.292-.292l.104-.104a.625.625 0 0 1 .884 0Z" clipRule="evenodd"/></svg></button>
                          </>
                        ):
                      (<>
                        <button onClick={() => {viewRF(responsiva)}} title="Ver Responsiva Firmada" className='icon-button p-1 cursor-pointer'>
                          <svg className="" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18c.56 0 1 .44 1 1s-.44 1-1 1s-1-.44-1-1s.44-1 1-1m0-3c-2.73 0-5.06 1.66-6 4c.94 2.34 3.27 4 6 4s5.06-1.66 6-4c-.94-2.34-3.27-4-6-4m0 6.5a2.5 2.5 0 0 1-2.5-2.5a2.5 2.5 0 0 1 2.5-2.5a2.5 2.5 0 0 1 2.5 2.5a2.5 2.5 0 0 1-2.5 2.5m-7.86-1.75L8.85 19l.29-.74C10.43 15.06 13.5 13 17 13c1.05 0 2.06.21 3 .56V8l-6-6H6c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h4.5c-.55-.66-1-1.42-1.36-2.25M13 3.5L18.5 9H13z"/></svg>
                        </button>
                        <button onClick={()=>{devoR(responsiva)}} title="Devolución de Equipo" className='icon-button p-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 20 20"><path fill="currentColor" d="M19 5.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-2.147.354l.003-.003A.5.5 0 0 0 17 5.503v-.006a.5.5 0 0 0-.146-.35l-2-2a.5.5 0 0 0-.708.707L15.293 5H12.5a.5.5 0 0 0 0 1h2.793l-1.147 1.146a.5.5 0 0 0 .708.708zM14.5 11c1.33 0 2.55-.472 3.5-1.257V13.5a1.5 1.5 0 0 1-1.5 1.5H13v2h1.5a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1H7v-2H3.5A1.5 1.5 0 0 1 2 13.5v-10A1.5 1.5 0 0 1 3.5 2h6.757a5.5 5.5 0 0 0 4.243 9M12 17v-2H8v2z"/></svg></button>
                    </>)
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
  );
}