/*
---------------
	REUNION    
---------------
*/

-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearReunion (
    IN p_id_organizador_reunion INTEGER,
    IN p_titulo VARCHAR(50),
    IN p_motivo VARCHAR(50),
    IN p_hora_fecha DATETIME,
    IN p_medio_reunion VARCHAR(15),
    in p_prioridad VARCHAR(15)
)
BEGIN
    INSERT INTO reunion (id_organizador_reunion, titulo, motivo, hora_fecha, medio_reunion, prioridad)
    VALUES (p_id_organizador_reunion, p_titulo, p_motivo, p_hora_fecha, p_medio_reunion, p_prioridad);

END//

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarReunion (
    IN p_id INT,
    IN p_titulo VARCHAR(50),
    IN p_motivo VARCHAR(50),
    IN p_hora_fecha DATETIME,
    IN p_medio_reunion VARCHAR(15),
    in p_prioridad VARCHAR(15)
)
BEGIN
    UPDATE reunion
    SET titulo = p_titulo,
        motivo = p_motivo,
        hora_fecha = p_hora_fecha,
        medio_reunion = p_medio_reunion,
        prioridad = p_prioridad
    WHERE id = p_id;
END //

DELIMITER ;


-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarReuniones()
BEGIN
    SELECT * FROM reunion;
END //

DELIMITER ;


-- FILTRAR POR FECHA
DELIMITER // 

CREATE PROCEDURE sp_FiltrarReunionesPorFecha(
    IN p_hora_fecha DATETIME
)
BEGIN
    SELECT * FROM reunion WHERE hora_fecha = p_hora_fecha;
END //

DELIMITER ;


