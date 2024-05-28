/*
----------------
	PROYECTO    
----------------
*/


-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearProyecto (
    IN p_objetivo VARCHAR(50),
    IN p_fecha_inicio DATE,
    IN p_fecha_final DATE,
    IN p_presupuesto INTEGER,
    IN p_id_contrato INT,
    IN p_descripcion VARCHAR(255)
)
BEGIN
    INSERT INTO proyecto (objetivo, fecha_inicio, fecha_final, estado_proyecto, presupuesto, id_contrato, descripcion)
    VALUES (p_objetivo, p_fecha_inicio, p_fecha_final, true, p_presupuesto, p_id_contrato, p_descripcion);

END//

DELIMITER ;


-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarProyectos()
BEGIN
    SELECT * FROM proyecto;
END //

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarProyecto (
    IN p_id INT,
    IN p_objetivo VARCHAR(50),
    IN p_fecha_inicio DATE,
    IN p_fecha_final DATE,
    IN p_presupuesto INTEGER,
    IN p_id_contrato INT,
    IN p_descripcion VARCHAR(255)
)
BEGIN
    UPDATE proyecto
    SET objetivo = p_objetivo,
        fecha_inicio = p_fecha_inicio,
        fecha_final = p_fecha_final,
        presupuesto = p_presupuesto,
        id_contrato = p_id_contrato,
        descripcion = p_descripcion
    WHERE id = p_id;
END //

DELIMITER ;

-- ACTIVAR-INACTIVAR
DELIMITER //

CREATE PROCEDURE sp_ActivarInactivarProyecto(
    IN p_id INT
)
BEGIN
    DECLARE v_estado_actual BOOLEAN;

    SELECT estado_proyecto INTO v_estado_actual
    FROM proyecto
    WHERE id = p_id;

    IF FOUND_ROWS() > 0 THEN
        IF v_estado_actual THEN
            UPDATE proyecto SET estado_proyecto = FALSE WHERE id = p_id;
        ELSE
            UPDATE proyecto SET estado_proyecto = TRUE WHERE id = p_id;
        END IF;
        SELECT 'Estado del proyecto modificado correctamente.';
    ELSE
        SELECT 'No se encontró ningún proyecto con ese ID.';
    END IF;
END //

DELIMITER ;


-- FILTRAR POR ESTADO
DELIMITER //

CREATE PROCEDURE sp_FiltrarProyectoPorEstado(
	IN p_estado BOOLEAN
)
BEGIN
    SELECT * FROM proyecto WHERE estado_proyecto = p_estado;
END //

DELIMITER ;



