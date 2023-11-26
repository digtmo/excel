import XLSX from "xlsx";
import { crearRegistroActividad } from "./crearRegistroActividad.js";
import { crearRegistroOVCC } from "./crearRegistroOVCC.js";
import {crearRegistroOVCCConformidad} from "./crearRegistroOVCC_C.js"
import { crearRegistroPTC } from "./creaRegistroPTC.js";

function obtenerACN(ruta) {
    const workbook = XLSX.readFile(ruta);
    const sheet = workbook.SheetNames[4];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    // Array para almacenar los objetos filtrados
    const objetosFiltrados = [];

    dataExcel.forEach((objeto) => {
        // Crear un nuevo objeto con las propiedades deseadas
        const nuevoObjeto = {
            ID_de_actividad: objeto['ID de actividad'],
            tipo: 'OPS',
            Creado: new Date((objeto['Creado (UTC)'] -25559)* 24 * 60 * 60 * 1000), // Convertir a fecha
            Creado_por: objeto['Creado por'],
            Estado: objeto['Estado'],
            Fecha_de_observacion: new Date((objeto['Fecha de observación'] -25559)* 24 * 60 * 60 * 1000), // Convertir a fecha
            Observador_principal: objeto['Observador principal'],
            area_del_observador_principal: objeto['Área_del_observador_principal'], // Acceder con notación de corchetes
            Estructura_organizativa_del_observador_principal: objeto['Estructura organizativa del observador principal'],
            Empresa_contratista_de_la_persona_lider: objeto['Empresa contratista de la persona lider de la actividad'],
            Miembros_adicionales_en_el_equipo_boolean: objeto['¿Miembros adicionales en el equipo?'] === 'Sí',
            Miembros_adicionales_en_el_equipo: objeto['Miembros adicionales en el equipo'],
            Miembros_adicionales_en_el_equipo_no_registrados_en_la_base_de_datos: objeto['Miembros adicionales en el equipo'] === 'Sí',
            Fue_esta_actividad_guiada_por_un_coach: objeto['¿Fue esta actividad guiada por un coach?'] === 'Sí',
            Nombre_del_coach: objeto['Nombre del coach'],
            Operacion: objeto['Operación'],
            Lugar_visitado: objeto['Lugar visitado'],
            Contractor_companies: objeto['Contractor companies'],
            Performed_on_a_contractor: objeto['Performed on a contractor'] === 'Sí',
        };

        // Agregar el nuevo objeto al arreglo de objetos filtrados
        objetosFiltrados.push(nuevoObjeto);
        crearRegistroActividad(nuevoObjeto)
    });


 
}

// Llamar a la función
/* obtenerACN('Consolidado.xlsx');
 */

async function obtenerOVCC(ruta) {

    const workbook = XLSX.readFile(ruta);
    const sheet = workbook.SheetNames[1];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    try {
        // Filtrar y seleccionar las columnas relevantes del objeto "dataExcel"
        const registrosOVCC = dataExcel.map((objeto) => ({
            ID_de_actividad: objeto['ID de actividad'],
            Tarea_Observada: objeto['Tarea Observada'],
            Riesgo: objeto['Riesgo'],
            Control_critico: objeto['Control crítico'],
            Pregunta: objeto['Pregunta'],
            Instrucciones: objeto['Instrucciones'],
            Respuesta: objeto['Respuesta'] === 'Sí', // Convertir a booleano
            Comentarios: objeto['Comentarios'],
            Se_requiere_alguna_accion_de_seguimiento: objeto['¿Se requiere alguna acción de seguimiento?'] === 'Sí', // Convertir a booleano
            Acciones: objeto['Acciones'],
        }));

        // Iterar sobre los registros y crearlos en la tabla "OVCC"
         for (const registro of registrosOVCC) {
            await crearRegistroOVCC(registro);
        }

    } catch (error) {
        console.error("Error al crear registros en la tabla OVCC:", error);
    }
}

/* obtenerOVCC("Consolidado.xlsx") */


async function obtenerOVCCConformidad(ruta) {
    const workbook = XLSX.readFile(ruta);
    const sheet = workbook.SheetNames[2];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    try {
        // Filtrar y seleccionar las columnas relevantes del objeto "dataExcel"
        const registrosOVCCConformidad = dataExcel.map((objeto) => ({
            ID_de_actividad: objeto['ID de actividad'],
            Tarea_Observada: objeto['Tarea Observada'],
            Completado: objeto['Completado'] === 'Sí', // Convertir a booleano
            Vencido: objeto['Vencido'] === 'Sí', // Convertir a booleano
            Conformidad: objeto['Conformidad'] === 'Sí', // Convertir a booleano
            Rechazado: objeto['Rechazado'] === 'Sí', // Convertir a booleano
            Rejection_Comment: objeto['Rejection Comment'],
        }));

        // Iterar sobre los registros y crearlos en la tabla "OVCC_CONFORMIDAD"
        for (const registro of registrosOVCCConformidad) {
            await crearRegistroOVCCConformidad(registro);
        } 


        console.log("Registros en la tabla OVCC_CONFORMIDAD creados con éxito");
    } catch (error) {
        console.error("Error al crear registros en la tabla OVCC_CONFORMIDAD:", error);
    }
}
/* 
obtenerOVCCConformidad("Consolidado.xlsx") */

async function obtenerPTC(ruta) {

    
    const workbook = XLSX.readFile(ruta);
    const sheet = workbook.SheetNames[3];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);


    try {
        // Filtrar y seleccionar las columnas relevantes del objeto "dataExcel"
        const registrosPTC = dataExcel.map((objeto) => ({
            ID_de_actividad: objeto['ID de actividad'],
            Numero_nombre_de_documento: objeto['Número / nombre de documento'],
            Focus_areas: objeto['Focus areas'],
            Does_the_work_document_have_clear_outcomes_expected: objeto['Does_the_work_document_have_clear_outcomes_expected'] === 'Sí', // Convertir a booleano
            Gaps_and_actions_taken: objeto['Gaps and actions taken'],
            Does_the_work_document_clearly_outline: objeto['Does_the_work_document_clearly_outline'] === 'Sí', // Convertir a booleano
            Details_on_where_the_work_document_is_not_clear: objeto['Details on where the work document is not clear'],
            Is_the_work_document_readily_available: objeto['Is_the_work_document_readily_available'] === 'Sí', // Convertir a booleano
            Details_about_the_work_document_version_that_was_used: objeto['Details about the work document version that was used'],
            Is_work_executed_according_to_all_the_steps: objeto['Is_work_executed_according_to_all_the_steps'] === 'Sí', // Convertir a booleano
            Details_on_any_steps_and_controls_that_were_missed: objeto['Details onm any steps and controls that were missed'],
            Have_the_participants_shown_understanding: objeto['Have_the_participants_shown_understanding'] === 'Sí', // Convertir a booleano
            Details_about_any_misunderstandings_and_actions_taken: objeto['Details about any misunderstandings and actions taken'],
            Having_used_the_prepared_questions_have_you_confirmed: objeto['Having_used_the_prepared_questions_have_you_confirmed'] === 'Sí', // Convertir a booleano
            Details_on_any_gaps_and_actions_taken_with_the_workgroup: objeto['Details on any gaps and actions taken with the workgroup'],
            Have_the_participants_received_training: objeto['Have_the_participants_received_training'] === 'Sí', // Convertir a booleano
            Details_on_any_gaps_in_training_and_actions_taken: objeto['Details on any gaps in training and actions_taken'],
            Is_the_outcome_of_the_work_delivered: objeto['Is_the_outcome_of_the_work_delivered'] === 'Sí', // Convertir a booleano
            Details_on_the_outcome_and_any_gaps_in_quality_and_timeframe: objeto['Details on the outcome and any gaps in quality and timeframe'],
            Do_the_participants_openly_raise_any_opportunities: objeto['Do the participants openly raise any opportunities'] === 'Sí', // Convertir a booleano
            Details_about_any_reasons_that_prevent_participants_from_sharing_improvements: objeto['Details about any reasons that prevent participants from sharing improvements'],
            Have_you_explored_with_the_workgroup_any_identified_gaps: objeto['Have_you_explored_with_the_workgroup_any_identified_gaps'] === 'Sí', // Convertir a booleano
            Details_about_any_gaps_and_actions_explored_with_the_workgroup: objeto['Details about any gaps and actions explored with the workgroup'],
            Ingrese_cualquier_observacion_positiva_realizada: objeto['Ingrese cualquier observación positiva realizada'],
            Se_requiere_alguna_accion_de_seguimiento: objeto['Se_requiere_alguna_acción_de_seguimiento'] === 'Sí', // Convertir a booleano
            Acciones: objeto['Acciones'],
            Completado: objeto['Completado'] === 'Sí', // Convertir a booleano
            Scheduled: objeto['Scheduled'] === 'Sí', // Convertir a booleano
            Vencido: objeto['Vencido'] === 'Sí', // Convertir a booleano
            Rechazado: objeto['Rechazado'] === 'Sí', // Convertir a booleano
            Rejection_Comment: objeto['Rejection_Comment'],
        }));

        // Iterar sobre los registros y crearlos en la tabla "PTC"
        for (const registro of registrosPTC) {
            await crearRegistroPTC(registro);
        } 

   
    } catch (error) {
        console.error("Error al crear registros en la tabla PTC:", error);
    }
}

obtenerPTC("Consolidado.xlsx")