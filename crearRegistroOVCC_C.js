import { pool } from "./conexion/conexion.js";

async function crearRegistroOVCCConformidad(registro) {
    try {
        // Define la consulta SQL para insertar un nuevo registro en la tabla "OVCC_CONFORMIDAD"
        const consulta = `
            INSERT INTO OVCC_CONFORMIDAD (
                ID_de_actividad,
                Tarea_Observada,
                Completado,
                Vencido,
                Conformidad,
                Rechazado,
                Rejection_Comment
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7
            )
        `;

        // Ejecuta la consulta SQL con los valores del objeto "registro"
        await pool.query(consulta, [
            registro.ID_de_actividad,
            registro.Tarea_Observada,
            registro.Completado,
            registro.Vencido,
            registro.Conformidad,
            registro.Rechazado,
            registro.Rejection_Comment,
        ]);

        console.log("Registro creado con exito")
    } catch (error) {
        console.error("Error al crear el registro en la tabla OVCC_CONFORMIDAD:", error);
    }
}

export {crearRegistroOVCCConformidad}