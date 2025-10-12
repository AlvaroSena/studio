import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthController } from "../controllers/AuthController";
import { restVerifyAdminToken } from "../middlewares/restVerifyAdminToken";

export const routes = Router();

const userController = new UserController();
const authController = new AuthController();

routes.post("/users", userController.createUser)
routes.get("/users", restVerifyAdminToken, userController.findAll)
routes.get("/users/:id", restVerifyAdminToken, userController.findById)
routes.delete("/users/delete/:id", restVerifyAdminToken, userController.deleteUser)

routes.post("/auth/login", authController.login);
routes.post("/auth/logout", authController.logout);
