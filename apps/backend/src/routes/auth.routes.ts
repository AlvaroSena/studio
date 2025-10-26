import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../services/AuthService";
import { CollaboratorRepository } from "../repositories/CollaboratorRepository";

export const authRoutes = Router();

const collaboratorRepository = new CollaboratorRepository();
const authService = new AuthService(collaboratorRepository);
const authController = new AuthController(authService);

authRoutes.post("/login", (request: Request, response: Response) => authController.login(request, response));
authRoutes.post("/verify/:userId", (request: Request, response: Response) =>
  authController.verifyCode(request, response),
);
authRoutes.post("/refresh", (request: Request, response: Response) => authController.refresh(request, response));
authRoutes.post("/forgot-password", (request: Request, response: Response) =>
  authController.forgotPassword(request, response),
);
