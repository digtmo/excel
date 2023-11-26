import XLSX from "xlsx";

function obtenerData(ruta) {
    obtenerACN(ruta);
    /* obtenerOPS(ruta);

        
obtenerOVCCConformidad(ruta); 
   
   obtenerOVCC(ruta); 

obtenerPTC(ruta); */




}

function obtenerACN(ruta) {
    const workbook = XLSX.readFile(ruta);
    const sheet = workbook.SheetNames[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    


    let completadosSi = [];
    let completadosNo = [];
    let vencidosSi = [];
    let vencidosNo = [];


    dataExcel.forEach(obj => {
        if (obj.Completado === 'Sí') {
            completadosSi.push(obj);
        } else if (obj.Completado === 'No') {
            completadosNo.push(obj);
        }

        if (obj.Vencido === 'Sí') {
            vencidosSi.push(obj);
        } else if (obj.Vencido === 'No') {
            vencidosNo.push(obj);
        }
    });



    /* console.log('Completados Sí:', completadosSi);
    console.log('Completados No:', completadosNo);
    console.log('Vencidos Sí:', vencidosSi);
    console.log('Vencidos No:', vencidosNo); */

    console.log('----------------------------')
    console.log('----------obtenerACN----------')
    console.log("Total ACN: ", dataExcel)
/*     console.log('Completados Sí:', completadosSi.length)
    console.log('Completados No:', completadosNo.length)
    console.log('Vencidos Sí:', vencidosNo.length)
    console.log('Vencidos No:', vencidosSi.length)
    console.log('----------------------------') */
};


function obtenerOVCC(ruta) {
    const workbook = XLSX.readFile(ruta);
    const sheet = workbook.SheetNames[1]; // Asumiendo que quieres la segunda hoja
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    const sheet2 = workbook.SheetNames[2]; // Asumiendo que quieres la tercera hoja
    const dataExcel2 = XLSX.utils.sheet_to_json(workbook.Sheets[sheet2]);



    let totalObjetos = dataExcel.length;
    let respuestaSi = [];
    let respuestaNo = [];
    let totalSi = 0;
    let totalNo = 0;
    let riesgos = {}; // Objeto para mantener un registro de los riesgos y su frecuencia
    let controlesCriticos = {};
    let registrosConAccionDeSeguimiento = [];
   

    dataExcel.forEach(obj => {
        if (obj.Respuesta === 'Sí') {
            respuestaSi.push(obj);
            totalSi++;
        } else if (obj.Respuesta === 'No') {
            respuestaNo.push(obj);
            totalNo++;
        }

        // Obtener el riesgo del objeto y aumentar su frecuencia en el registro
        const riesgo = obj.Riesgo;
        if (riesgo) {
            if (riesgos.hasOwnProperty(riesgo)) {
                riesgos[riesgo]++;
            } else {
                riesgos[riesgo] = 1;
            }
        }

        const controlCritico = obj['Control crítico'];
        if (controlCritico) {
            if (controlesCriticos.hasOwnProperty(controlCritico)) {
                controlesCriticos[controlCritico]++;
            } else {
                controlesCriticos[controlCritico] = 1;
            }
        }



        dataExcel.forEach(obj => {
            if (obj['¿Se requiere alguna acción de seguimiento?'] === 'Sí') {
                registrosConAccionDeSeguimiento.push(obj);
            }
        });

        // Vincular objetos por "ID de actividad"
        registrosConAccionDeSeguimiento.forEach(registro => {
            const idActividad = registro['ID de actividad'];
            const objetoRelacionado = dataExcel2.find(obj => obj['ID de actividad'] === idActividad);
            if (objetoRelacionado) {
                registro['ObjetoRelacionado'] = objetoRelacionado;
            }
        });

    });

    console.log('----------------------------');
    console.log('----------obtenerOVCC----------');
    console.log(`Total de OVCC: ${totalObjetos}`);
    console.log(`Total de 'Sí': ${totalSi}`);
    console.log(`Total de 'No': ${totalNo}`);
    console.log('Riesgos y su frecuencia:', riesgos);
    console.log('Controles Críticos y su frecuencia:', controlesCriticos);
    console.log('----------obtenerRegistrosConAccionDeSeguimiento----------');
   /*  console.log(registrosConAccionDeSeguimiento); */
    console.log('----------------------------');

}


function obtenerOVCCConformidad(ruta) {
    const workbook = XLSX.readFile(ruta);
    const sheet = workbook.SheetNames[2]; // Asumiendo que quieres la tercera hoja
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    let totalObjetos = dataExcel.length;
    let completadosSi = [], completadosNo = [];
    let vencidosSi = [], vencidosNo = [];
    let conformidadSi = [], conformidadNo = [];
    let totalCompletadosSi = 0, totalCompletadosNo = 0;
    let totalVencidosSi = 0, totalVencidosNo = 0;
    let totalConformidadSi = 0, totalConformidadNo = 0;

    dataExcel.forEach(obj => {
        if (obj.Completado === 'Sí') {
            completadosSi.push(obj);
            totalCompletadosSi++;
        } else if (obj.Completado === 'No') {
            completadosNo.push(obj);
            totalCompletadosNo++;
        }

        if (obj.Vencido === 'Sí') {
            vencidosSi.push(obj);
            totalVencidosSi++;
        } else if (obj.Vencido === 'No') {
            vencidosNo.push(obj);
            totalVencidosNo++;
        }

        if (obj.Conformidad === 'Sí') {
            conformidadSi.push(obj);
            totalConformidadSi++;
        } else if (obj.Conformidad === 'No') {
            conformidadNo.push(obj);
            totalConformidadNo++;
        }
    });

    console.log('----------------------------')
    console.log('----------obtenerOVCCConformidad----------')
    console.log(`Total de OVCC Conformidad: ${totalObjetos}`);
    console.log(`Total Completados 'Sí': ${totalCompletadosSi}`);
    console.log(`Total Completados 'No': ${totalCompletadosNo}`);
    console.log(`Total Vencidos 'Sí': ${totalVencidosSi}`);
    console.log(`Total Vencidos 'No': ${totalVencidosNo}`);
    console.log(`Total Conformidad 'Sí': ${totalConformidadSi}`);
    console.log(`Total Conformidad 'No': ${totalConformidadNo}`);
    /*    console.log('Objetos con Completado Sí:', completadosSi);
       console.log('Objetos con Completado No:', completadosNo);
       console.log('Objetos con Vencido Sí:', vencidosSi);
       console.log('Objetos con Vencido No:', vencidosNo);
       console.log('Objetos con Conformidad Sí:', conformidadSi);
       console.log('Objetos con Conformidad No:', conformidadNo); */
    console.log('----------------------------')

}

function obtenerPTC(ruta) {
    const workbook = XLSX.readFile(ruta);
    const sheet = workbook.SheetNames[3]; // Asumiendo que quieres la tercera hoja
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    let totalObjetos = dataExcel.length;
    let completadosSi = [], completadosNo = [];
    let vencidosSi = [], vencidosNo = [];
    let totalCompletadosSi = 0, totalCompletadosNo = 0;
    let totalVencidosSi = 0, totalVencidosNo = 0;
    const objetosConAccionDeSeguimiento = dataExcel.filter(obj => obj['¿Se requiere alguna acción de seguimiento?'] === 'Sí');

    dataExcel.forEach(obj => {
        if (obj.Completado === 'Sí') {
            completadosSi.push(obj);
            totalCompletadosSi++;
        } else if (obj.Completado === 'No') {
            completadosNo.push(obj);
            totalCompletadosNo++;
        }

        if (obj.Vencido === 'Sí') {
            vencidosSi.push(obj);
            totalVencidosSi++;
        } else if (obj.Vencido === 'No') {
            vencidosNo.push(obj);
            totalVencidosNo++;
        }


    });

    console.log('----------------------------')
    console.log('----------obtenerPTC----------')
    console.log(`Total de PTC: ${totalObjetos}`);
    console.log(`Total Completados 'Sí': ${totalCompletadosSi}`);
    console.log(`Total Completados 'No': ${totalCompletadosNo}`);
    console.log(`Total Vencidos 'Sí': ${totalVencidosSi}`);
    console.log(`Total Vencidos 'No': ${totalVencidosNo}`);
    console.log('Total Acciones de seguimiento', objetosConAccionDeSeguimiento.length) 
    /*    console.log('Objetos con Completado Sí:', completadosSi);
       console.log('Objetos con Completado No:', completadosNo);
       console.log('Objetos con Vencido Sí:', vencidosSi);
       console.log('Objetos con Vencido No:', vencidosNo); */
    console.log('----------------------------')

}

function obtenerOPS(ruta) {
    const workbook = XLSX.readFile(ruta);
    const sheet = workbook.SheetNames[4]; // Asumiendo que quieres la tercera hoja
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    let totalObjetos = dataExcel.length;
    // Filtrar objetos donde "¿Hubo algún comportamiento / condición de riesgo observada?" es 'Sí'
    const comportamientoCondicionRiesgoSi = dataExcel.filter(obj => obj['¿Hubo algún comportamiento / condición de riesgo observada?'] === 'Sí');
    const cantidadComportamientoCondicionRiesgoSi = comportamientoCondicionRiesgoSi.length

    // Filtrar objetos donde "¿Se detuvo la actividad debido al comportamiento / condición de riesgo?" es 'Sí'
    const actividadDetenidaSi = dataExcel.filter(obj => obj['¿Se detuvo la actividad debido al comportamiento / condición de riesgo?'] === 'Sí');
    const cantidadActividadDetenidaSi = actividadDetenidaSi.length

    // Columnas que deben tener 'Sí' para considerar un registro
    const columnasRequeridas = [
        'EPP - Oidos',
        'EPP - Ojos y Cara',
        'EPP - Cabeza',
        'EPP - Manos y Brazos',
        'EPP - Pie y Piernas',
        'EPP - Respiratorio',
        'EPP - Cuerpo',
        'Línea de fuego / Posición de persona - Golpeado contra',
        'Línea de fuego / Posición de persona - Atrapado entre',
        'Línea de fuego / Posición de persona - Golpeado por',
        'Línea de fuego / Posición de persona - Ojos (atención) en la tarea',
        'Línea de fuego / Posición de persona - Ojos (atención) en el camino',
        'Línea de fuego / Posición de persona - Potencial de caer',
        'Area / Entorno de trabajo - Pobre orden y mantención de lugar',
        'Area / Entorno de trabajo - Almacenamiento inadecuado',
        'Area / Entorno de trabajo - Area de trabajo sucia',
        'Area / Entorno de trabajo - Pobre iluminación',
        'Area / Entorno de trabajo - Clima extremo',
        'Area / Entorno de trabajo - Exposición a polvo /humos',
        'Area / Entorno de trabajo - No segregado',
        'Manejo manual  - Izar y doblar',
        'Manejo manual  - Sobre extension',
        'Manejo manual  - Estrecho',
        'Manejo manual  - Postura inadecuada',
        'Procedimiento / Evauación de Riesgo - Inadecuado para el trabajo',
        'Procedimiento / Evauación de Riesgo - No conocido o no entendido',
        'Procedimiento / Evauación de Riesgo - No seguido',
        'Herramientas y Equipos - Incorrecto para el trabajo',
        'Herramientas y Equipos - Usado incorrectamente',
        'Herramientas y Equipos - En condición insegura',
        'COVID-19 - Prácticas de Limpieza y Descontaminación',
        'COVID-19 - Prácticas de aislamiento, autocontrol y seguimiento de contactos',
        'COVID-19 - Recursos y Equipamiento de Respuesta Médica',
        'COVID-19 - Prácticas de Higiene Personal',
        'COVID-19 - Equipo de Protección Personal (EPP)',
        'COVID-19 - Distanciamiento Social',
        'COVID-19 - Restricción de viaje e ingreso al lugar de trabajo',
        'Salud Mental y Aptitud para el Trabajo - Alcohol y drogas',
        'Salud Mental y Aptitud para el Trabajo - Sueño y fatiga',
        'Salud Mental y Aptitud para el Trabajo - Salud Mental',
        'Salud Mental y Aptitud para el Trabajo - Alta carga de trabajo o presión de tiempo',
        'Salud Mental y Aptitud para el Trabajo - Recursos o apoyo inadecuados',
        'Salud Mental y Aptitud para el Trabajo - Diseño deficiente de trabajo',
        'Salud Mental y Aptitud para el Trabajo - Falta de autonomía'
    ];


    const registrosFiltrados = comportamientoCondicionRiesgoSi.filter(registro => {
        for (const columna of columnasRequeridas) {
            if (registro[columna] === 'Sí') {
                return true; // El registro cumple con al menos una columna requerida
            }
        }
        return false; // El registro no cumple con ninguna columna requerida
    });



    console.log('----------------------------')
    console.log('----------obtenerOPS----------')
    console.log('total OPS: ', totalObjetos)
    console.log("Cantidad Condiciones de riesgos ", cantidadComportamientoCondicionRiesgoSi)
    console.log("Cantidad de actividades detenidas ", cantidadActividadDetenidaSi)
    console.log('----------------------------')


    function contarFrecuenciaColumnas(registrosFiltrados, columnasRequeridas) {
        const frecuenciaColumnas = {};

        // Inicializar la frecuencia de cada columna requerida en 0
        for (const columna of columnasRequeridas) {
            frecuenciaColumnas[columna] = 0;
        }

        // Recorrer los registros y contar la frecuencia de cada columna requerida
        for (const registro of registrosFiltrados) {
            for (const columna of columnasRequeridas) {
                if (registro[columna] === 'Sí') {
                    frecuenciaColumnas[columna]++;
                }
            }
        }

        return frecuenciaColumnas;
    }

    // Luego de filtrar los registros, puedes llamar a esta función para contar la frecuencia
    const frecuencia = contarFrecuenciaColumnas(registrosFiltrados, columnasRequeridas);

    // Imprimir la frecuencia de cada columna requerida
    console.log("------------------------------------")
    console.log('Frecuencia de las columnas requeridas:');
    console.log(frecuencia);


}

obtenerData("Consolidado.xlsx")