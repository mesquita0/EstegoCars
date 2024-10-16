import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Users } from "./db";

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const { cpf, password } = req.body;

  const user = await Users.get(cpf);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(409).json({error: "CPF ou Senha invalida."});
    return;
  }

  // TODO: save session and redirect to inicial page
});

router.post('/register', async (req: Request, res: Response) => {
  const { cpf, name, email, password, phone_number } = req.body;

  if (await Users.get(cpf)) {
    res.status(409).json({error: "there is already a user with this cpf"});
    return;
  }

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const id = await Users.add(cpf, name, email, hash, phone_number);

  // TODO: save session and redirect to inicial page
});

export default router;
