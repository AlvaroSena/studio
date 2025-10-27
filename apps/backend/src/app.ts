import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { routes } from "./routes";
import { restExceptionHandler } from "./middlewares/restExceptionHandler";

import RateLimit from "express-rate-limit";

const app = express();
app.use(
  cors({
    origin: process.env.WEB_ORIGIN!,
  }),
);
app.use(express.json());
app.use(cookieParser());

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use("/v1", routes);
app.use(restExceptionHandler);

app.get("/", (request, response) => {
  return response.json({
    message: "Hello, world",
  });
});

export default app;
