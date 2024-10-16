import mysql, { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

const pool: Pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "p3"
});

async function setup_db(): Promise<void> {
  try {
    // Create tables if they do not exist

    await pool.query(
      ` CREATE TABLE IF NOT EXISTS users (
          id int NOT NULL AUTO_INCREMENT,
          cpf VARCHAR(12) NOT NULL,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(128) NOT NULL,
          phone_number VARCHAR(15) NOT NULL,

          PRIMARY KEY (id)
        ) ENGINE=INNODB;
      `
    );
    // TODO: add price, type, ...
    await pool.query(
      ` CREATE TABLE IF NOT EXISTS cars (
          id int NOT NULL AUTO_INCREMENT,
          seller_id int NOT NULL,
          brand VARCHAR(255) NOT NULL,
          model VARCHAR(255) NOT NULL,
          year int NOT NULL,

          PRIMARY KEY (id),
          FOREIGN KEY (seller_id)
            REFERENCES users(id)
            ON DELETE CASCADE
        ) ENGINE=INNODB;
      `
    );

    await pool.query(
      ` CREATE TABLE IF NOT EXISTS items (
          id int NOT NULL AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL,
          
          PRIMARY KEY (id)
        ) ENGINE=INNODB;
      `
    );

    await pool.query(
      ` CREATE TABLE IF NOT EXISTS cars_images (
        car_id int NOT NULL,
        image_url VARCHAR(2048) NOT NULL,

        FOREIGN KEY (car_id)
          REFERENCES cars(id)
          ON DELETE CASCADE
        ) ENGINE=INNODB;
      `
    );

    await pool.query(
      ` CREATE TABLE IF NOT EXISTS cars_items (
          car_id int NOT NULL,
          item_id int NOT NULL,

          FOREIGN KEY (item_id)
            REFERENCES items(id)
            ON DELETE CASCADE,
          FOREIGN KEY (car_id)
            REFERENCES cars(id)
            ON DELETE CASCADE
        ) ENGINE=INNODB;
      `
    );

    console.log("Successfully connected to MySQL.");
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
}

class User {
  public id: number;
  public cpf: string;
  public name: string;
  public email: string;
  public password: string;
  public phone_number: string;

  constructor(data: RowDataPacket) {
    this.id = data["id"];
    this.cpf = data["cpf"];
    this.name = data["name"];
    this.email = data["email"];
    this.password = data["password"];
    this.phone_number = data["phone_number"];
  }
}

class Car {
  public id: number;
  public brand: string;
  public model: string;
  public year: number;

  constructor(data: RowDataPacket) {
    this.id = data["id"];
    this.brand = data["brand"];
    this.model = data["model"];
    this.year = data["year"];
  }
}

class Items {
  static async exists(id: number): Promise<boolean> {
    const query = "SELECT * FROM items WHERE id = (?)";
    const result = (await pool.query<RowDataPacket[]>(query, [id]))[0];
  
    return (result.length > 0);
  }

  // TODO: get ids and name of items to send to frontend
  //static async get()
}

class Users {
  static async add(
    cpf: string,
    name: string,
    email: string,
    password: string,
    phone_number: string
  ): Promise<number> {
    const query = "INSERT INTO users (cpf, name, email, password, phone_number) VALUES (?, ?, ?, ?, ?)";
    const result = (await pool.query<ResultSetHeader>(query, [cpf, name, email, password, phone_number]))[0];
  
    return result.insertId;
  }

  static async get(cpf: string): Promise<User | undefined> {
    const query = "SELECT * FROM users WHERE cpf = (?)";
    const result = (await pool.query<RowDataPacket[]>(query, [cpf]))[0];

    if (result.length === 0) return undefined;
    return new User(result[0]);
  }
}

class Cars {
  static async is_in_database(
    brand: string, 
    model: string, 
    year: number, 
    except_id: number = -1
  ): Promise<boolean> {
    const query = "SELECT * FROM cars WHERE brand = (?) AND model = (?) AND year = (?) AND id != (?)";
    const data = (await pool.query<RowDataPacket[]>(query, [brand, model, year, except_id]))[0];
  
    return (data.length > 0);
  }
  
  static async get(id: number): Promise<Car | undefined> {
    const query = "SELECT * FROM cars WHERE id = (?)";
    const result = (await pool.query<RowDataPacket[]>(query, [id]))[0];

    if (result.length === 0) return undefined;
    return new Car(result[0]);
  }
  
  static async get_items(car_id: number): Promise<string[]> {
    const query = "SELECT name FROM items WHERE id IN (SELECT item_id FROM cars_items WHERE car_id = (?))";
    let items = (await pool.query<RowDataPacket[]>(query, [car_id]))[0];
  
    return items.map((item: RowDataPacket) => item["name"]);
  }
  
  static async add(
    seller_id: number, 
    brand: string, 
    model: string, 
    year: number
  ): Promise<number> {
    const query = "INSERT INTO cars (seller_id, brand, model, year) VALUES (?, ?, ?, ?)";
    const result = (await pool.query<ResultSetHeader>(query, [seller_id, brand, model, year]))[0];
  
    return result.insertId;
  }
  
  static async add_items(car_id: number, items_ids:number[]): Promise<void> {
    const unique_items: number[] = [...new Set(items_ids)].filter((item_id: number) => Items.exists(item_id));
    if (unique_items.length === 0) return;
  
    let query = "INSERT INTO cars_items (car_id, item_id) VALUES (?, ?)";
    let data = [car_id, unique_items[0]];
  
    for (let i = 1; i < unique_items.length; i++) {
      query += ", (?, ?)";
      data.push(car_id, unique_items[i]);
    }
  
    await pool.query(query, data);
  }
  
  static async delete(id: number): Promise<void> {
    const query = "DELETE FROM cars WHERE id = (?)";
    await pool.query(query, [id]);
  }
  
  static async delete_items(id: number): Promise<void> {
    const query = "DELETE FROM cars_items WHERE car_id = (?)";
    await pool.query(query, [id]);
  }
}

export { pool, setup_db, User, Users, Car, Cars };
