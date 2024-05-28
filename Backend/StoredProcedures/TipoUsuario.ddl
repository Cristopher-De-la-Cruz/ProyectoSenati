/*
-----------------------
	TIPO DE USUARIO        
-----------------------
*/

-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearTipoUsuario (
    IN p_nombre VARCHAR(50)
)
BEGIN
    INSERT INTO tipo_usuario (nombre_tipo)
    VALUES (p_nombre);
END//

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarTipoUsuario (
    IN p_id INT,
    IN p_nombre VARCHAR(50)
)
BEGIN
    UPDATE tipo_usuario
    SET nombre_tipo = p_nombre
    WHERE id = p_id;
END //

DELIMITER ;

-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarTiposUsuarios()
BEGIN
    SELECT * FROM tipo_usuario;
END //

DELIMITER ;




