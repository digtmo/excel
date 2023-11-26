import { pool } from "./conexion/conexion.js";

async function crearRegistroOVCC(registro) {
    try {
        // Define la consulta SQL para insertar un nuevo registro en la tabla "OVCC"
        const consulta = `
            INSERT INTO OVCC (
                ID_de_actividad,
                Tarea_Observada,
                Riesgo,
                Control_critico,
                Pregunta,
                Instrucciones,
                Respuesta,
                Comentarios,
                Se_requiere_alguna_accion_de_seguimiento,
                Acciones
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
            )
        `;

        // Ejecuta la consulta SQL con los valores del objeto "registro"
        await pool.query(consulta, [
            registro.ID_de_actividad,
            registro.Tarea_Observada,
            registro.Riesgo,
            registro.Control_critico,
            registro.Pregunta,
            registro.Instrucciones,
            registro.Respuesta,
            registro.Comentarios,
            registro.Se_requiere_alguna_accion_de_seguimiento,
            registro.Acciones
        ]);
        
        console.log("Registro de actividad creado con éxito");
    } catch (error) {
        console.error("Error al crear el registro en la tabla OVCC:", error);
    }
}

export {crearRegistroOVCC}