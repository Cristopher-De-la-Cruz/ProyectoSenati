/*
---------------------------
	CLIENTE CORPORATIVO
---------------------------
*/


-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearClienteCorporativo (
    IN p_ruc INTEGER,
    IN p_nombre_contacto VARCHAR(50),
    IN p_direccion_comercial VARCHAR(50),
    IN p_id_cliente INTEGER
)
BEGIN
    INSERT INTO CLIENTE_CORPORATIVO (ruc, nombre_contacto, direccion_comercial, id_cliente)
    VALUES (p_ruc, p_nombre_contacto, p_direccion_comercial, p_id_cliente);

END//

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarClienteCorporativo (
    IN p_id INT,
    IN p_ruc INT,
    IN p_nombre_contacto VARCHAR(50),
    IN p_direccion_comercial VARCHAR(50),
    IN p_id_cliente INT
)
BEGIN
    UPDATE CLIENTE_CORPORATIVO
    SET ruc = p_ruc,
        nombre_contacto = p_nombre_contacto,
        direccion_comercial = p_direccion_comercial,
        id_cliente = p_id_cliente
    WHERE id = p_id;
END //

DELIMITER ;


-- VISUALIZAR
DELIMITER //

CREATE PROCEDURE sp_VisualizarClientesCorporativos()
BEGIN
    SELECT * FROM CLIENTE_CORPORATIVO;
END //

DELIMITER ;

-- BUSCAR POR RUC V1
DELIMITER //

CREATE PROCEDURE sp_BuscarClientePorRucV1(
    IN p_ruc INT
)
BEGIN
    SELECT * FROM CLIENTE_CORPORATIVO WHERE ruc = p_ruc;
END //

DELIMITER ;

-- BUSCAR POR RUC V2
DELIMITER //

CREATE PROCEDURE sp_BuscarClientePorRucV2(
    IN p_ruc INT
)
BEGIN
    SELECT * FROM CLIENTE_CORPORATIVO WHERE ruc LIKE CONCAT(p_ruc, '%');
END //

DELIMITER ;