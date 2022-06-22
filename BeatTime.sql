DROP SCHEMA IF EXISTS beat_time;
CREATE SCHEMA beat_time;
USE beat_time;

CREATE TABLE type_user(
id_type_user INT PRIMARY KEY AUTO_INCREMENT,
description VARCHAR(15) NOT NULL
);

INSERT INTO type_user (description) VALUES('Administrador'), ('Usuário');

CREATE TABLE users(
cpf BIGINT(11) NOT NULL PRIMARY KEY,
id_type_user INT NOT NULL,
full_name VARCHAR(200) NOT NULL,
birth_date DATETIME NOT NULL,
gender VARCHAR(20) NOT NULL,
email VARCHAR(50) NOT NULL,
telephone VARCHAR(15) NULL,
cellphone VARCHAR(15) NULL,
entry_date DATETIME NOT NULL DEFAULT NOW(),
salary DECIMAL(10,2) NOT NULL,
user_name VARCHAR(20) NOT NULL,
password VARBINARY(255) NOT NULL,
status TINYINT(1) NOT NULL DEFAULT 1,

FOREIGN KEY(id_type_user) REFERENCES type_user(id_type_user)
);

INSERT INTO users (cpf, id_type_user, full_name, birth_date, gender, email, salary, user_name, password) VALUES(11111111111, 1, 'admin', '2000-01-01', 'Other', 'admin@admin.com.br', 1000, 'admin', AES_ENCRYPT('admin', 'beattime2021'));

CREATE TABLE type_spot(
id_type_spot INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
description VARCHAR(15) NOT NULL
);

INSERT INTO type_spot VALUES (1, "Entrada"), (2, "Saída");

CREATE TABLE spot(
cpf BIGINT(11) NOT NULL,
date DATETIME NOT NULL,
id_type_spot INT NOT NULL,

PRIMARY KEY (cpf, date),
FOREIGN KEY(cpf) REFERENCES users(cpf),
FOREIGN KEY(id_type_spot) REFERENCES type_spot(id_type_spot)
);

DELIMITER $$
CREATE FUNCTION sumTimeOfUser(cpf BIGINT(11))
RETURNS INT
BEGIN
	DECLARE sum DECIMAL(10,2) DEFAULT 0;
    DECLARE id_type_spot INT;
    DECLARE date DATETIME;
    DECLARE stop INT DEFAULT 0;
    DECLARE oldDate DATETIME;
    DECLARE oldTypeSpot INT;
    DECLARE curs CURSOR FOR SELECT s.id_type_spot, s.date FROM spot AS s WHERE s.cpf = cpf ORDER BY s.date ASC;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET stop = 1;
	
    OPEN curs;
    WHILE stop = 0 DO
		FETCH curs INTO id_type_spot, date;
        IF id_type_spot = 1 THEN
			SET oldTypeSpot = id_type_spot;
			SET oldDate = date;
        END IF;
        IF id_type_spot = 2 AND oldTypeSpot = 1 THEN
			SET sum = sum + TIMESTAMPDIFF(SECOND, oldDate, date);
            SET oldTypeSpot = 0;
        END IF ;

    END WHILE ;
    CLOSE curs;
    RETURN HOUR(SEC_TO_TIME(sum));
END $$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION sumTimeOfUserByDay(cpf BIGINT(11), _date DATETIME)
RETURNS INT
BEGIN
	DECLARE sum DECIMAL(10,2) DEFAULT 0;
    DECLARE id_type_spot INT;
    DECLARE date DATETIME;
    DECLARE stop INT DEFAULT 0;
    DECLARE oldDate DATETIME;
    DECLARE oldTypeSpot INT;
    DECLARE curs CURSOR FOR SELECT s.id_type_spot, s.date FROM spot AS s WHERE s.cpf = cpf AND DATE(s.date) = _date ORDER BY s.date ASC;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET stop = 1;
	
    OPEN curs;
    WHILE stop = 0 DO
		FETCH curs INTO id_type_spot, date;
        IF id_type_spot = 1 THEN
			SET oldTypeSpot = id_type_spot;
			SET oldDate = date;
        ELSEIF id_type_spot = 2 AND oldTypeSpot = 1 THEN
			SET sum = sum + TIMESTAMPDIFF(SECOND, oldDate, date);
            SET oldTypeSpot = 0;
        END IF ;

    END WHILE ;
    CLOSE curs;
    RETURN HOUR(SEC_TO_TIME(sum));
END $$
DELIMITER ;

DELIMITER $$
SET GLOBAL log_bin_trust_function_creators = 1;
CREATE FUNCTION sumTimeOfUserByWeek(cpf BIGINT(11), startDate DATETIME, endDate DATETIME)
RETURNS INT
BEGIN
	DECLARE sum DECIMAL(10,2) DEFAULT 0;
    DECLARE id_type_spot INT;
    DECLARE date DATETIME;
    DECLARE stop INT DEFAULT 0;
    DECLARE oldDate DATETIME;
    DECLARE oldTypeSpot INT;
    DECLARE curs CURSOR FOR SELECT s.id_type_spot, s.date FROM spot AS s WHERE s.cpf = cpf AND DATE(s.date) BETWEEN startDate AND endDate ORDER BY s.date ASC;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET stop = 1;
	
    OPEN curs;
    WHILE stop = 0 DO
		FETCH curs INTO id_type_spot, date;
        IF id_type_spot = 1 THEN
			SET oldTypeSpot = id_type_spot;
			SET oldDate = date;
        END IF;
        IF id_type_spot = 2 AND oldTypeSpot = 1 THEN
			SET sum = sum + TIMESTAMPDIFF(SECOND, oldDate, date);
            SET oldTypeSpot = 0;
        END IF ;

    END WHILE ;
    CLOSE curs;
    RETURN HOUR(SEC_TO_TIME(sum));
END $$
DELIMITER ;