CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL AUTO_INCREMENT,
    cpf VARCHAR(12) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(128) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,

    PRIMARY KEY (id)
) ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS vehicles (
    id int NOT NULL AUTO_INCREMENT,
    seller_id int NOT NULL,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year int NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    type VARCHAR(128) NOT NULL,
    mileage int NOT NULL,
    transmission VARCHAR(128) NOT NULL,
    fuel_type VARCHAR(128) NOT NULL,
    engine VARCHAR(128) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (seller_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS items (
  id int NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  
  PRIMARY KEY (id)
) ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS vehicles_items (
    vehicle_id int NOT NULL,
    item_id int NOT NULL,

    FOREIGN KEY (item_id)
        REFERENCES items(id)
        ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id)
        REFERENCES vehicles(id)
        ON DELETE CASCADE
) ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS vehicles_images (
    vehicle_id int NOT NULL,
    image_url VARCHAR(2048) NOT NULL,

    FOREIGN KEY (vehicle_id)
        REFERENCES vehicles(id)
        ON DELETE CASCADE
) ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS log_vehicles LIKE vehicles;

CREATE PROCEDURE modifyLogTable() 
BEGIN
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN END;
    ALTER TABLE log_vehicles MODIFY COLUMN id int NOT NULL, DROP PRIMARY KEY,
        ADD action VARCHAR(8) NOT NULL, 
        ADD modification_id int NOT NULL AUTO_INCREMENT,
        ADD action_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ADD PRIMARY KEY (modification_id, id);
END;

CALL modifyLogTable();
DROP PROCEDURE modifyLogTable;



CREATE OR REPLACE VIEW vehicles_home_page AS
    SELECT id, CONCAT(brand, ' ', model) AS name, year, price, mileage, engine FROM vehicles;



CREATE PROCEDURE IF NOT EXISTS countVehicles(b VARCHAR(255), mo VARCHAR(255), y int, p DECIMAL(12, 2), mi int, en VARCHAR(255))
    SELECT COUNT(*) AS count FROM vehicles_home_page WHERE
        name LIKE CONCAT('%', b, '%', mo, '%') AND
        year >= y AND
        price <= p AND
        mileage <= mi AND
        engine LIKE CONCAT('%', en, '%');


CREATE PROCEDURE IF NOT EXISTS getVehicles(b VARCHAR(255), mo VARCHAR(255), y int, p DECIMAL(12, 2), mi int, en VARCHAR(255), li int, o int)
    SELECT * FROM vehicles_home_page WHERE
        name LIKE CONCAT('%', b, '%', mo, '%') AND
        year >= y AND
        price <= p AND
        mileage <= mi AND
        engine LIKE CONCAT('%', en, '%')
    ORDER BY id DESC LIMIT li OFFSET o;



CREATE TRIGGER IF NOT EXISTS log_vehicles_insert AFTER INSERT ON vehicles
FOR EACH ROW
BEGIN
    INSERT INTO log_vehicles (SELECT v.*, 'insert', NULL, NOW() FROM vehicles AS v WHERE v.id = NEW.id);
END;


CREATE TRIGGER IF NOT EXISTS log_vehicles_update AFTER UPDATE ON vehicles
FOR EACH ROW
BEGIN
    INSERT INTO log_vehicles (SELECT v.*, 'update', NULL, NOW() FROM vehicles AS v WHERE v.id = NEW.id);
END;


CREATE TRIGGER IF NOT EXISTS log_vehicles_delete AFTER DELETE ON vehicles
FOR EACH ROW
BEGIN
    INSERT INTO log_vehicles (SELECT v.*, 'delete', NULL, NOW() FROM vehicles AS v WHERE v.id = OLD.id);
END;
