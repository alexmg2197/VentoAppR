import {React, useState, useEffect } from "react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { Formik } from 'formik'
import dayjs from 'dayjs';
import 'dayjs/locale/es'; 
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import Logo from '../../assets/LOGOVNA.png'


export default function CrearResponsiva() {
    
    const [loading, setLoading] = useState(false);
    const [departamentos, setDepartamentos] = useState([]);
    const [procesadores, setProcesadores] = useState([]);
    const [sistemao, setSistemao] = useState([]);
    const [discoduros, setDiscoDuro] = useState([]);

    useEffect(() => {
                    setLoading(true);
                
                    Promise.all([
                        // fetch('https://script.google.com/macros/s/AKfycbxIF5bPo7OvOgPCQCtrdal4xBwh3P-Q4dPageTLZ1GtkIQz9tAL9fkI-ksEqUxqe_ud/exec')
                        //     .then((response) => response.json()),
                        fetch('https://script.google.com/macros/s/AKfycby0xvLsCNoeli0AeoydxxKUEGxunatr8N7XfXwth6PbTkToI6khEjEN0tYO2RY_mtZD/exec')
                            .then((response) => response.json()),
                        fetch('https://script.google.com/macros/s/AKfycbyXmX6uaggJXpxrGeGMdgHY0tEqxILTi_8melx5vSC80ij7ywFW9G0-4ZnFcXXjM4jA/exec')
                            .then((response) => response.json()),
                        fetch('https://script.google.com/macros/s/AKfycbwJw0AQsZHLcuzvFd5r3dpbpNTxHDpH-NKuYP1P5iExxCux-61rp1AOcvEELqDJKdTW/exec')
                            .then((response) => response.json()),
                        fetch('https://script.google.com/macros/s/AKfycbzfBN92rs1jcaEC8L0ODkfD0h0mCUZwGU9Qdu8BdZk-WWuNIgFtxdCUC0vNcsrsK8RJ/exec')
                            .then((response) => response.json()),
                        // fetch('https://script.google.com/macros/s/AKfycbwvcqLWis-m6vhe04kk-pABFis9eg-jBrtd_fs3tc9eOUVxx9KyVA8YBW-6RMG-WuN9/exec')
                        //     .then((response) => response.json()),
                        // fetch('https://script.google.com/macros/s/AKfycbz5qNIGwQrYVcOUpvOR1jtM-XCruAVUKJW9SvVkSS50u8d8UmDSP-z59eNsXlcCxUuv/exec')
                        //     .then((response) => response.json())
                    ])
                    .then(([departamentos,procesadores,sistemao,discoduro]) => {
                        // setUbicaciones(ubicaciones);
                        setDepartamentos(departamentos);
                        setProcesadores(procesadores);
                        setSistemao(sistemao);
                        setDiscoDuro(discoduro);
                        // setEquipo(equipo);
                        // setConexion(conexion);
                    })
                    .catch((error) => console.error("Error al cargar datos:", error))
                    .finally(() => setLoading(false));
                
                }, []);
    
    const navigate = useNavigate();
    
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    
    const generarPDF =  async (values) => {
        return new Promise((resolve,reject)=>{
        const doc = new jsPDF('p', 'mm', 'letter');
        const today = new Date();

        // Lista de meses en español
        const months = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
      
        // Obtener día, mes y año
        const day = today.getDate();
        const month = months[today.getMonth()];
        const year = today.getFullYear();
      
        // Formatear la fecha
        const fecha = `${day} de ${month} de ${year}`;

        const HTMLtext =`<div style="width: 190px;">
                <p style="text-align:center; font-size:4px;color:black;">
                Por este medio hago constar que la empresa <strong>Mototransp S.A.</strong> hace entrega a <strong>
                ${values.nombreResponsable}</strong> asignado al Área de <strong>${values.area}</strong>, con fecha <strong>${fecha}</strong>
                el siguiente equipo de cómputo:
                </p>
            </div>    `

        const abajo = `
            <div style="width: 190px; padding-top:4px">
                <p style="text-align:center; font-size:4px;color:black;">
                    El costo del equipo es proporcional al valor de la factura, este valor deberá cubrirse por el responsable 
                    del equipo en caso de pérdida, robo, extravío o daño irreparable. Si el responsable permanece dentro de la compañía, 
                    se cubrirá el costo a través de pagos quincenales a la cuenta asignada por la compañía, en caso de no continuar 
                    con la relación laboral, se dispondrá de dicha cantidad del finiquito o liquidación y fondo de ahorro correspondiente. 
                </p>
            </div>
            <div style="width: 190px;">
                <div class="container text-center">
                    <div class="row">
                        <div class="col">
                            <hr class="p-0 m-0"><p style="text-align:center; font-size:4px;color:black;"><strong>Capital Humano:</strong><br> Gloria Claribel Lara Orellana</p> 
                        </div>
                        <div class="col">
                            <hr class="p-0 m-0"><p style="text-align:center; font-size:4px;color:black;"><strong>Área de TI:</strong><br> Miguel Angel Quiróz Valdes</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 190px;">
                <div class="container text-center">
                    <div class="row">
                        <div class="col">
                            <hr class="p-0 m-0"><p style="text-align:center; font-size:4px;color:black;"><strong>Responsable del Departamento:</strong><br> ${values.responsableArea}</p> 
                        </div>
                        <div class="col">
                            <hr class="p-0 m-0"><p style="text-align:center; font-size:4px;color:black;"><strong>Responsable del Equipo:</strong><br> ${values.nombreResponsable}</p>
                        </div>
                    </div>
                </div>
            </div>`

    // Tabla dibujada (3 columnas) como encabezado
    const startY = 10;  // Coordenada Y para la tabla (más cerca de la parte superior)
    const col1Width = 40; // Ancho de la primera columna
    const col2Width = 50; // Ancho de la segunda columna
    const col3Width = 40; // Ancho de la tercera columna

    // Dibujar las celdas de la tabla
    doc.setLineWidth(0.5);
    doc.setFillColor(255, 255, 255); // Fondo blanco

   // Primera fila
   doc.rect(20, startY, col1Width, 15); // Celda primera columna
   doc.rect(60, 10, col2Width * 2, 30); // Celda segunda columna (que abarca dos filas de la primera columna)
   doc.rect(20 + col1Width + col2Width * 2, startY, col3Width, 10); // Celda tercera columna
   doc.rect(20 + col1Width + col2Width * 2, startY+20, col3Width, 10); // Celda tercera columna

   // Segunda fila
   doc.rect(20, startY + 15, col1Width, 15); // Celda primera columna
   doc.rect(20 + col1Width + col2Width * 2, startY + 10, col3Width, 10); // Celda tercera columna

   // Agregar texto dentro de las celdas
   doc.setFontSize(11);
   doc.addImage(Logo, 'PNG', 19, startY + 5, 40, 5) // Primera columna, primera fila
   doc.setFont("helvetica", "bold");
   doc.text("RESPONSIVA DE EQUIPO DE CÓMPUTO", 110, 25, { align: "center" }); // Segunda columna, primera fila (centrada)
   doc.text("Código: TI-CH-FO-01", 161, startY + 6); // Tercera columna, primera fila

   doc.text("Version: 01", 25, startY + 25); // Primera columna, segunda fila
   doc.text("Fecha:08/05/2024", 162, startY + 16); // Tercera columna, segunda fila
   doc.text("Página: Página 1 de 1", 160, startY + 25); // Tercera columna, segunda fila
        // Título del documento
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("RESPONSIVA DE EQUIPO DE CÓMPUTO", 105, 50, { align: "center" });

    // Agregar más contenido debajo de la tabla (texto, información, etc.)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.html(HTMLtext, {
        callback: function (doc) {
            const pdfBlob = doc.output('blob'); // Convertir PDF a Blob
            const pdfUrl = URL.createObjectURL(pdfBlob); // Crear URL Blob
            window.open(pdfUrl, '_blank'); // Abrir en nueva pestaña
            resolve()
        },
        x: 10,
        y: 60,
    });

    doc.autoTable({
        startY: 85,
        head: [["Marca/Modelo", "Serie", "S.O.", "Memoria RAM", "Procesador", "Disco Duro", "Placa Activo"]],
        body: [[
            `${values.marca} ${values.modelo}`,
            values.noSerie,
            values.sistemaOperativo,
            values.ram,
            values.procesador,
            ((values.ssd && values.hdd && values.m2) ? (values.ssdSize + ' SSD / ' + values.hddSize + ' HDD / ' + values.m2Size + ' M2') : ((values.ssd && values.hdd && !values.m2) ? (values.ssdSize +' SSD / ' + values.hddSize + ' HDD'):((values.ssd && !values.hdd && values.m2)?(values.ssdSize +' SSD / ' + values.m2Size + ' M2'):((!values.ssd && values.hdd && values.m2)?(values.hddSize +' HHD / ' + values.m2Size + ' M2'):((values.ssd && !values.hdd && !values.m2)?(values.ssdSize + ' SSD'):((!values.ssd && values.hdd && !values.m2)?(values.hddSize + ' HDD'):((!values.ssd && !values.hdd && values.m2)?(values.m2Size + ' M2'):''))))))),
            values.placaActivo
        ]],
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 2, lineWidth: 0.5, lineColor: [0, 0, 0],textColor: [0, 0, 0], fillColor: [220, 220, 220] },
        headStyles: { fillColor: [10, 10, 10], textColor: 255, halign: "center" },
        columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 25 }, 2: { cellWidth: 25 }, 3: { cellWidth: 20 }, 4: { cellWidth: 25 }, 5: { cellWidth: 25 }, 6: { cellWidth: 25 } }
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(
        `El costo del equipo es proporcional al valor de la factura, este valor deberá cubrirse por el responsable del equipo en caso de pérdida, robo, extravío o daño irreparable. Si el responsable permanece dentro de la compañía, se cubrirá el costo a través de pagos quincenales a la cuenta asignada por la compañía, en caso de no continuar con la relación laboral, se dispondrá de dicha cantidad del finiquito o liquidación y fondo de ahorro correspondientes`,
        18, startY + 115, { maxWidth: 180 }
    );

    // Firmas
    const firmaY = startY + 170;
    doc.text("_____________________________", 20, firmaY);
    doc.text("Gloria Claribel Lara Orellana", 28, firmaY + 5);
    doc.text("Capital Humano", 40, firmaY + 10);

    doc.text("_____________________________", 120, firmaY);
    doc.text("Miguel Angel Quiróz Valdes", 129, firmaY + 5);
    doc.text("Área de TI", 145, firmaY + 10);

    doc.text("_____________________________", 20, firmaY+50);
    doc.text(values.responsableArea, 52, firmaY + 55,{align:'center'});
    doc.text("Responsable del Area", 52, firmaY + 60,{align:'center'});

    doc.text("_____________________________", 120, firmaY+50);
    doc.text(values.nombreResponsable, 155, firmaY + 55,{align:'center'});
    doc.text("Responsable del Equipo", 155, firmaY + 60,{align:'center'});
        })
    };

    return (
        <div className="container mx-auto p-6 ">
            <div className="bg-three text-white text-center py-3 rounded-t-xl">
                <h2 className="text-2xl font-bold text-center mb-4">Responsiva de equipo de computo</h2>
            </div>

            <Formik
                        initialValues={{
                            nombreResponsable: '',
                            area: '',
                            responsableArea: '',
                            marca: '',
                            modelo: '',
                            noSerie: '',
                            sistemaOperativo: '',
                            ram: '',
                            procesador: '',
                            ssd:false,
                            hdd:false,
                            m2:false,
                            ssdSize:'',
                            hddSize:'',
                            m2Size:'',
                            placaActivo: '',
                        }}
                        validate={values => {
                            const errors = {};
                            
                            return errors
                        }}
                        onSubmit={(values, { setSubmitting}) => {
                            console.log(((values.ssd && values.hdd && values.m2) ? (values.ssdSize + ' SSD / ' + values.hddSize + ' HDD / ' + values.m2Size + ' M2') : ((values.ssd && values.hdd && !values.m2) ? (values.ssdSize +' SSD / ' + values.hddSize + ' HDD'):((values.ssd && !values.hdd && values.m2)?(values.ssdSize +' SSD / ' + values.m2Size + ' M2'):((!values.ssd && values.hdd && values.m2)?(values.hddSize +' HHD / ' + values.m2Size + ' M2'):((values.ssd && !values.hdd && !values.m2)?(values.ssdSize + ' SSD'):((!values.ssd && values.hdd && !values.m2)?(values.hddSize + ' HDD'):((!values.ssd && !values.hdd && values.m2)?(values.m2Size + ' M2'):''))))))))
                            setLoading(true);
                            fetch("https://script.google.com/macros/s/AKfycbzlzFswPM5sN_KmB8sLPwoB5S6jBk8Ed-kOmuEM1lSXbXC5M4hFLlh2Lp0gNic-2Q7R/exec")
                            .then(response => response.text())
                            .then(data => {
                                console.log(data)
                                console.log(values)
                                 // Asegurarnos de que 'data' sea un número
                                    let id = parseInt(data, 10);  // Convertimos el ID a un número, base 10
                                    if (isNaN(id)) {
                                        id = 0;  // Si 'data' no es un número válido, inicializamos 'id' en 0
                                    }
                                    
                                    id = id + 1;  // Sumamos 1 para obtener el nuevo ID
                                console.log(values)
                                let valores = {
                                    ID: id,  // El nombre de la propiedad debe coincidir con lo que espera Google Apps Script (por ejemplo, 'ID', no 'id')
                                    NombreDelResponsable: values.nombreResponsable,
                                    AreaDelResponsable: values.area,
                                    ResponsableDelArea: values.responsableArea,
                                    Marca: values.marca,  // Asegúrate de que la capitalización coincida con lo esperado en el código de Google
                                    Modelo: values.modelo,
                                    NoDeSerie: values.noSerie,
                                    SistemaOperativo: values.sistemaOperativo,
                                    MemoriaRAM: values.ram,
                                    Procesador: values.procesador,
                                    DiscoDuro: ((values.ssd && values.hdd && values.m2) ? (values.ssdSize + ' SSD / ' + values.hddSize + ' HDD / ' + values.m2Size + ' M2') : ((values.ssd && values.hdd && !values.m2) ? (values.ssdSize +' SSD / ' + values.hddSize + ' HDD'):((values.ssd && !values.hdd && values.m2)?(values.ssdSize +' SSD / ' + values.m2Size + ' M2'):((!values.ssd && values.hdd && values.m2)?(values.hddSize +' HHD / ' + values.m2Size + ' M2'):((values.ssd && !values.hdd && !values.m2)?(values.ssdSize + ' SSD'):((!values.ssd && values.hdd && !values.m2)?(values.hddSize + ' HDD'):((!values.ssd && !values.hdd && values.m2)?(values.m2Size + ' M2'):''))))))),
                                    PlacaActivo: values.placaActivo,
                                    Activa: 1,
                                    Creador: usuario.nombre
                                        }
                                        console.log(id)
                                        console.log(valores)
                                 // Enviar datos a Google Sheets usando fetch
                                    fetch("https://script.google.com/macros/s/AKfycbzGj6vjXkQZm19LaE6pXahi4FeR1k99e24pq_U_HOC-tmeJivd_flsZsSOE2QYqQzGT/exec", {
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
                                                title: "Datos guardados correctamente",
                                                icon: "success",
                                                draggable: true
                                              }).then(async (result)=>{
                                                if(result.isConfirmed)
                                                {
                                                    await generarPDF(values);
                                                    window.location.reload();
                                                }
                                              });
                                        // alert("Datos guardados correctamente en Google Sheets.");
                                        })
                                        .catch(error => {
                                        console.error("Error:", error);
                                        Swal.fire({
                                            title: "Error al guardar los datos",
                                            icon: "error",
                                            draggable: true
                                          });
                                          
                                        });
                            })
                            
                            
                            setSubmitting(false);
                        }}
                    >{
                        ({
                            values,
                            errors,
                            handleChange,
                            handleSubmit
                        }) => (
                    <form className="bg-white p-6 shadow-xl rounded-lg" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sección 1 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Datos del responsable del equipo</h3>
                        <div className="space-y-4">
                            <input type="text" id="nombreResponsable" name="nombreResponsable" value={values.nombreResponsable} onChange={handleChange} placeholder="Nombre" className="w-full p-2 border rounded-md" />
                            <select id="area" name="area" value={values.area} onChange={handleChange} className="w-full p-2 border rounded-md bg-white" >
                                <option value=""> --- Seleccione una opción ---</option>
                                {
                                    departamentos.map((depa) =>{
                                        return(
                                            <option key={depa.name} value={depa.name}>{depa.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <input type="text" id="responsableArea" name="responsableArea" value={values.responsableArea} onChange={handleChange} placeholder="Responsable del Area" className="w-full p-2 border rounded-md" />
                        </div>
                    </div>

                    {/* Sección 2 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Datos del Equipo</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input type="text" id="marca" name="marca" value={values.marca} onChange={handleChange} placeholder="Marca" className="w-full p-2 border rounded-md" />
                            <input type="text" id="modelo" name="modelo" value={values.modelo} onChange={handleChange} placeholder="Modelo" className="w-full p-2 border rounded-md" />
                            <input type="text" id="noSerie" name="noSerie" value={values.noSerie} onChange={handleChange} placeholder="No. de Serie" className="w-full p-2 border rounded-md" />
                            <select  id="sistemaOperativo" name="sistemaOperativo" value={values.sistemaOperativo} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
                                <option value="">Sistema Operativo</option>
                                {
                                    sistemao.map((sistema) =>{
                                        return(
                                            <option key={sistema.name} value={sistema.name}>{sistema.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <input type="text" id="ram" name="ram" value={values.ram} onChange={handleChange} placeholder="Memoria RAM" className="w-full p-2 border rounded-md" />
                            <select id="procesador" name="procesador" value={values.procesador} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
                                <option value="">Procesador</option>
                                {
                                    procesadores.map((procesador) =>{
                                        return(
                                            <option key={procesador.name} value={procesador.name}>{procesador.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <input type="text" id="placaActivo" name="placaActivo" value={values.placaActivo} onChange={handleChange} placeholder="Placa Activo" className="w-full p-2 border rounded-md" />
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" name="ssd" value={values.ssd} onChange={handleChange}/>
                                <span>SSD</span>
                            </label>
                            {values.ssd && (
                                <>
                                    <select name="ssdSize" id="ssdSize" value={values.ssdSize} onChange={handleChange} className="w-full p-2 border rounded-md">
                                        <option value=""> --- SSD ---</option>
                                        {
                                            discoduros.map((disco) =>{
                                                return(
                                                    <option key={disco.name} value={disco.name}>{disco.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </>
                                )}
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" name="hdd" value={values.hdd} onChange={handleChange}/>
                                <span>HDD</span>
                            </label>
                            {values.hdd && (
                                <>
                                    <select name="hddSize" id="hddSize" value={values.hddSize} onChange={handleChange} className="w-full p-2 border rounded-md">
                                        <option value=""> --- HDD ---</option>
                                        {
                                            discoduros.map((disco) =>{
                                                return(
                                                    <option key={disco.name} value={disco.name}>{disco.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </>
                                )}
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" name="m2" value={values.m2} onChange={handleChange}/>
                                <span>M2</span>
                            </label>
                                    {values.m2 && (
                                    <>
                                        <select name="m2Size" id="m2Size" value={values.m2Size} onChange={handleChange} className="w-full p-2 border rounded-md">
                                            <option value=""> --- M2 ---</option>
                                            {
                                                discoduros.map((disco) =>{
                                                    return(
                                                        <option key={disco.name} value={disco.name}>{disco.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </>
                                    )}
                            
                        </div>
                    </div>
                    </div>

                    {/* Botón de envío */}
                    <div className="mt-6">
                    <button type="submit" className="w-full bg-five hover:bg-four text-white py-2 rounded-md disabled:opacity-50"  >
                        Crear
                    </button>
                    </div>
                    </form>
                    )}
            </Formik>
            {/* Loader */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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