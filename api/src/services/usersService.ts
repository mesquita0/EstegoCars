import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { pool } from "../database/db_connection";
import User from "../models/User";
import Vehicle from "../models/Vehicle";

async function get_by(field_name: string, field: any): Promise<User | undefined> {
  const query = "SELECT * FROM users WHERE (??) = (?)";
  const result = (await pool.query<RowDataPacket[]>(query, [field_name, field]))[0];
  
  if (result.length === 0) return undefined;
  return new User(result[0]);
}

export default class Users {
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

  static async getById(id: number): Promise<User | undefined> {
    return get_by("id", id);
  }

  static async getByCPF(cpf: string): Promise<User | undefined> {
    return get_by("cpf", cpf);
  }

  static async getByEmail(email: string): Promise<User | undefined> {
    return get_by("email", email);
  }

  static async getByPhoneNumber(phone_number: string): Promise<User | undefined> {
    return get_by("phone_number", phone_number);
  }

  static async get_vehicles(user_id: number): Promise<Vehicle[]> {
    const query = "SELECT * FROM vehicles WHERE seller_id = (?)";
    const result = (await pool.query<RowDataPacket[]>(query, [user_id]))[0];

    return result.map((vehicle) => new Vehicle(vehicle));
  }

  static async update(
    user: User,
    id: number = user.id,
    cpf: string = user.cpf,
    name: string = user.name,
    email: string = user.email,
    password: string = user.password,
    phone_number: string = user.phone_number
  ): Promise<void> {
    const query = `
      UPDATE users SET
        cpf = (?), 
        name = (?),
        email = (?),
        password = (?),
        phone_number = (?)
      WHERE id = (?)
    `;

    const data = [id, cpf, name, email, password, phone_number];
    await pool.query(query, data);
  }

  static async delete(id: number): Promise<void> {
    const query = "DELETE FROM users WHERE id = (?)";
    await pool.query(query, [id]);
  }
}
