/*
-----------------
	ACTIVIDAD    
-----------------
*/


-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearActividad (
    IN p_id_proyecto INT,
    IN p_titulo_actividad VARCHAR(50),
    IN p_descripcion VARCHAR(50),
    IN p_presupuesto INTEGER
)
BEGIN
    INSERT INTO actividad (id_proyecto, titulo_actividad, descripcion_actividad, presupuesto, estado_actividad)
    VALUES (p_id_proyecto, p_titulo_actividad, p_descripcion, p_presupuesto, true);

END//

DELIMITER ;


-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarActividades()
BEGIN
    SELECT * FROM actividad;
END //

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarActividad (
    IN p_id INT,
    IN p_id_proyecto INT,
    IN p_titulo_actividad VARCHAR(50),
    IN p_descripcion VARCHAR(50),
    IN p_presupuesto INTEGER
)
BEGIN
    UPDATE actividad
    SET id_proyecto = p_id_proyecto,
        titulo_actividad = p_titulo_actividad,
        descripcion_actividad = p_descripcion,
        presupuesto = p_presupuesto
    WHERE id = p_id;
END //

DELIMITER ;


-- ACTIVAR-INACTIVAR
DELIMITER //

CREATE PROCEDURE sp_ActivarInactivarActividad(
    IN p_id INT
)
BEGIN
    DECLARE v_estado_actual BOOLEAN;

    SELECT estado_actividad INTO v_estado_actual
    FROM actividad
    WHERE id = p_id;

    IF FOUND_ROWS() > 0 THEN
        IF v_estado_actual THEN
            UPDATE actividad SET estado_actividad = FALSE WHERE id = p_id;
        ELSE
            UPDATE actividad SET estado_actividad = TRUE WHERE id = p_id;
        END IF;
        SELECT 'Estado del registro modificado correctamente.';
    ELSE
        SELECT 'No se encontró ningún registro con ese ID.';
    END IF;
END //

DELIMITER ;



-- FILTRAR POR PROYECTO

DELIMITER //

CREATE PROCEDURE sp_FiltrarActividadesPorProyecto(
    IN p_id_proyecto INT
)
BEGIN
    SELECT * FROM actividad WHERE id_proyecto = p_id_proyecto;
END //

DELIMITER ;


-- FILTRAR POR ESTADO
DELIMITER //

CREATE PROCEDURE sp_FiltrarActividadesPorEstado(
	IN p_estado BOOLEAN
)
BEGIN
    SELECT * FROM actividad WHERE estado_actividad = p_estado;
END //

DELIMITER ;



