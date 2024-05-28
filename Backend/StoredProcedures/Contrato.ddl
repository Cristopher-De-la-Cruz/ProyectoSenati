/*
----------------
	CONTRATO    
----------------
*/

-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearContrato (
    IN p_id_cliente INTEGER,
    IN p_fecha DATE,
    IN p_condiciones VARCHAR(255),
    IN p_descripcion VARCHAR(50),
    IN p_precio INT,
    IN p_ruta VARCHAR(35)
)
BEGIN
    INSERT INTO contrato (id_cliente, fecha_contrato, condiciones, descripcion, precio_compra, estado_contrato, ruta_contrato)
    VALUES (p_id_cliente, p_fecha, p_condiciones, p_descripcion, p_precio, true, p_ruta);

END//

DELIMITER ;


-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarContratos()
BEGIN
    SELECT * FROM contrato;
END //

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarContrato (
    IN p_id INT,
    IN p_id_cliente INTEGER,
    IN p_fecha DATE,
    IN p_condiciones VARCHAR(255),
    IN p_descripcion VARCHAR(50),
    IN p_precio INT,
    IN p_ruta VARCHAR(35)
)
BEGIN
    UPDATE contrato
    SET id_cliente = p_id_cliente,
        fecha_contrato = p_fecha,
        condiciones = p_condiciones,
        descripcion = p_descripcion,
        precio_compra = p_precio, 
        ruta_contrato = p_ruta
    WHERE id = p_id;
END //

DELIMITER ;


-- FILTRAR POR FECHA
DELIMITER // 

CREATE PROCEDURE sp_FiltrarContratosPorFecha(
    IN p_fecha DATE
)
BEGIN
    SELECT * FROM contrato WHERE fecha_contrato = p_fecha;
END //

DELIMITER ;


