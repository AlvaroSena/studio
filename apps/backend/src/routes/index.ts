import { Router } from "express";
import { collaboratorRoutes } from "./collaborator.routes";
import { authRoutes } from "./auth.routes";
import { studentsRoutes } from "./students.routes";

export const routes = Router();

routes.use("/collaborators", collaboratorRoutes);
routes.use("/students", studentsRoutes);
routes.use("/auth", authRoutes);
