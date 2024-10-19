import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { pool } from "../database/db_connection";
import Vehicle from "../models/Vehicle";

const MAX_PRICE = 1000000000;
const MAX_MILEAGE = 2147483647;

export class Items {
  static async exists(id: number): Promise<boolean> {
    const query = "SELECT * FROM items WHERE id = (?)";
    const result = (await pool.query<RowDataPacket[]>(query, [id]))[0];
  
    return (result.length > 0);
  }

  static async get(): Promise<[number, string][]> {
    const query = "SELECT * FROM items";
    const result_query = (await pool.query<RowDataPacket[]>(query))[0];

    return result_query.map((item) => [item["id"], item["name"]]);
  }
}

export default class Vehicles {
  static async count(
    brand: string | undefined,
    model: string | undefined,
    year: number | undefined,
    price: number | undefined,
    mileage: number | undefined,
    engine: string | undefined
  ) : Promise<number> {

    const query = "CALL countVehicles(?, ?, ?, ?, ?, ?)";
    
    if (!year) year = 0;
    if (!price) price = MAX_PRICE;
    if (!mileage) mileage = MAX_MILEAGE;

    const attributes = [brand, model, year, price, mileage, engine];
    const data: (string | number)[] = attributes.map((d) => ((d === undefined) ? "" : d)); 

    const result = (await pool.query<RowDataPacket[]>(query, data))[0];
    
    return result[0][0].count;
  }
  
  static async list(
    brand: string | undefined,
    model: string | undefined,
    year: number | undefined,
    price: number | undefined,
    mileage: number | undefined,
    engine: string | undefined,
    limit: number,
    offset: number
  ): Promise<Vehicle[]> {
    const query = "CALL getVehicles(?, ?, ?, ?, ?, ?, ?, ?)";
    
    if (!year) year = 0;
    if (!price) price = MAX_PRICE;
    if (!mileage) mileage = MAX_MILEAGE;
    
    const attributes = [brand, model, year, price, mileage, engine, limit, offset];
    const data: (string | number)[] = attributes.map((d) => ((d === undefined) ? "" : d)); 
    
    const result = (await pool.query<RowDataPacket[]>(query, data))[0];

    return result[0].map((vehicle: object) => new Vehicle(vehicle));
  }

  static async get(id: number): Promise<Vehicle | undefined> {
    const query = "SELECT * FROM vehicles WHERE id = (?)";
    const result = (await pool.query<RowDataPacket[]>(query, [id]))[0];

    if (result.length === 0) return undefined;
    return new Vehicle(result[0]);
  }
  
  static async get_items(vehicle_id: number): Promise<string[]> {
    const query = "SELECT name FROM items WHERE id IN (SELECT item_id FROM vehicles_items WHERE vehicle_id = (?))";
    let items = (await pool.query<RowDataPacket[]>(query, [vehicle_id]))[0];
  
    return items.map((item: RowDataPacket) => item["name"]);
  }

  static async get_images(vehicle_id: number): Promise<string[]> {
    const query = "SELECT image_url FROM vehicles_images WHERE vehicle_id = (?)";
    let images = (await pool.query<RowDataPacket[]>(query, [vehicle_id]))[0];
  
    return images.map((image: RowDataPacket) => image["image_url"]);
  }
  
  static async add(
    seller_id: number, 
    brand: string, 
    model: string, 
    year: number,
    price: number,
    type: string,
    mileage: number,
    transmission: string, 
    fuel_type: string,
    engine: string 
  ): Promise<number> {
    const query = `
    INSERT INTO vehicles 
    (seller_id, brand, model, year, price, type, mileage, transmission, fuel_type, engine) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const data = [seller_id, brand, model, year, price, type, mileage, transmission, fuel_type, engine];
    const result = (await pool.query<ResultSetHeader>(query, data))[0];
  
    return result.insertId;
  }
  
  static async add_items(vehicle_id: number, items_ids:number[]): Promise<void> {
    const unique_items: number[] = [...new Set(items_ids)].filter((item_id: number) => Items.exists(item_id));
    if (unique_items.length === 0) return;
  
    let query = "INSERT INTO vehicles_items (vehicle_id, item_id) VALUES (?, ?)";
    let data = [vehicle_id, unique_items[0]];
  
    for (let i = 1; i < unique_items.length; i++) {
      query += ", (?, ?)";
      data.push(vehicle_id, unique_items[i]);
    }
  
    await pool.query(query, data);
  }

  static async add_images(vehicle_id: number, images_url: string[]): Promise<void> {
    const unique_images: string[] = [...new Set(images_url)];
    if (unique_images.length === 0) return;
  
    let query = "INSERT INTO vehicles_images (vehicle_id, image_url) VALUES (?, ?)";
    let data = [vehicle_id, unique_images[0]];
  
    for (let i = 1; i < unique_images.length; i++) {
      query += ", (?, ?)";
      data.push(vehicle_id, unique_images[i]);
    }
  
    await pool.query(query, data);
  }
  
  static async update(
    vehicle: Vehicle,
    id: number = vehicle.id,
    brand: string = vehicle.brand,
    model: string = vehicle.model,
    year: number = vehicle.year,
    price: number = vehicle.price,
    type: string = vehicle.type,
    mileage: number = vehicle.mileage,
    transmission: string = vehicle.transmission,
    fuel_type: string = vehicle.fuel_type,
    engine: string = vehicle.engine 
  ): Promise<void> {
    const query = `
      UPDATE vehicles SET 
        brand = (?), 
        model = (?), 
        year = (?),
        price = (?),
        type = (?),
        mileage = (?),
        transmission = (?),
        fuel_type = (?),
        engine = (?)
      WHERE id = (?)
    `;

    if (!year) year = vehicle.year;
    if (!price) price = vehicle.price;
    if (!mileage) mileage = vehicle.mileage;

    const data = [brand, model, year, price, type, mileage, transmission, fuel_type, engine, id];
    await pool.query(query, data);
  }

  static async delete(id: number): Promise<void> {
    const query = "DELETE FROM vehicles WHERE id = (?)";
    await pool.query(query, [id]);
  }
  
  static async delete_items(id: number): Promise<void> {
    const query = "DELETE FROM vehicles_items WHERE vehicle_id = (?)";
    await pool.query(query, [id]);
  }

  static async delete_images(id: number): Promise<void> {
    const query = "DELETE FROM vehicles_images WHERE vehicle_id = (?)";
    await pool.query(query, [id]);
  }
}
