import {React, useState, useEffect} from "react";
import Swal from "sweetalert2";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField,InputAdornment } from "@mui/material";
import ModalEditR from "../Modal/ModalEditR";
import ModalUploadR from "../Modal/ModalUploadR";

export default function VerResponsiva() {

    const [responsivas, setResponsivas] = useState([]);
    const [responsiva, setResponsiva] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalUpload,setModalUpload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [itemsPerPage, setItemsPerPage] = useState(5); // Elementos por página
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda44

    useEffect(() => {
      setLoading(true);
      fetch('https://script.googleusercontent.com/macros/echo?user_content_key=Av0F9BmQQ24be89zJqtLGL4_J1hJKhTY2Pcu-3l7NcA3RszW99ZhHcjvPKDA6J6CI4i9eqcI5BxH44ni9uuoaPiOG5x42bHbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnI0ZpyEVoOungJUum7ol0R_xYxaYy_BEKUe1uwbf9PKfHdly63Hcl_LKoeJAZRFeHfft8TSMfgyAOTP1mcJ_0xwD25TVflC-4A&lib=MHjXBVhai-CdhE7mJFGEsMsvpNBcmj7mt')
        .then((response) => response.json())
        .then((data) => {setLoading(false); setResponsivas(data)});
    }, []);

          // Filtrar las filas de la tabla según el término de búsqueda
  // Función para aplicar el filtro y devolver las filas filtradas
  const filteredRows = responsivas.filter((r) => 
    ["nombreResponsable", "area", "placaActivo"]
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
  console.log('doc')
  setModalUpload(true)
  setResponsiva(datos);
  }

  const deleteR = (datos) => {
  console.log("id " + datos.ID)
  console.log("activa " + datos.activa)
  let valores = {
    ID: datos.ID,
    activa: 0 
  }
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
      fetch("https://script.google.com/macros/s/AKfycbyMWe2c-SoknS2wSeSnrtgdHy51xEWjglmtahb2VhJ-snor_ERIh4k4bKxRVP5WWkXP/exec", {
        method: "POST",
        body: JSON.stringify(valores), // Enviar los valores del formulario
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
    })
        .then(response => response.text())
        .then(result => {
          setLoading(false);
          Swal.fire({
            title: "Eliminada",
            text: "La responsiva a sido eliminada.",
            icon: "success"
          }).then((result)=>{
            if(result.isConfirmed){
              window.location.reload();
            }
          });
        })
        .catch(error => {
        console.error("Error:", error);
        Swal.fire({
          title: "No se pudo eliminar la resposiva",
          icon: "error",
          draggable: true
        });
        });
      console.log("Eliminado")
      
    }
  });
  }
      
    return(
        <div className="p-4">
          {
                modalEdit && <ModalEditR modal={setModalEdit} responsiva={responsiva}/>
            }
            {
              modalUpload && <ModalUploadR modal={setModalUpload} responsiva={responsiva}/>
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
        <TableContainer component={Paper} className=" overflow-hidden">
          <Table className="min-w-full">
            <TableHead className="bg-five">
              <TableRow>
                <TableCell sx={{color:'white', fontWeight:'bold' }}>#</TableCell>
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
                <TableCell sx={{color:'white', fontWeight:'bold' }}>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {currentItems.map((responsiva, index) => (
                <TableRow key={responsiva.ID}>
                    <TableCell>{responsiva.ID}</TableCell>
                    <TableCell>{responsiva.nombreResponsable}</TableCell>
                    <TableCell>{responsiva.area}</TableCell>
                    <TableCell>{responsiva.responsableArea}</TableCell>
                    <TableCell>{responsiva.marca}</TableCell>
                    <TableCell>{responsiva.modelo}</TableCell>
                    <TableCell>{responsiva.noSerie}</TableCell>
                    <TableCell>{responsiva.sistemaOperativo}</TableCell>
                    <TableCell>{responsiva.ram}</TableCell>
                    <TableCell>{responsiva.procesador}</TableCell>
                    <TableCell>{responsiva.discoDuro}</TableCell>
                    <TableCell>{responsiva.placaActivo}</TableCell>
                    <TableCell>
                      {
                      (responsiva.documento === '' || responsiva.documento=== null) ?
                      (
                        <>
                        <button onClick={()=>{editR(responsiva)}} className='icon-button p-1'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="m2.292 13.36l4.523 4.756L.5 20zM12.705 2.412l4.522 4.755L7.266 17.64l-4.523-4.754zM16.142.348l2.976 3.129c.807.848.086 1.613.086 1.613l-1.521 1.6l-4.524-4.757L14.68.334l.02-.019c.119-.112.776-.668 1.443.033"/></svg></button>
                        <button onClick={()=>{deleteR(responsiva)}} className='icon-button p-1'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="IconifyId19491a687d6412eb80"><g fill="none" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M9 10v34h30V10z"/><path stroke="#000" strokeLinecap="round" d="M20 20v13m8-13v13"/><path stroke="#fff" strokeLinecap="round" d="M4 10h40"/><path fill="#fff" stroke="#fff" d="m16 10l3.289-6h9.488L32 10z"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#IconifyId19491a687d6412eb80)"/></svg></button>
                        <button onClick={()=>{uploadR(responsiva)}} className='icon-button p-1'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M1.44.44A1.5 1.5 0 0 1 2.5 0h6a.5.5 0 0 1 .354.146l4 4A.5.5 0 0 1 13 4.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 12.5v-11c0-.398.158-.78.44-1.06m5.747 2.993l.104.104c.116.076.216.176.292.292l1.854 1.854a.625.625 0 0 1-.442 1.067h-1.25v3.625a1 1 0 1 1-2 0V6.75h-1.25a.625.625 0 0 1-.442-1.067L5.907 3.83c.076-.116.176-.216.292-.292l.104-.104a.625.625 0 0 1 .884 0Z" clipRule="evenodd"/></svg></button>
                        </>
                      ):(
                        <>
                          <button onClick={() => window.open(responsiva.documento, '_blank')} className='icon-button p-1'>
                            <svg className="" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18c.56 0 1 .44 1 1s-.44 1-1 1s-1-.44-1-1s.44-1 1-1m0-3c-2.73 0-5.06 1.66-6 4c.94 2.34 3.27 4 6 4s5.06-1.66 6-4c-.94-2.34-3.27-4-6-4m0 6.5a2.5 2.5 0 0 1-2.5-2.5a2.5 2.5 0 0 1 2.5-2.5a2.5 2.5 0 0 1 2.5 2.5a2.5 2.5 0 0 1-2.5 2.5m-7.86-1.75L8.85 19l.29-.74C10.43 15.06 13.5 13 17 13c1.05 0 2.06.21 3 .56V8l-6-6H6c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h4.5c-.55-.66-1-1.42-1.36-2.25M13 3.5L18.5 9H13z"/></svg>
                          </button>
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