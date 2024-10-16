import bodyParser from "body-parser";
import express, { Express, Request, Response, NextFunction } from "express";
import { setup_db } from "./db";
import login_routes from "./AuthController";
import api from "./api";

const app = express();
const port = process.argv[3];

app.use(bodyParser.json());

app.use('/api', login_routes);

app.use('/api', api);

app.use((req, res) => {
  res.status(404).json({error: "Not found"});
});

app.listen(port, async () => {
  await setup_db();
  console.log(`App running at: http://localhost:${port}`);
});
