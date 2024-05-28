/*
---------------------------
	ASISTENCIA USUARIOS    
---------------------------
*/

-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearAsistenciaUsuario (
    IN p_id_usuario INT,
    IN p_id_asistencia INT
)
BEGIN
    INSERT INTO asistencia_usuarios (id_usuario, asistencia, id_asistencia)
    VALUES (p_id_usuario, false, p_id_asistencia);
END//

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarAsistenciaUsuario (
    IN p_id INT,
    IN p_id_usuario INT,
    IN p_id_asistencia INT
)
BEGIN
    UPDATE asistencia_usuarios
    SET id_usuario = p_id_usuario,
    id_asistencia = p_id_asistencia
    WHERE id = p_id;
END //

DELIMITER ;


-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarAsistenciasUsuarios()
BEGIN
    SELECT * FROM asistencia_usuarios;
END //

DELIMITER ;


-- ASISTENCIA INASISTENCIA
DELIMITER //

CREATE PROCEDURE sp_AsistenciaInasistenciaUsuario(
    IN p_id INT
)
BEGIN
    DECLARE v_asistencia_actual BOOLEAN;

    SELECT asistencia INTO v_asistencia_actual
    FROM asistencia_usuarios
    WHERE id = p_id;

    IF FOUND_ROWS() > 0 THEN
        IF v_asistencia_actual THEN
            UPDATE asistencia_usuarios SET asistencia = FALSE WHERE id = p_id;
        ELSE
            UPDATE asistencia_usuarios SET asistencia = TRUE WHERE id = p_id;
        END IF;
        SELECT 'Asistencia del usuario modificado correctamente.';
    ELSE
        SELECT 'No se encontró ningún registro con ese ID.';
    END IF;
END //

DELIMITER ;


-- FILTRAR POR ASISTENCIA
DELIMITER //

CREATE PROCEDURE sp_FiltrarUsuariosPorAsistencia(
	IN p_asistencia BOOLEAN
)
BEGIN
    SELECT * FROM asistencia_usuarios WHERE asistencia = p_asistencia;
END //

DELIMITER ;



