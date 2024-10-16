import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { setup_db } from "./db";
import login_routes from "./AuthController";
import images_routes from "./images";
import cars from "./cars";

const app = express();
const port = process.argv[3];

app.use(bodyParser.json());

app.use('/api', login_routes);
app.use('/api', images_routes);
app.use('/api', cars);

app.use((req: Request, res: Response) => {
  res.status(404).json({error: "Not found"});
});

app.listen(port, async () => {
  await setup_db();
  console.log(`App running at: http://localhost:${port}`);
});
