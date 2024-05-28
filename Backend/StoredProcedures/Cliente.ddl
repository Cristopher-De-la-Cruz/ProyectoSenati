/*
----------------
	CLIENTES
----------------
*/
-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearCliente (
    IN p_nombre VARCHAR(15),
    IN p_telefono_contacto VARCHAR(15),
    IN p_estado_cliente BOOLEAN,
    IN p_correo_electronico VARCHAR(15),
    IN p_tipo_cliente ENUM('corporativo', 'natural'),
    IN p_identificador INT,
    IN p_nombre_contacto_apellido VARCHAR(15),
    IN p_direccion VARCHAR(15)
)
BEGIN
    DECLARE last_inserted_id INT;

    INSERT INTO CLIENTE (nombre, telefono_contacto, estado_cliente, correo_electronico)
    VALUES (p_nombre, p_telefono_contacto, p_estado_cliente, p_correo_electronico);

    SET last_inserted_id = LAST_INSERT_ID();

    IF p_tipo_cliente = 'corporativo' THEN
        INSERT INTO CLIENTE_CORPORATIVO (ruc, nombre_contacto, direccion_comercial, id_cliente)
        VALUES (p_identificador, p_nombre_contacto_apellido, p_direccion, last_inserted_id);
    ELSEIF p_tipo_cliente = 'natural' THEN
        INSERT INTO CLIENTE_NATURAL (dni, apellido, direccion, id_cliente)
        VALUES (p_identificador, p_nombre_contacto_apellido, p_direccion, last_inserted_id);
    END IF;
END //

DELIMITER ;



-- VISUALIZAR
DELIMITER //
CREATE PROCEDURE sp_ObtenerClientes()
BEGIN
    SELECT * FROM CLIENTE;
END //
DELIMITER ;


-- ACTUALIZAR
DELIMITER //

CREATE PROCEDURE sp_ActualizarCliente (
    IN p_id_cliente INT,
    IN p_nombre VARCHAR(15),
    IN p_telefono_contacto VARCHAR(15),
    IN p_estado_cliente BOOLEAN,
    IN p_correo_electronico VARCHAR(15),
    IN p_identificador INT,
    IN p_nombre_contacto_apellido VARCHAR(15),
    IN p_direccion VARCHAR(15)
)
BEGIN
    DECLARE cliente_tipo ENUM('corporativo', 'natural');

    SELECT tipo_cliente INTO cliente_tipo FROM (
        SELECT 'corporativo' AS tipo_cliente FROM CLIENTE_CORPORATIVO WHERE id_cliente = p_id_cliente
        UNION ALL
        SELECT 'natural' AS tipo_cliente FROM CLIENTE_NATURAL WHERE id_cliente = p_id_cliente
    ) AS subquery LIMIT 1;

    UPDATE CLIENTE
    SET
        nombre = IFNULL(p_nombre, nombre),
        telefono_contacto = IFNULL(p_telefono_contacto, telefono_contacto),
        estado_cliente = IFNULL(p_estado_cliente, estado_cliente),
        correo_electronico = IFNULL(p_correo_electronico, correo_electronico)
    WHERE id_cliente = p_id_cliente;

    IF cliente_tipo = 'corporativo' THEN
        UPDATE CLIENTE_CORPORATIVO
        SET
            ruc = IFNULL(p_identificador, ruc),
            nombre_contacto = IFNULL(p_nombre_contacto_apellido, nombre_contacto),
            direccion_comercial = IFNULL(p_direccion, direccion_comercial)
        WHERE id_cliente = p_id_cliente;
    ELSEIF cliente_tipo = 'natural' THEN
        UPDATE CLIENTE_NATURAL
        SET
            dni = IFNULL(p_identificador, dni),
            apellido = IFNULL(p_nombre_contacto_apellido, apellido),
            direccion = IFNULL(p_direccion, direccion)
        WHERE id_cliente = p_id_cliente;
    END IF;
END //

DELIMITER ;


-- ACTIVAR-INACTIVAR
DELIMITER //

CREATE PROCEDURE sp_ActivarInactivarCliente(
    IN p_id_cliente INT
)
BEGIN
    DECLARE v_estado_actual BOOLEAN;

    SELECT estado_cliente INTO v_estado_actual
    FROM cliente
    WHERE id = p_id_cliente;

    IF FOUND_ROWS() > 0 THEN
        IF v_estado_actual THEN
            UPDATE cliente SET estado_cliente = FALSE WHERE id = p_id_cliente;
        ELSE
            UPDATE cliente SET estado_cliente = TRUE WHERE id = p_id_cliente;
        END IF;
        SELECT 'Estado del cliente modificado correctamente.';
    ELSE
        SELECT 'No se encontró ningún cliente con ese ID.';
    END IF;
END //

DELIMITER ;

-- FILTRAR POR ESTADO

DELIMITER //

CREATE PROCEDURE sp_FiltrarClientePorEstado(
	IN p_estado_cliente BOOLEAN
)
BEGIN
    SELECT * FROM cliente WHERE estado_cliente = p_estado_cliente;
END //

DELIMITER ;


-- BUSCAR POR ID
DELIMITER //

CREATE PROCEDURE sp_BuscarClientePorId(
	IN p_id INT
)
BEGIN
    SELECT * FROM cliente WHERE id = p_id;
END //

DELIMITER ;


-- BUSCAR POR NOMBRE
DELIMITER //

CREATE PROCEDURE sp_BuscarClientePorNombre(
    IN p_nombre VARCHAR(100)
)
BEGIN
    SELECT * FROM cliente WHERE nombre LIKE CONCAT(p_nombre, '%');
END //

DELIMITER ;