import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import isAuthenticated from "../middleware/IsAuthenticated";

const router = express.Router();

router.get('/:name', (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO
    res.sendFile(path.join(__dirname, "..", "../images/", req.params.name));
  }
  catch(err) {
    next(err);
  }
});

router.post('/', isAuthenticated,
  bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }), 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO
      fs.writeFileSync(path.join("./images/", "1234.jpg"), req.body);
      res.sendStatus(200);
    }
    catch(err) {
      next(err);
    }
  }
);

export default router;
