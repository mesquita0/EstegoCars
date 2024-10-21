import { Request, Response, NextFunction } from "express";
import { checkAuth, decodeAuth } from "../services/authService";

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (token === undefined || !checkAuth(token)) {
    res.sendStatus(401);
    return;
  }

  req.body.user_id = decodeAuth(token).id;
  next();
}

export default isAuthenticated;
