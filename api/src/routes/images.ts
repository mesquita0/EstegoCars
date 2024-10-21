import express, { Request, Response, NextFunction } from "express";
import path from "path";
import isAuthenticated from "../middleware/IsAuthenticated";
import multer from "multer";
import crypto from "crypto";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './images/')
  },
  filename: (req, file, cb) => {
      const file_extension = file.originalname.split('.').slice(-1)[0];

      const file_name = crypto.randomBytes(64).toString('hex');

      cb(null, `${file_name}.${file_extension}`)
  }
});

const upload = multer({ storage, limits: { fieldSize: 1024 * 1024 * 1024 } });

router.get('/:name', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.sendFile(path.join(__dirname, "..", "../images/", req.params.name));
  }
  catch(err) {
    next(err);
  }
});

router.post('/', isAuthenticated,
  upload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(201)
      .json({"image_url": "/api/images/" + req.file!.filename});
    }
    catch(err) {
      next(err);
    }
  }
);

export default router;
