DELIMITER //

CREATE PROCEDURE CheckLogin(IN p_email VARCHAR(255), IN p_password VARCHAR(255), OUT p_result INT)
BEGIN
    DECLARE user_id INT;

    -- Inicializa el resultado
    SET p_result = 0;

    -- Verifica la combinación de correo electrónico y contraseña
    SELECT id INTO user_id
    FROM users
    WHERE email = p_email AND password = p_password;

    -- Si el usuario existe, devuelve el ID del usuario
    IF user_id IS NOT NULL THEN
        SET p_result = user_id;
    END IF;
END //

DELIMITER ;
