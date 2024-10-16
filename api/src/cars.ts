import express, { Request, Response } from "express";
import { pool, Cars } from './db';
import { RowDataPacket } from "mysql2";
import { isAuthenticated } from "./AuthController";

const cars = express.Router();
const router = express.Router();

cars.use('/cars', router);

router.get('/', async (req: Request, res: Response) => {
  try {
    let { brand, model, year } = req.query;

    let limit = Number(req.query.limit);
    if (limit < 1 || isNaN(limit)) limit = 5;
    if (limit > 10) limit = 10;
    
    let page = Number(req.query.page);
    if (page < 1 || isNaN(page)) page = 1;
  
    // Query for getting how many cars are in the db according to request
    let query_select = "SELECT COUNT(*) AS count FROM cars WHERE id > 0 ";
    let data_select = [];
  
    // Add to query only params that are not undefined
    if (brand !== undefined) {
      query_select += "AND brand LIKE (?) ";
      data_select.push("%" + brand + "%");
    }
    if (model !== undefined) {
      query_select += "AND model LIKE (?) ";
      data_select.push("%" + model + "%");
    }
    if (year !== undefined) {
      query_select += "AND year >= (?) ";
      data_select.push(year);
    }
  
    const count: number = (await pool.query<RowDataPacket[]>(query_select, data_select))[0][0].count;
    const pages = Math.ceil(count/limit);
    if (count === 0) {
      res.status(204).json();
      return;
    }
  
    // Change query to return first (limit) cars with offset according to page requested
    query_select = query_select.replace("SELECT COUNT(*) AS count", "SELECT *");
    query_select += "LIMIT ? OFFSET ?";
    data_select.push(limit, (page - 1) * limit);
  
    const data = (await pool.query<RowDataPacket[]>(query_select, data_select))[0];
  
    const data_with_items = await Promise.all(data.map(async (car) => {
      return {...car, items: await Cars.get_items(car.id)};
    }));
  
    res.json({ 
      count,
      pages,
      data: data_with_items
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({"error": "internal server error"});
  }
});

router.post('/', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const { user_id, brand, model, year, items } = req.body;

    // Check that all required items are present in the request
    if (!brand) {
      res.status(400).json({error: "brand is required"});
      return;
    }
    if (!model) {
      res.status(400).json({error: "model is required"});
      return;
    }
    if (!year) {
      res.status(400).json({error: "year is required"});
      return;
    }
    if (!items) {
      res.status(400).json({error: "items are required"});
      return;
    }

    if (year < 1886 || year > 2025) {
      res.status(400).json({error: "year should be between 1886 and 2025"});
      return;
    }

    if (await Cars.is_in_database(brand, model, year)) {
      res.status(409).json({error: "there is already a car with this data"});
      return;
    }

    const id = await Cars.add(user_id, brand, model, year);

    // Register car's items in the database
    Cars.add_items(id, items);

    res.status(201).json({ id });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({"error": "internal server error"});
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
  
    const car = await Cars.get(id);
    if (car === undefined) {
      res.status(404).json({error: "car not found"});
      return;
    }
  
    const items = await Cars.get_items(car.id);
  
    res.json({
      ...car,
      items
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({"error": "internal server error"});
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    let { brand, model, year, items } = req.body;
  
    if (year < 1886 || year > 2025) {
      res.status(400).json({error: "year should be between 1886 and 2025"});
      return;
    }
  
    const car = await Cars.get(id);
    if (car === undefined) {
      res.status(404).json({error: "car not found"});
      return;
    }
  
    // Filter undefined fields
    if (!brand) brand = car.brand;
    if (!model) model = car.model;
    if (!year) year = car.year;
    
    if (await Cars.is_in_database(brand, model, year, id)) {
      res.status(409).json({error: "there is alredy a car with this data"});
      return;
    }
  
    // Update cars table
    const query = "UPDATE cars SET brand = (?), model = (?), year = (?) WHERE id = (?)";
    await pool.query(query, [brand, model, year, id]);
  
    // Update items table
    if (items !== undefined && items.length > 0) {
  
      // Remove previous items
      await Cars.delete_items(id);
  
      // Add new items
      Cars.add_items(id, items);
    }
  
    res.status(204).json();
  }
  catch (error) {
    console.log(error);
    res.status(500).json({"error": "internal server error"});
  }
});

router.delete('/:id', async (req: Request, res: Response) => { 
  try {
    const id = Number(req.params.id);
  
    const car = await Cars.get(id);
    if (car === undefined) {
      res.status(404).json({error: "car not found"});
      return;
    }
  
    await Cars.delete(id);
  
    res.status(204).json();
  }
  catch (error) {
    console.log(error);
    res.status(500).json({"error": "internal server error"});
  }
});

export default cars;
