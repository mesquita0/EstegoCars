"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cars = exports.Car = exports.Users = exports.User = exports.pool = void 0;
exports.setup_db = setup_db;
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "p3"
});
exports.pool = pool;
function setup_db() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create tables if they do not exist
            yield pool.query(` CREATE TABLE IF NOT EXISTS users (
          id int NOT NULL AUTO_INCREMENT,
          cpf VARCHAR(12) NOT NULL,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(128) NOT NULL,
          phone_number VARCHAR(15) NOT NULL,

          PRIMARY KEY (id)
        ) ENGINE=INNODB;
      `);
            // TODO: add price, type, ...
            yield pool.query(` CREATE TABLE IF NOT EXISTS cars (
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
      `);
            yield pool.query(` CREATE TABLE IF NOT EXISTS items (
          id int NOT NULL AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL,
          
          PRIMARY KEY (id)
        ) ENGINE=INNODB;
      `);
            yield pool.query(` CREATE TABLE IF NOT EXISTS cars_items (
          car_id int NOT NULL,
          item_id int NOT NULL,

          FOREIGN KEY (item_id)
            REFERENCES items(id)
            ON DELETE CASCADE,
          FOREIGN KEY (car_id)
            REFERENCES cars(id)
            ON DELETE CASCADE
        ) ENGINE=INNODB;
      `);
            yield pool.query(` CREATE TABLE IF NOT EXISTS cars_images (
        car_id int NOT NULL,
        image_url VARCHAR(2048) NOT NULL,

        FOREIGN KEY (car_id)
          REFERENCES cars(id)
          ON DELETE CASCADE
        ) ENGINE=INNODB;
      `);
            console.log("Successfully connected to MySQL.");
        }
        catch (err) {
            console.log(err);
            process.exit(1);
        }
    });
}
class User {
    constructor(data) {
        this.id = data["id"];
        this.cpf = data["cpf"];
        this.name = data["name"];
        this.email = data["email"];
        this.password = data["password"];
        this.phone_number = data["phone_number"];
    }
}
exports.User = User;
class Car {
    constructor(data) {
        this.id = data["id"];
        this.brand = data["brand"];
        this.model = data["model"];
        this.year = data["year"];
    }
}
exports.Car = Car;
class Items {
    static exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM items WHERE id = (?)";
            const result = (yield pool.query(query, [id]))[0];
            return (result.length > 0);
        });
    }
}
class Users {
    static add(cpf, name, email, password, phone_number) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO users (cpf, name, email, password, phone_number) VALUES (?, ?, ?, ?, ?)";
            const result = (yield pool.query(query, [cpf, name, email, password, phone_number]))[0];
            return result.insertId;
        });
    }
    static get(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM users WHERE cpf = (?)";
            const result = (yield pool.query(query, [cpf]))[0];
            if (result.length === 0)
                return undefined;
            return new User(result[0]);
        });
    }
}
exports.Users = Users;
class Cars {
    static is_in_database(brand_1, model_1, year_1) {
        return __awaiter(this, arguments, void 0, function* (brand, model, year, except_id = -1) {
            const query = "SELECT * FROM cars WHERE brand = (?) AND model = (?) AND year = (?) AND id != (?)";
            const data = (yield pool.query(query, [brand, model, year, except_id]))[0];
            return (data.length > 0);
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM cars WHERE id = (?)";
            const result = (yield pool.query(query, [id]))[0];
            if (result.length === 0)
                return undefined;
            return new Car(result[0]);
        });
    }
    static get_items(car_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT name FROM items WHERE id IN (SELECT item_id FROM cars_items WHERE car_id = (?))";
            let items = (yield pool.query(query, [car_id]))[0];
            return items.map((item) => item["name"]);
        });
    }
    static add(seller_id, brand, model, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO cars (seller_id, brand, model, year) VALUES (?, ?, ?, ?)";
            const result = (yield pool.query(query, [seller_id, brand, model, year]))[0];
            return result.insertId;
        });
    }
    static add_items(car_id, items_ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const unique_items = [...new Set(items_ids)].filter((item_id) => Items.exists(item_id));
            if (unique_items.length === 0)
                return;
            let query = "INSERT INTO cars_items (car_id, item_id) VALUES (?, ?)";
            let data = [car_id, unique_items[0]];
            for (let i = 1; i < unique_items.length; i++) {
                query += ", (?, ?)";
                data.push(car_id, unique_items[i]);
            }
            yield pool.query(query, data);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM cars WHERE id = (?)";
            yield pool.query(query, [id]);
        });
    }
    static delete_items(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM cars_items WHERE car_id = (?)";
            yield pool.query(query, [id]);
        });
    }
}
exports.Cars = Cars;
