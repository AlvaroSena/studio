import { Router } from "express";
import { collaboratorRoutes } from "./collaborator.routes";
import { authRoutes } from "./auth.routes";
import { studentsRoutes } from "./students.routes";
import { studioRoutes } from "./studio.routes";
import { studioScheduleRoutes } from "./studio-schedule.routes";
import { classRoutes } from "./class.routes";
import { enrollmentRoutes } from "./enrollment.routes";
import { planRoutes } from "./plans.routes";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/collaborators", collaboratorRoutes);
routes.use("/students", studentsRoutes);
routes.use("/studios", studioRoutes);
routes.use("/schedule", studioScheduleRoutes);
routes.use("/classes", classRoutes);
routes.use("/enrollments", enrollmentRoutes);
routes.use("/plans", planRoutes);
