import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../services/AuthService";
import { UserRepository } from "../repositories/UserRepository";

export const authRoutes = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRoutes.post("/login", (request: Request, response: Response) => authController.login(request, response));
authRoutes.post("/refresh", (request: Request, response: Response) => authController.refresh(request, response));
authRoutes.post("/logout", (request: Request, response: Response) => authController.logout(request, response));
