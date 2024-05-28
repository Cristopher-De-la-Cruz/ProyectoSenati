/*
---------------------------
	ATENCION AL CLIENTE            
---------------------------
*/

-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearAtencionCliente (
    IN p_id_cliente INT,
    IN p_id_usuario INT,
    IN p_asunto VARCHAR(50),
    IN p_descripcion VARCHAR(50),
    IN p_prioridad VARCHAR(50)
)
BEGIN
    INSERT INTO ficha_atencion_cliente (id_cliente, p_id_usuario, asunto, descripcion, estado_ticket, prioridad)
    VALUES (p_id_cliente, p_id_usuario, p_asunto, p_descripcion, true, p_prioridad);

END//

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarAtencionCliente (
    IN p_id INT,
    IN p_id_cliente INT,
    IN p_id_usuario INT,
    IN p_asunto VARCHAR(50),
    IN p_descripcion VARCHAR(50),
    IN p_prioridad VARCHAR(50)
)
BEGIN
    UPDATE ficha_atencion_cliente
    SET id_cliente = p_id_cliente,
        id_usuario = p_id_usuario,
        asunto = p_asunto,
        descripcion = p_descripcion,
        prioridad = p_prioridad
    WHERE id = p_id;
END //

DELIMITER ;


-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarAtencionCliente(
    IN cliente_id INT,
    IN usuario_id INT
)
BEGIN
    IF cliente_id IS NOT NULL AND usuario_id IS NOT NULL THEN
        SELECT * FROM ficha_atencion_cliente 
        WHERE id_cliente = cliente_id AND id_usuario = usuario_id;
    ELSEIF cliente_id IS NOT NULL THEN
        SELECT * FROM ficha_atencion_cliente 
        WHERE id_cliente = cliente_id;
    ELSEIF usuario_id IS NOT NULL THEN
        SELECT * FROM ficha_atencion_cliente 
        WHERE id_usuario = usuario_id;
    ELSE
        SELECT * FROM ficha_atencion_cliente;
    END IF;
END //

DELIMITER ;


-- ACTIVAR-INACTIVAR
DELIMITER //

CREATE PROCEDURE sp_ActivarInactivarAtencionCliente(
    IN p_id INT
)
BEGIN
    DECLARE v_estado_actual BOOLEAN;

    SELECT estado_ticket INTO v_estado_actual
    FROM ficha_atencion_cliente
    WHERE id = p_id;

    IF FOUND_ROWS() > 0 THEN
        IF v_estado_actual THEN
            UPDATE ficha_atencion_cliente SET estado_ticket = FALSE WHERE id = p_id;
        ELSE
            UPDATE ficha_atencion_cliente SET estado_ticket = TRUE WHERE id = p_id;
        END IF;
        SELECT 'Estado del registro  modificado correctamente.';
    ELSE
        SELECT 'No se encontró ningún registro con ese ID.';
    END IF;
END //

DELIMITER ;


-- FILTRAR POR ESTADO
DELIMITER //

CREATE PROCEDURE sp_FiltrarAtencionClientePorEstado(
	IN p_estado BOOLEAN
)
BEGIN
    SELECT * FROM ficha_atencion_cliente WHERE estado_ticket = p_estado;
END //

DELIMITER ;



