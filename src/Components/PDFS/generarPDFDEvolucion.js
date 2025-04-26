import jsPDF from "jspdf";
import dayjs from 'dayjs';
import 'dayjs/locale/es'; 
import 'jspdf-autotable';
import Logo from '../../assets/LOGOVNA.png'

 export const generarPDFDevolucion = async (values,resp) => {
            return new Promise((resolve,reject)=>{
                const doc = new jsPDF('p', 'mm', 'letter');
                const today = new Date((resp ? values.fechaCreacion :values[0].fechaCreacion));

                const nombre = (resp ? values.colaborador.nombre :values[0].colaborador.nombre) + ' ' + (resp ? values.colaborador.apellido :values[0].colaborador.apellido)
        
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
                        Por este medio hago constar que <strong> ${(resp ? values.colaborador.nombre : values[0].colaborador.nombre)} ${ resp ? values.colaborador.apellido : values[0].colaborador.apellido}</strong> hace la devolución del equipo asignado por <strong>Mototransp S.A.</strong> asignado al Área de <strong>${ resp ? values.colaborador.area : values[0].colaborador.area}</strong>, con fecha <strong>${fecha}</strong>
                        el cual se describe a continuación:
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
           doc.text("RESPONSIVA DE DOVOLUCIÓN \n\n EQUIPO DE CÓMPUTO", 110, 25, { align: "center" }); // Segunda columna, primera fila (centrada)
           doc.text("Código: TI-CH-FO-01", 161, startY + 6); // Tercera columna, primera fila
        
           doc.text("Version: 01", 25, startY + 25); // Primera columna, segunda fila
           doc.text("Fecha:09/01/2024", 162, startY + 16); // Tercera columna, segunda fila
           doc.text("Página: 1 de 1", 165, startY + 25); // Tercera columna, segunda fila
                // Título del documento
                doc.setFont("helvetica", "bold");
                doc.setFontSize(12);
                doc.text("RESPONSIVA DE DEVOLUCIÓN DE EQUIPO DE CÓMPUTO", 105, 50, { align: "center" });
        
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
                startY: 82,
                head: [["Marca/Modelo", "Serie", "S.O.", "Memoria RAM", "Procesador", "Disco Duro", "Placa Activo"]],
                body: [[
                    `${(resp ? values.equipo[0].marca : values[0].equipo[0].marca)} ${(resp ? values.equipo[0].modeloEquipo : values[0].equipo[0].modeloEquipo)}`,
                    (resp ? values.equipo[0].nSerie : values[0].equipo[0].nSerie),
                    (resp ? values.equipo[0].sistemaOperativo : values[0].equipo[0].sistemaOperativo),
                    (resp ? values.equipo[0].ram : values[0].equipo[0].ram),
                    (resp ? values.equipo[0].procesador : values[0].equipo[0].procesador),
                    (resp ? values.equipo[0]?.almacenamientos?.join(' / ') : values[0]?.equipo[0]?.almacenamientos?.join(' / ')),
                    (resp ? values.equipo[0].activoFijo : values[0].equipo[0].activoFijo)
                ]],
                theme: 'grid',
                styles: { fontSize: 11, cellPadding: 2, lineWidth: 0.5, lineColor: [0, 0, 0],textColor: [0, 0, 0], fillColor: [220, 220, 220] },
                headStyles: { fillColor: [10, 10, 10], textColor: 255, halign: "center" },
                columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 25 }, 2: { cellWidth: 25 }, 3: { cellWidth: 20 }, 4: { cellWidth: 25 }, 5: { cellWidth: 25 }, 6: { cellWidth: 25 } },
                tableWidth: 'wrap', // hace que la tabla se ajuste a su contenido
                margin: { left: (doc.internal.pageSize.getWidth() - 175) / 2 } // centrado manual (205 es el total de cellWidths)
            });
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.text(
                `El costo del equipo es proporcional al valor de la factura, este valor deberá cubrirse por el responsable del equipo en caso de pérdida, robo, extravío o daño irreparable. Si el responsable permanece dentro de la compañía, se cubrirá el costo a través de pagos quincenales a la cuenta asignada por la compañía, en caso de no continuar con la relación laboral, se dispondrá de dicha cantidad del finiquito o liquidación y fondo de ahorro correspondientes`,
                18, startY + 110, { maxWidth: 180 }
            );
        
            // Firmas
            const firmaY = startY + 170;
            // doc.text("_____________________________", 20, firmaY);
            // doc.text("Gloria Claribel Lara Orellana", 28, firmaY + 5);
            // doc.text("Capital Humano", 40, firmaY + 10);
        
            // doc.text("_____________________________", 120, firmaY);
            // doc.text("Miguel Angel Quiróz Valdes", 129, firmaY + 5);
            // doc.text("Área de TI", 145, firmaY + 10);
        
            doc.text("_____________________________", 20, firmaY+50);
            doc.text("Miguel Angel Quiróz Valdes", 52, firmaY + 55,{align:'center'});
            doc.text("Departamento de TI ", 52, firmaY + 60,{align:'center'});
        
            doc.text("_____________________________", 120, firmaY+50);
            doc.text(nombre, 155, firmaY + 55,{align:'center'});
            doc.text("Responsable del Equipo", 155, firmaY + 60,{align:'center'});
        

            })
    };