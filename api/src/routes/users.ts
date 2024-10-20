import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import Users from "../services/usersService";
import Vehicles from "../services/vehiclesService";
import isAuthenticated from "../middleware/IsAuthenticated";
import { generateToken } from "../services/authService";

const router = express.Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({error: "missing information"});
      return;
    } 

    const user = await Users.getByEmail(email);
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(409).json({error: "Email ou Senha invalida."});
      return;
    }

    const token = generateToken(user.id);
    res.status(200).send({ token });
  }
  catch(err) {
    next(err);
  }
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { CPF, name, email, password, phone_number } = req.body;

    const data = [CPF, name, email, password, phone_number];
    for (const info of data) {
      if (!info) {
        res.status(400).json({error: "missing information"});
        return;
      } 
    }

    if (await Users.getByCPF(CPF)) {
      res.status(409).json({error: "Esse CPF já está em uso."});
      return;
    }

    if (await Users.getByEmail(email)) {
      res.status(409).json({error: "Esse email já está em uso."});
      return;
    }

    if (await Users.getByPhoneNumber(phone_number)) {
      res.status(409).json({error: "Esse número de telefone já está em uso."});
      return;
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const id = await Users.add(CPF, name, email, hash, phone_number);

    const token = generateToken(id);
    res.status(200).send({ token });
  }
  catch(err) {
    next(err);
  }
});

router.get('/info', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id: number = req.body.user_id;

    const result = await Users.getById(user_id);
    if (result === undefined) {
      res.status(404).json({error: "user not found"});
      return;
    }
    const user = result as User;

    res.json({ 
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      phone_number: user.phone_number
    });
  }
  catch (err) {
    next(err);
  }
});

router.get('/vehicles', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id: number = req.body.user_id;
    const vehicles = await Users.get_vehicles(user_id);

    const user_vehicles = await Promise.all(vehicles.map(async (vehicle) => {
      const { seller_id, ...vehicle_info } = vehicle;
      return {
        ...vehicle_info,
        images: await Vehicles.get_images(vehicle.id)
      };
    }));

    res.json({ 
      vehicles: user_vehicles
    });
  }
  catch (err) {
    next(err);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const result = await Users.getById(id);
    if (result === undefined) {
      res.status(404).json({error: "user not found"});
      return;
    }
    const user = result as User;

    res.json({ 
      name: user.name,
      phone_number: user.phone_number
    });
  }
  catch(err) {
    next(err);
  }
});

router.patch('/', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id: number = req.body.user_id;
    const { cpf, name, email, password, phone_number } = new User(req.body);

    const user = await Users.getById(user_id);
    if (user === undefined) {
      res.status(404).json({error: "user not found"});
      return;
    }

    await Users.update(
      user, user_id, cpf, name, email, password, phone_number
    );
    
    res.status(204).json();
  }
  catch(err) {
    next(err);
  }
});

router.delete('/', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id: number = req.body.user_id;

    const user = await Users.getById(user_id);
    if (user === undefined) {
      res.status(404).json({error: "user not found"});
      return;
    }

    await Users.delete(user_id);

    res.status(204).json();
  }
  catch(err) {
    next(err);
  }
});

export default router;
