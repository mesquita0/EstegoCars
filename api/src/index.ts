import bodyParser from "body-parser";
import express, { Request, Response, NextFunction } from "express";
import setup_db from "./database/db_connection";
import images_routes from "./routes/images";
import vehicles_routes from "./routes/vehicles";
import users_routes from "./routes/users";
import pdf_routes from "./routes/pdf";

const app = express();
const port = process.argv[3];

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const api = express.Router();
app.use('/api', api);

api.use('/images', images_routes);
api.use('/vehicles', vehicles_routes);
api.use('/users', users_routes);
api.use('/pdf', pdf_routes);

app.use((req: Request, res: Response) => {
  res.status(404).json({error: "Not found"});
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({"error": "internal server error"});
});

app.listen(port, async () => {
  await setup_db();
  console.log(`App running at: http://localhost:${port}`);
});
