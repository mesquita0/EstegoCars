import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { setup_db } from "./db";
import login_routes from "./AuthController";
import images_routes from "./images";
import vehicles from "./vehicles";
import users from "./users";

const app = express();
const port = process.argv[3];

app.use(bodyParser.json());

const api = express.Router();
app.use('/api', api);

api.use(login_routes);
api.use('/images', images_routes);
api.use('/vehicles', vehicles);
api.use('/users', users);

app.use((req: Request, res: Response) => {
  res.status(404).json({error: "Not found"});
});

app.listen(port, async () => {
  await setup_db();
  console.log(`App running at: http://localhost:${port}`);
});
