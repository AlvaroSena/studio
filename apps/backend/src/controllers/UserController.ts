import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(request: Request, response: Response) {
    const data = request.body;

    const user = await this.userService.create(data);

    return response.status(201).json({
      userId: user.getId(),
    });
  }

  async findAll(request: Request, response: Response) {
    const users = await this.userService.listAll();
    return response.json(users);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;
  }

  async findMe(request: Request, response: Response) {
    const { sub } = request.user as { sub: string };

    // const user = await User.findById(sub);

    // return response.json({
    //   user: {
    //     id: user.getId(),
    //     name: user.getName(),
    //     avatarUrl: user.getAvatarUrl(),
    //     email: user.getEmail(),
    //     role: user.getRole(),
    //     createdAt: user.getCreatedAt(),
    //     updatedAt: user.getUpdatedAt(),
    //   },
    // });
  }

  async deleteUser(request: Request, response: Response) {
    const { id } = request.params;
  }
}
