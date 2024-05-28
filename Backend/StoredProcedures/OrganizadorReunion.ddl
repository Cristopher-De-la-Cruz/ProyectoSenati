/*
---------------------------
	ORGANIZADOR REUNION                
---------------------------
*/

-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearOrganizador (
    IN p_id_usuario INT
)
BEGIN
    INSERT INTO organizador_reunion (id_usuario)
    VALUES (p_id_usuario);
END//

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarOrganizador (
    IN p_id INT,
    IN p_id_usuario INT
)
BEGIN
    UPDATE organizador_reunion
    SET id_usuario = p_id_usuario
    WHERE id = p_id;
END //

DELIMITER ;


-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarOrganizadores()
BEGIN
    SELECT * FROM organizador_reunion;
END //

DELIMITER ;