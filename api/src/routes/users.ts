import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import Users from "../services/usersService";
import isAuthenticated from "../middleware/IsAuthenticated";
import { generateToken } from "../services/authService";

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await Users.getByEmail(email);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(409).json({error: "Email ou Senha invalida."});
    return;
  }

  // TODO: redirect to inicial page
  const token = generateToken(user.id);
  res.status(200).send({ token });
});

router.post('/register', async (req: Request, res: Response) => {
  const { cpf, name, email, password, phone_number } = req.body;

  if (await Users.getByCPF(cpf)) {
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

  const id = await Users.add(cpf, name, email, hash, phone_number);

  // TODO: redirect to inicial page
  const token = generateToken(id);
  res.status(200).send({ token });
});

router.get('/info', isAuthenticated, async (req: Request, res: Response) => {
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
  catch (error) {
    console.log(error);
    res.status(500).json({"error": "internal server error"});
  }
});

router.get('/:id', async (req: Request, res: Response) => {
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
  catch (error) {
    console.log(error);
    res.status(500).json({"error": "internal server error"});
  }
});

router.patch('/', isAuthenticated, async (req: Request, res: Response) => {
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
});

router.delete('/', isAuthenticated, async (req: Request, res: Response) => {
  const user_id: number = req.body.user_id;

  const user = await Users.getById(user_id);
  if (user === undefined) {
    res.status(404).json({error: "user not found"});
    return;
  }

  await Users.delete(user_id);

  res.status(204).json();
});

export default router;
