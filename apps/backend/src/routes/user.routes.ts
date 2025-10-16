import { Router, Request, Response } from "express";
import { restVerifyAdminToken } from "../middlewares/restVerifyAdminToken";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";

export const userRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.post("/", (request: Request, response: Response) => userController.createUser(request, response));
userRoutes.get("/", restVerifyAdminToken, (request: Request, response: Response) =>
  userController.findAll(request, response),
);
userRoutes.get("/:id", restVerifyAdminToken, userController.findById);
userRoutes.get("/profile/me", restVerifyAdminToken, userController.findMe);
userRoutes.delete("/delete/:id", restVerifyAdminToken, userController.deleteUser);
