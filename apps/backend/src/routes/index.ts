import { Router } from "express";
import { collaboratorRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";

export const routes = Router();

routes.use("/collaborators", collaboratorRoutes);
routes.use("/auth", authRoutes);
