import { Router } from "express";
import { UserController } from "../controllers/UserController";

export const routes = Router();

const userController = new UserController();

routes.post("/users", userController.createUser)
routes.get("/users", userController.findAll)
