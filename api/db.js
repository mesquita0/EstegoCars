const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "p3"
});

async function setup_db() {
  console.log("Successfully connected to MySQL.");

  try {
    // Create tables if they do not exist

    await pool.promise().query(
      ` CREATE TABLE IF NOT EXISTS users (
          id int NOT NULL AUTO_INCREMENT,
          cpf int NOT NULL,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(128) NOT NULL,

          PRIMARY KEY (id)
        ) ENGINE=INNODB;
      `
    );

    await pool.promise().query(
      ` CREATE TABLE IF NOT EXISTS cars (
          id int NOT NULL AUTO_INCREMENT,
          brand VARCHAR(255) NOT NULL,
          model VARCHAR(255) NOT NULL,
          year int NOT NULL,
          image_url VARCHAR(2048),

          PRIMARY KEY (id)
        ) ENGINE=INNODB;
      `
    );

    await pool.promise().query(
      ` CREATE TABLE IF NOT EXISTS cars_items (
          car_id int NOT NULL,
          name VARCHAR(255) NOT NULL,
          FOREIGN KEY (car_id)
            REFERENCES cars(id)
            ON DELETE CASCADE
        ) ENGINE=INNODB;
      `
    );

    await pool.promise().query(
      ` CREATE TABLE IF NOT EXISTS users_cars (
          user_id int NOT NULL,
          car_id int NOT NULL,
          price int NOT NULL,

          FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,
          FOREIGN KEY (car_id)
            REFERENCES cars(id)
            ON DELETE CASCADE
        ) ENGINE=INNODB;
      `
    );
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
}

class Users {
  static async add(cpf, name, password) {
    const query = "INSERT INTO users (cpf, name, password) VALUES (?, ?, ?)";
    const result = await pool.promise().query(query, [cpf, name, password]);
  
    return result[0].insertId;
  }

  static async get(cpf) {
    const query = "SELECT * FROM users WHERE cpf = (?)";
  
    return (await pool.promise().query(query, [cpf]))[0][0];
  }
}

class Cars {
  static async is_in_database(brand, model, year, except_id = -1) {
    const query = "SELECT * FROM cars WHERE brand = (?) AND model = (?) AND year = (?) AND id != (?)";
    const data = (await pool.promise().query(query, [brand, model, year, except_id]))[0];
  
    return (data.length > 0);
  }
  
  static async get(id) {
    const query = "SELECT * FROM cars WHERE id = (?)";
  
    return (await pool.promise().query(query, [id]))[0][0];
  }
  
  static async get_items(id) {
    const query = "SELECT name FROM cars_items WHERE car_id = (?)";
    let items = (await pool.promise().query(query, [id]))[0];
    items = items.map((item) => item.name);
  
    return items;
  }
  
  static async add(brand, model, year) {
    const query = "INSERT INTO cars (brand, model, year) VALUES (?, ?, ?)";
    const result = await pool.promise().query(query, [brand, model, year]);
  
    return result[0].insertId;
  }
  
  static async add_items(id_car, items) {
    const unique_items = [...new Set(items)];
  
    let query = "INSERT INTO cars_items (car_id, name) VALUES (?, ?)";
    let data = [id_car, unique_items[0]];
  
    for (let i = 1; i < unique_items.length; i++) {
      query += ", (?, ?)";
      data.push(id_car, unique_items[i]);
    }
  
    await pool.promise().query(query, data);
  }
  
  static async delete(id) {
    const query = "DELETE FROM cars WHERE id = (?)";
    await pool.promise().query(query, [id]);
  }
  
  static async delete_items(id) {
    const query = "DELETE FROM cars_items WHERE car_id = (?)";
    await pool.promise().query(query, [id]);
  }
}

module.exports = {pool, setup_db, Users, Cars};
