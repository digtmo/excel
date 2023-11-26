import { pool } from "./conexion/conexion.js";

async function crearRegistroPTC(registro) {
    try {
        // Define la consulta SQL para insertar un nuevo registro en la tabla "PTC"
        const consulta = `
            INSERT INTO PTC (
                ID_de_actividad,
                Numero_nombre_de_documento,
                Focus_areas,
                Does_the_work_document_have_clear_outcomes_expected,
                Gaps_and_actions_taken,
                Does_the_work_document_clearly_outline,
                Details_on_where_the_work_document_is_not_clear,
                Is_the_work_document_readily_available,
                Details_about_the_work_document_version_that_was_used,
                Is_work_executed_according_to_all_the_steps,
                Details_on_any_steps_and_controls_that_were_missed,
                Have_the_participants_shown_understanding,
                Details_about_any_misunderstandings_and_actions_taken,
                Having_used_the_prepared_questions_have_you_confirmed,
                Details_on_any_gaps_and_actions_taken_with_the_workgroup,
                Have_the_participants_received_training,
                Details_on_any_gaps_in_training_and_actions_taken,
                Is_the_outcome_of_the_work_delivered,
                Details_on_the_outcome_and_any_gaps_in_quality_and_timeframe,
                Do_the_participants_openly_raise_any_opportunities,
                Details_about_any_reasons_that_prevent_participants_from_sharing_improvements,
                Have_you_explored_with_the_workgroup_any_identified_gaps,
                Details_about_any_gaps_and_actions_explored_with_the_workgroup,
                Ingrese_cualquier_observacion_positiva_realizada,
                Se_requiere_alguna_accion_de_seguimiento,
                Acciones,
                Completado,
                Scheduled,
                Vencido,
                Rechazado,
                Rejection_Comment
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
                $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31
            )
        `;

        // Ejecuta la consulta SQL con los valores del objeto "registro"
        await pool.query(consulta, [
            registro.ID_de_actividad,
            registro.Numero_nombre_de_documento,
            registro.Focus_areas,
            registro.Does_the_work_document_have_clear_outcomes_expected,
            registro.Gaps_and_actions_taken,
            registro.Does_the_work_document_clearly_outline,
            registro.Details_on_where_the_work_document_is_not_clear,
            registro.Is_the_work_document_readily_available,
            registro.Details_about_the_work_document_version_that_was_used,
            registro.Is_work_executed_according_to_all_the_steps,
            registro.Details_on_any_steps_and_controls_that_were_missed,
            registro.Have_the_participants_shown_understanding,
            registro.Details_about_any_misunderstandings_and_actions_taken,
            registro.Having_used_the_prepared_questions_have_you_confirmed,
            registro.Details_on_any_gaps_and_actions_taken_with_the_workgroup,
            registro.Have_the_participants_received_training,
            registro.Details_on_any_gaps_in_training_and_actions_taken,
            registro.Is_the_outcome_of_the_work_delivered,
            registro.Details_on_the_outcome_and_any_gaps_in_quality_and_timeframe,
            registro.Do_the_participants_openly_raise_any_opportunities,
            registro.Details_about_any_reasons_that_prevent_participants_from_sharing_improvements,
            registro.Have_you_explored_with_the_workgroup_any_identified_gaps,
            registro.Details_about_any_gaps_and_actions_explored_with_the_workgroup,
            registro.Ingrese_cualquier_observacion_positiva_realizada,
            registro.Se_requiere_alguna_accion_de_seguimiento,
            registro.Acciones,
            registro.Completado,
            registro.Scheduled,
            registro.Vencido,
            registro.Rechazado,
            registro.Rejection_Comment,
        ]);

        console.log("Registro creado exitosamente")
    } catch (error) {
        console.error("Error al crear el registro en la tabla PTC:", error);
    }
}

export {crearRegistroPTC}