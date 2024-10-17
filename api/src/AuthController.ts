import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Users } from "./db";

const router = express.Router();
const private_key = "dasuhfga"; // TODO: change private key

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization!;
    const decode = jwt.verify(token, private_key) as JwtPayload;
    req.body.user_id = decode.id;
    next();
  }
  catch (error) {
    res.sendStatus(401); // TODO: redirect to login
  }
}

router.post('/login', async (req: Request, res: Response) => {
  const { cpf, password } = req.body;

  const user = await Users.get(cpf);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(409).json({error: "CPF ou Senha invalida."});
    return;
  }

  // TODO: redirect to inicial page
  const token = jwt.sign({ id: user.id }, private_key);
  res.status(200).send({ token });
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

  // TODO: redirect to inicial page
  const token = jwt.sign({ id }, private_key);
  res.status(200).send({ token });
});

export { isAuthenticated };
export default router;
