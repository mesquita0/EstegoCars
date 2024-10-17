import express, { Request, Response } from "express";
import { User, Users } from "./db";
import { isAuthenticated } from "./AuthController";

const router = express.Router();

router.get('/info', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const user_id: number = req.body.user_id;

    const result = await Users.get(user_id);
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

    const result = await Users.get(id);
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

export default router;
