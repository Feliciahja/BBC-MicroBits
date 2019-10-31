DROP DATABASE IF EXISTS microbit;
CREATE DATABASE IF NOT EXISTS microbit;
USE microbit;

DROP USER IF EXISTS 'user'@'%';
CREATE USER 'user'@'%'
IDENTIFIED
WITH mysql_native_password
BY 'pass'
;

GRANT ALL PRIVILEGES ON microbit.* 
TO 'user'@'%' 
WITH GRANT OPTION 
;

FLUSH PRIVILEGES;

SET GLOBAL local_infile = 1;