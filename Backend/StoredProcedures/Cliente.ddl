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
    IN p_nombre VARCHAR(100),
    IN p_telefono_contacto VARCHAR(100),
    IN p_correo_electronico VARCHAR(100),
    IN p_identificador INT,
    IN p_nombre_contacto_apellido VARCHAR(100),
    IN p_direccion VARCHAR(100)
)
BEGIN
    DECLARE cliente_tipo ENUM('corporativo', 'natural');
    
    UPDATE cliente
    SET nombre = p_nombre,
    telefono_contacto = p_telefono_contacto,
    correo_electronico = p_correo_electronico
    WHERE id = p_id_cliente;
    
    UPDATE cliente_corporativo
    SET ruc = p_identificador,
    nombre_contacto = p_nombre_contacto_apellido,
    direccion_comercial = p_direccion
    WHERE id_cliente = p_id_cliente;

	UPDATE cliente_natural
    SET dni = p_identificador,
    apellido = p_nombre_contacto_apellido,
    direccion = p_direccion
    WHERE id_cliente = p_id_cliente;
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