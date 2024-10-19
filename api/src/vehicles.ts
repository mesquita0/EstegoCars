import express, { Request, Response } from "express";
import { Vehicle, Vehicles } from './db';
import { isAuthenticated } from "./AuthController";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const vehicle = new Vehicle(req.query);
    const { brand, model, year, price, mileage, engine } = vehicle;
    
    let limit = Number(req.query.limit);
    if (limit < 1 || isNaN(limit)) limit = 5;
    if (limit > 10) limit = 10;
    
    let page = Number(req.query.page);
    if (page < 1 || isNaN(page)) page = 1;

    const count = await Vehicles.count(brand, model, year, price, mileage, engine);
    const pages = Math.ceil(count/limit);
    if (count === 0) {
      res.status(204).json();
      return;
    }

    const vehicles = await Vehicles.list(
      brand, model, year, price, mileage, engine, limit, (page - 1) * limit
    );
    
    const result = await Promise.all(vehicles.map(async (vehicle) => {
      const { seller_id, ...vehicle_info } = vehicle;
      return {
        ...vehicle_info,
        images: await Vehicles.get_images(vehicle.id)
      };
    }));
  
    res.json({ 
      count,
      pages,
      data: result
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({"error": "internal server error"});
  }
});

router.post('/', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const user_id: number = req.body.user_id;
    const { brand, model, year, price, type, mileage, transmission, fuel_type, engine } = new Vehicle(req.body);
    const items: number[] | undefined = req.body.items;
    const images: string[] | undefined = req.body.images;

    // Check that all required items are present in the request
    const vehicle_info = [brand, model, year, price, type, mileage, transmission, fuel_type, engine];
    for (const info of vehicle_info) {
      if (!info) {
        res.status(400).json({error: "missing information"});
        return;
      } 
    }

    if (year < 1886 || year > 2025) {
      res.status(400).json({error: "year should be between 1886 and 2025"});
      return;
    }

    const id = await Vehicles.add(
      user_id, brand, model, year, price, type, mileage, transmission, fuel_type, engine
    );

    if (items !== undefined) Vehicles.add_items(id, items);
    if (images !== undefined) Vehicles.add_images(id, images);

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
  
    const vehicle = await Vehicles.get(id);
    if (vehicle === undefined) {
      res.status(404).json({error: "vehicle not found"});
      return;
    }
  
    const items = await Vehicles.get_items(vehicle.id);
    const images = await Vehicles.get_images(vehicle.id);
  
    res.json({
      ...vehicle,
      items,
      images
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({"error": "internal server error"});
  }
});

router.patch('/:id', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const user_id: number = req.body.user_id;
    const id = Number(req.params.id);
    const { brand, model, year, price, type, mileage, transmission, fuel_type, engine } = new Vehicle(req.body);
    const items: number[] | undefined = req.body.items;
    const images: string[] | undefined = req.body.images;
  
    if (year < 1886 || year > 2025) {
      res.status(400).json({error: "year should be between 1886 and 2025"});
      return;
    }
  
    const vehicle = await Vehicles.get(id);
    if (vehicle === undefined || vehicle.seller_id !== user_id) {
      res.status(404).json({error: "vehicle not found"});
      return;
    }
    
    await Vehicles.update(
      vehicle, vehicle.id, brand, model, year, price, type, mileage, transmission, fuel_type, engine
    );
  
    // Update items table
    if (items !== undefined && items.length > 0) {
      await Vehicles.delete_items(id);
      await Vehicles.add_items(id, items);
    }

    // Update images table
    if (images !== undefined && images.length > 0) {
      await Vehicles.delete_images(id);
      await Vehicles.add_images(id, images);
    }
  
    res.status(204).json();
  }
  catch (error) {
    console.log(error);
    res.status(500).json({"error": "internal server error"});
  }
});

router.delete('/:id', isAuthenticated, async (req: Request, res: Response) => { 
  try {
    const user_id: number = req.body.user_id;
    const id = Number(req.params.id);
  
    const vehicle = await Vehicles.get(id);
    if (vehicle === undefined || vehicle.seller_id !== user_id) {
      res.status(404).json({error: "vehicle not found"});
      return;
    }
  
    await Vehicles.delete(id);
  
    res.status(204).json();
  }
  catch (error) {
    console.log(error);
    res.status(500).json({"error": "internal server error"});
  }
});

export default router;
