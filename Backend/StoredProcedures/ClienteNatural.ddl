/*
-----------------------
	CLIENTE NATURAL    
-----------------------
*/
-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearClienteNatural (
    IN p_dni INTEGER,
    IN p_apellido VARCHAR(50),
    IN p_direccion VARCHAR(50),
    IN p_id_cliente INTEGER
)
BEGIN
    INSERT INTO CLIENTE_NATURAL (dni, apellido, direccion, id_cliente)
    VALUES (p_dni, p_apellido, p_direccion, p_id_cliente);

END//

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarClienteNatural (
    IN p_id INT,
    IN p_dni INT,
    IN p_apellido VARCHAR(50),
    IN p_direccion VARCHAR(50),
    IN p_id_cliente INT
)
BEGIN
    UPDATE CLIENTE_CORPORATIVO
    SET dni = p_dni,
        apellido = p_apellido,
        direccion = p_direccion,
        id_cliente = p_id_cliente
    WHERE id = p_id;
END //

DELIMITER ;

-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarClientesNaturales()
BEGIN
    SELECT * FROM CLIENTE_NATURAL;
END //

DELIMITER ;

-- BUSCAR POR DNI V1
DELIMITER //

CREATE PROCEDURE sp_BuscarClientePorDNIV1(
    IN p_dni INT
)
BEGIN
    SELECT * FROM CLIENTE_NATURAL WHERE dni = p_dni;
END //

DELIMITER ;

-- BUSCAR POR RUC V2
DELIMITER //

CREATE PROCEDURE sp_BuscarClientePorDNIV2(
    IN p_dni INT
)
BEGIN
    SELECT * FROM CLIENTE_NATURAL WHERE ruc LIKE CONCAT(p_dni, '%');
END //

DELIMITER ;