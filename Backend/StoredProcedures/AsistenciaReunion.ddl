/*
--------------------------
	ASISTENCIA REUNION    
--------------------------
*/


-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearAsistenciaReunion (
    IN p_id_reunion INT
)
BEGIN
    INSERT INTO asistencia_reunion (id_reunion)
    VALUES (p_id_reunion);
END//

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarAsistenciaReunion (
    IN p_id INT,
    IN p_id_reunion INT
)
BEGIN
    UPDATE asistencia_reunion
    SET id_reunion = p_id_reunion
    WHERE id = p_id;
END //

DELIMITER ;


-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarAsistenciasReuniones()
BEGIN
    SELECT * FROM asistencia_reunion;
END //

DELIMITER ;







