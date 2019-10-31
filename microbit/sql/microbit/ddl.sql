USE microbit;

DROP TABLE IF EXISTS `data`;

CREATE TABLE `data`
(
	`time` TIMESTAMP NOT NULL UNIQUE, 
    id INT,
    temperature INT,
    light_level INT
    
)
ENGINE INNODB CHARSET utf8mb4;

DROP TABLE IF EXISTS state;

CREATE TABLE state
(
	id INT NOT NULL UNIQUE,
    `row` INT,
    `column` INT

)
ENGINE INNODB CHARSET utf8mb4;

DROP TABLE IF EXISTS dimensions;
CREATE TABLE dimensions
(
	id INT AUTO_INCREMENT,
    xlength INT,
    height INT,
    
    PRIMARY KEY (id)
)
ENGINE INNODB CHARSET utf8mb4;

--
-- Create procedure for inserting into dimensions table
--
DROP PROCEDURE IF EXISTS set_dimensions;
DELIMITER ;;
CREATE PROCEDURE set_dimensions(
    a_length INT,
    a_height INT
)
BEGIN
    INSERT INTO dimensions(xlength, height) VALUES(a_length, a_height);
END
;;
DELIMITER ;

--
-- Create procedure for inserting into dimensions table
--
DROP PROCEDURE IF EXISTS get_dimensions;
DELIMITER ;;
CREATE PROCEDURE get_dimensions()
BEGIN
    SELECT * FROM dimensions ORDER BY id DESC LIMIT 1;
END
;;
DELIMITER ;

--
-- Create procedure for inserting into state table
--
DROP PROCEDURE IF EXISTS create_state;
DELIMITER ;;
CREATE PROCEDURE create_state(
	a_id INT,
    a_row INT,
    a_column INT
)
BEGIN
    INSERT INTO state VALUES(a_id, a_row, a_column);
END
;;
DELIMITER ;

--
-- Create procedure for receiving id of micro:bit
--
DROP PROCEDURE IF EXISTS get_id;
DELIMITER ;;
CREATE PROCEDURE get_id(
    a_row INT,
    a_column INT
)
BEGIN
    SELECT id FROM state WHERE `row`=a_row AND `column`=a_column;
END
;;
DELIMITER ;



--
-- Create procedure for showing everything from `data` table
--
DROP PROCEDURE IF EXISTS show_all;
DELIMITER ;;
CREATE PROCEDURE show_all()
BEGIN
    SELECT * FROM `data`;
END
;;
DELIMITER ;


--
-- Create procedure for showing everything for one specific id from `data` table
--
DROP PROCEDURE IF EXISTS show_history;
DELIMITER ;;
CREATE PROCEDURE show_history(
	a_id INT
)
BEGIN
    SELECT * FROM `data` WHERE id = a_id ORDER BY `time` DESC;
END
;;
DELIMITER ;

--
-- Create procedure for showing live data for one specific id from `data` table
--
DROP PROCEDURE IF EXISTS show_live;
DELIMITER ;;
CREATE PROCEDURE show_live(
	a_id INT
)
BEGIN
    SELECT * FROM `data` WHERE id = a_id ORDER BY `time` DESC LIMIT 1;
END
;;
DELIMITER ;

