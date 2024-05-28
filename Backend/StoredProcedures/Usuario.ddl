/*
----------------
	USUARIOS    
----------------
*/


-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearUsuario (
    IN p_nombre VARCHAR(50),
    IN p_email VARCHAR(50),
    IN p_password VARCHAR(50),
    IN p_id_tipo_usuario INTEGER
)
BEGIN
    INSERT INTO usuario (nombre, email, password, estado, id_tipo_usuario)
    VALUES (p_nombre, p_email, p_password, true, p_id_tipo_usuario);

END//

DELIMITER ;


-- LOGIN



-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarUsuarios()
BEGIN
    SELECT * FROM usuario;
END //

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarUsuario (
    IN p_id INT,
    IN p_nombre VARCHAR(50),
    IN p_email VARCHAR(50),
    IN p_password VARCHAR(50)
)
BEGIN
    UPDATE usuario
    SET nombre = p_nombre,
        email = p_email,
        password = p_password
    WHERE id = p_id;
END //

DELIMITER ;


-- ACTIVAR-INACTIVAR
DELIMITER //

CREATE PROCEDURE sp_ActivarInactivarUsuario(
    IN p_id INT
)
BEGIN
    DECLARE v_estado_actual BOOLEAN;

    SELECT estado INTO v_estado_actual
    FROM usuario
    WHERE id = p_id;

    IF FOUND_ROWS() > 0 THEN
        IF v_estado_actual THEN
            UPDATE usuario SET estado = FALSE WHERE id = p_id;
        ELSE
            UPDATE usuario SET estado = TRUE WHERE id = p_id;
        END IF;
        SELECT 'Estado del usuario modificado correctamente.';
    ELSE
        SELECT 'No se encontró ningún usuario con ese ID.';
    END IF;
END //

DELIMITER ;


-- BUSCAR POR NOMBRE
DELIMITER //

CREATE PROCEDURE sp_BuscarUsuarioPorNombre(
    IN p_nombre VARCHAR(100)
)
BEGIN
    SELECT * FROM usuario WHERE nombre LIKE CONCAT(p_nombre, '%');
END //

DELIMITER ;


-- FILTRAR POR ESTADO
DELIMITER //

CREATE PROCEDURE sp_FiltrarUsuariosPorEstado(
	IN p_estado BOOLEAN
)
BEGIN
    SELECT * FROM usuario WHERE estado = p_estado;
END //

DELIMITER ;
