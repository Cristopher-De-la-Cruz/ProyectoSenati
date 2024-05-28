/*
-------------------------
	ACTIVIDAD USUARIO        
-------------------------
*/
-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearActividadUsuario (
    IN p_id_actividad INT,
    IN p_id_usuario INT
)
BEGIN
    INSERT INTO actividad_usuario (id_actividad, id_usuario)
    VALUES (p_id_actividad, p_id_usuario);
END//

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarActividadUsuario (
    IN p_id INT,
    IN p_id_actividad INT,
    IN p_id_usuario INT
)
BEGIN
    UPDATE actividad_usuario
    SET id_actividad = p_id_actividad,
        id_usuario = p_id_usuario
    WHERE id = p_id;
END //

DELIMITER ;


-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarActividadUsuarios()
BEGIN
    SELECT * FROM actividad_usuario;
END //

DELIMITER ;











