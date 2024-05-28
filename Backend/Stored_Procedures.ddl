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
    FROM clientes
    WHERE id_cliente = p_id_cliente;

    IF FOUND_ROWS() > 0 THEN
        IF v_estado_actual THEN
            UPDATE clientes SET estado_cliente = FALSE WHERE id_cliente = p_id_cliente;
        ELSE
            UPDATE clientes SET estado_cliente = TRUE WHERE id_cliente = p_id_cliente;
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


/*
--------------------------
	ASISTENCIA REUNION    
--------------------------
*/


-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearAsistenciaReunion (
    IN p_id_reunion INT
)
BEGIN
    INSERT INTO asistencia_reunion (id_reunion)
    VALUES (p_id_reunion);
END//

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarAsistenciaReunion (
    IN p_id INT,
    IN p_id_reunion INT
)
BEGIN
    UPDATE asistencia_reunion
    SET id_reunion = p_id_reunion
    WHERE id = p_id;
END //

DELIMITER ;


-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarAsistenciasReuniones()
BEGIN
    SELECT * FROM asistencia_reunion;
END //

DELIMITER ;


/*
---------------------------
	ASISTENCIA USUARIOS    
---------------------------
*/

-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearAsistenciaUsuario (
    IN p_id_usuario INT,
    IN p_id_asistencia INT
)
BEGIN
    INSERT INTO asistencia_usuarios (id_usuario, asistencia, id_asistencia)
    VALUES (p_id_usuario, false, p_id_asistencia);
END//

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarAsistenciaUsuario (
    IN p_id INT,
    IN p_id_usuario INT,
    IN p_id_asistencia INT
)
BEGIN
    UPDATE asistencia_usuarios
    SET id_usuario = p_id_usuario,
    id_asistencia = p_id_asistencia
    WHERE id = p_id;
END //

DELIMITER ;


-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarAsistenciasUsuarios()
BEGIN
    SELECT * FROM asistencia_usuarios;
END //

DELIMITER ;


-- ASISTENCIA INASISTENCIA
DELIMITER //

CREATE PROCEDURE sp_AsistenciaInasistenciaUsuario(
    IN p_id INT
)
BEGIN
    DECLARE v_asistencia_actual BOOLEAN;

    SELECT asistencia INTO v_asistencia_actual
    FROM asistencia_usuarios
    WHERE id = p_id;

    IF FOUND_ROWS() > 0 THEN
        IF v_asistencia_actual THEN
            UPDATE asistencia_usuarios SET asistencia = FALSE WHERE id = p_id;
        ELSE
            UPDATE asistencia_usuarios SET asistencia = TRUE WHERE id = p_id;
        END IF;
        SELECT 'Asistencia del usuario modificado correctamente.';
    ELSE
        SELECT 'No se encontró ningún registro con ese ID.';
    END IF;
END //

DELIMITER ;


-- FILTRAR POR ASISTENCIA
DELIMITER //

CREATE PROCEDURE sp_FiltrarUsuariosPorAsistencia(
	IN p_asistencia BOOLEAN
)
BEGIN
    SELECT * FROM asistencia_usuarios WHERE asistencia = p_asistencia;
END //

DELIMITER ;


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


/*
----------------
	PROYECTO    
----------------
*/


-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearProyecto (
    IN p_objetivo VARCHAR(50),
    IN p_fecha_inicio DATE,
    IN p_fecha_final DATE,
    IN p_presupuesto INTEGER,
    IN p_id_contrato INT,
    IN p_descripcion VARCHAR(255)
)
BEGIN
    INSERT INTO proyecto (objetivo, fecha_inicio, fecha_final, estado_proyecto, presupuesto, id_contrato, descripcion)
    VALUES (p_objetivo, p_fecha_inicio, p_fecha_final, true, p_presupuesto, p_id_contrato, p_descripcion);

END//

DELIMITER ;


-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarProyectos()
BEGIN
    SELECT * FROM proyecto;
END //

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarProyecto (
    IN p_id INT,
    IN p_objetivo VARCHAR(50),
    IN p_fecha_inicio DATE,
    IN p_fecha_final DATE,
    IN p_presupuesto INTEGER,
    IN p_id_contrato INT,
    IN p_descripcion VARCHAR(255)
)
BEGIN
    UPDATE proyecto
    SET objetivo = p_nombre,
        fecha_inicio = p_email,
        fecha_final = p_password,
        presupuesto = p_presupuesto,
        id_contrato = p_id_contrato,
        descripcion = p_descripcion
    WHERE id = p_id;
END //

DELIMITER ;

-- ACTIVAR-INACTIVAR
DELIMITER //

CREATE PROCEDURE sp_ActivarInactivarProyecto(
    IN p_id INT
)
BEGIN
    DECLARE v_estado_actual BOOLEAN;

    SELECT estado_proyecto INTO v_estado_actual
    FROM proyecto
    WHERE id = p_id;

    IF FOUND_ROWS() > 0 THEN
        IF v_estado_actual THEN
            UPDATE proyecto SET estado_proyecto = FALSE WHERE id = p_id;
        ELSE
            UPDATE proyecto SET estado_proyecto = TRUE WHERE id = p_id;
        END IF;
        SELECT 'Estado del proyecto modificado correctamente.';
    ELSE
        SELECT 'No se encontró ningún proyecto con ese ID.';
    END IF;
END //

DELIMITER ;


-- FILTRAR POR ESTADO
DELIMITER //

CREATE PROCEDURE sp_FiltrarProyectoPorEstado(
	IN p_estado BOOLEAN
)
BEGIN
    SELECT * FROM proyecto WHERE estado_proyecto = p_estado;
END //

DELIMITER ;



/*
-----------------
	ACTIVIDAD    
-----------------
*/


-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearActividad (
    IN p_id_proyecto INT,
    IN p_titulo_actividad VARCHAR(50),
    IN p_descripcion VARCHAR(50),
    IN p_presupuesto INTEGER
)
BEGIN
    INSERT INTO actividad (id_proyecto, titulo_actividad, descripcion_actividad, presupuesto, estado_actividad)
    VALUES (p_id_proyecto, p_titulo_actividad, p_descripcion, p_presupuesto, true);

END//

DELIMITER ;


-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarActividades()
BEGIN
    SELECT * FROM actividad;
END //

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarActividad (
    IN p_id INT,
    IN p_id_proyecto INT,
    IN p_titulo_actividad VARCHAR(50),
    IN p_descripcion VARCHAR(50),
    IN p_presupuesto INTEGER
)
BEGIN
    UPDATE actividad
    SET id_proyecto = p_id_proyecto,
        titulo_actividad = p_titulo_actividad,
        descripcion_actividad = p_descripcion,
        presupuesto = p_presupuesto
    WHERE id = p_id;
END //

DELIMITER ;


-- ACTIVAR-INACTIVAR
DELIMITER //

CREATE PROCEDURE sp_ActivarInactivarActividad(
    IN p_id INT
)
BEGIN
    DECLARE v_estado_actual BOOLEAN;

    SELECT estado_actividad INTO v_estado_actual
    FROM actividad
    WHERE id = p_id;

    IF FOUND_ROWS() > 0 THEN
        IF v_estado_actual THEN
            UPDATE actividad SET estado_actividad = FALSE WHERE id = p_id;
        ELSE
            UPDATE actividad SET estado_actividad = TRUE WHERE id = p_id;
        END IF;
        SELECT 'Estado del registro modificado correctamente.';
    ELSE
        SELECT 'No se encontró ningún registro con ese ID.';
    END IF;
END //

DELIMITER ;



-- FILTRAR POR PROYECTO

DELIMITER //

CREATE PROCEDURE sp_FiltrarActividadesPorProyecto(
    IN p_id_proyecto INT
)
BEGIN
    SELECT * FROM actividad WHERE id_proyecto = p_id_proyecto;
END //

DELIMITER ;


-- FILTRAR POR ESTADO
DELIMITER //

CREATE PROCEDURE sp_FiltrarActividadesPorEstado(
	IN p_estado BOOLEAN
)
BEGIN
    SELECT * FROM actividad WHERE estado_actividad = p_estado;
END //

DELIMITER ;


/*
-------------------------
	ACTIVIDAD USUARIO        
-------------------------
*/
-- CREAR
DELIMITER //

CREATE PROCEDURE sp_CrearActividadUsuario (
    IN p_id_actividad INT,
    IN p_id_usuario INT
)
BEGIN
    INSERT INTO actividad_usuario (id_actividad, id_usuario)
    VALUES (p_id_actividad, p_id_usuario);
END//

DELIMITER ;


-- EDITAR
DELIMITER //

CREATE PROCEDURE sp_EditarActividadUsuario (
    IN p_id INT,
    IN p_id_actividad INT,
    IN p_id_usuario INT
)
BEGIN
    UPDATE actividad_usuario
    SET id_actividad = p_id_actividad,
        id_usuario = p_id_usuario
    WHERE id = p_id;
END //

DELIMITER ;


-- VISUALIZAR
DELIMITER // 

CREATE PROCEDURE sp_VisualizarActividadUsuarios()
BEGIN
    SELECT * FROM actividad_usuario;
END //

DELIMITER ;





