import express from "express";
import { routes } from "./routes";
import RateLimit from "express-rate-limit";

export const app = express();
app.use(express.json());

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(routes);
