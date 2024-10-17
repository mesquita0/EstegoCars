import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { isAuthenticated } from "./AuthController";

const router = express.Router();

router.get('/:name', (req: Request, res: Response) => {
  // TODO
  res.sendFile(path.join(__dirname, "../images/", req.params.name));
});

router.post('/', isAuthenticated,
  bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }), 
  (req: Request, res: Response) => {
    // TODO
    fs.writeFileSync(path.join("./images/", "1234.jpg"), req.body);
    res.sendStatus(200);
  }
);

export default router;
