--
-- Importera från Excel till Tabell
--
USE microbit;
SHOW VARIABLES LIKE "secure_file_priv";

DELETE FROM `data`;

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\bibi.csv' 
INTO TABLE `data`
CHARSET utf8mb4 
FIELDS 
    TERMINATED BY ',' 
LINES 
    TERMINATED BY '\n' 
IGNORE 1 LINES 
; 

SELECT * FROM `data`;

SELECT * FROM dimensions;

INSERT INTO ´data´(´time´, id, temperature, light_level) VALUES('2019-10-20 19:55:36',1,38,9);
INSERT INTO `data`(`time`, id, temperature, light_level) VALUES ('2019-10-20 15:07:06', 1, 29, 3);

DELETE FROM state;
SELECT * FROM state;

