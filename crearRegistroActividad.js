import { pool } from "./conexion/conexion.js";


// Función para insertar un nuevo registro en la tabla "actividad"
async function crearRegistroActividad(registro) {
    try {
        // Define la consulta SQL para insertar un nuevo registro en la tabla "actividad"
        const consulta = `
            INSERT INTO actividad (
                iD_de_actividad,
                tipo,
                creado,
                creado_por,
                estado,
                fecha_de_observacion,
                observador_principal,
                area_del_observador_principal,
                estructura_organizativa_del_observador_principal,
                empresa_contratista_de_la_persona_lider,
                miembros_adicionales_en_el_equipo_boolean,
                miembros_adicionales_en_el_equipo,
                miembros_adicionales_en_el_equipo_no_registrados_en_la_base_de_datos,
                fue_esta_actividad_guiada_por_un_coach,
                nombre_del_coach,
                operacion,
                lugar_visitado,
                contractor_companies,
                performed_on_a_contractor
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
            )
        `;

        // Ejecuta la consulta SQL con los valores del objeto "registro"
        await pool.query(consulta, [
            registro.ID_de_actividad,
            registro.tipo,
            registro.Creado,
            registro.Creado_por,
            registro.Estado,
            registro.Fecha_de_observacion,
            registro.Observador_principal,
            registro.Area_del_observador_principal,
            registro.Estructura_organizativa_del_observador_principal,
            registro.Empresa_contratista_de_la_persona_lider,
            registro.Miembros_adicionales_en_el_equipo_boolean,
            registro.Miembros_adicionales_en_el_equipo,
            registro.Miembros_adicionales_en_el_equipo_no_registrados_en_la_base_de_datos,
            registro.Fue_esta_actividad_guiada_por_un_coach,
            registro.Nombre_del_coach,
            registro.Operacion,
            registro.Lugar_visitado,
            registro.Contractor_companies,
            registro.Performed_on_a_contractor
        ]);

        console.log("Registro de actividad creado con éxito");
    } catch (error) {
        console.error("Error al crear el registro de actividad:", error);
    }
}

export {crearRegistroActividad}