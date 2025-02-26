import {React, useState, useEffect} from "react";
import Swal from "sweetalert2";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, InputAdornment  } from "@mui/material";
import ModalEditEmail from "../Modal/ModalEditEmail";

export default function VerCorreos(){

    const [correos, setCorreos] = useState([]);
    const [correo, setCorreo] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [itemsPerPage, setItemsPerPage] = useState(5); // Elementos por página
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    setLoading(true);
    fetch('https://script.google.com/macros/s/AKfycbyTpEuaTI_V9tgfbLAyZqobY5WUPqKGL0wZbCltjVGQmUI8bVckHdQN57D4lmomf8uNSA/exec')
      .then((response) => response.json())
      .then((data) => {setLoading(false); setCorreos(data)});
  }, []);

    // Filtrar las filas de la tabla según el término de búsqueda
  // Función para aplicar el filtro y devolver las filas filtradas
  const filteredRows = correos.filter((r) => 
        ["usuario", "departamento", "ubicacion","correo"]
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

  const editC = (datos) =>{
    console.log(datos)
    setCorreo(datos);
    setModalEdit(true)
  }

  const deleteC = (datos) => {
    let valores = {
      ID: datos.ID,
      Activo: 0 
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
        
        fetch("https://script.google.com/macros/s/AKfycbwwHi5D2Nr7SQeRKzH1KR2IL9Mw8J-bV5lDOSv191g8l-bmu2rUbyjPw2eKLDaeDu-POA/exec", {
          method: "POST",
          body: JSON.stringify(valores), // Enviar los valores del formulario
          headers: {
              "Content-Type": "text/plain;charset=utf-8",
          },
      })
          .then(response => response.text())
          .then(result => {
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
        
      }
    });
  }

    return(
        <div className="p-4">
          {
            modalEdit && <ModalEditEmail modal={setModalEdit} correo={correo}/>
          }
            <div className="bg-three text-white py-3 rounded-t-xl flex items-center justify-between px-4">
                <h2 className="text-2xl font-bold text-center flex-1">Correos Electronicos</h2>
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
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{backgroundColor:'#26292c'}}>
                            <TableRow>
                            <TableCell sx={{color:'white', fontWeight:'bold' }}>#</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold' }}>Nombre</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold' }}>Puesto</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold' }}>Departamento</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold' }}>Ubicacion</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold' }}>Correo</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold' }}>Contraseña</TableCell>
                            <TableCell sx={{color:'white', fontWeight:'bold' }}>Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItems.map((correo, index) => (
                            <TableRow key={correo.ID}>
                                <TableCell>{correo.ID}</TableCell>
                                <TableCell>{correo.usuario}</TableCell>
                                <TableCell>{correo.puesto}</TableCell>
                                <TableCell>{correo.departamento}</TableCell>
                                <TableCell>{correo.ubicacion}</TableCell>
                                <TableCell>{correo.correo}</TableCell>
                                <TableCell>{correo.contraseña}</TableCell>
                                <TableCell>
                                <button onClick={()=>{editC(correo)}} className='icon-button p-2'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="m2.292 13.36l4.523 4.756L.5 20zM12.705 2.412l4.522 4.755L7.266 17.64l-4.523-4.754zM16.142.348l2.976 3.129c.807.848.086 1.613.086 1.613l-1.521 1.6l-4.524-4.757L14.68.334l.02-.019c.119-.112.776-.668 1.443.033"/></svg></button>
                                <button onClick={()=>{deleteC(correo)}} className='icon-button'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="IconifyId19491a687d6412eb80"><g fill="none" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M9 10v34h30V10z"/><path stroke="#000" strokeLinecap="round" d="M20 20v13m8-13v13"/><path stroke="#fff" strokeLinecap="round" d="M4 10h40"/><path fill="#fff" stroke="#fff" d="m16 10l3.289-6h9.488L32 10z"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#IconifyId19491a687d6412eb80)"/></svg></button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Paginación debajo de la tabla */}
                    <TablePagination
                    className="bg-three text-white rounded-b-xl"
                        rowsPerPageOptions={[5, 10, 25]} // Opciones para elegir la cantidad de elementos por página
                        component="div"
                        count={filteredRows.length} // Total de elementos
                        rowsPerPage={itemsPerPage} // Elementos por página
                        page={currentPage} // Página actual
                        onPageChange={handleChangePage} // Evento de cambio de página
                        onRowsPerPageChange={handleChangeRowsPerPage} // Evento de cambio de cantidad de filas por página
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