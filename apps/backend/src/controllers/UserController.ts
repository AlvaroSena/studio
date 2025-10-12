import { Request, Response } from 'express';
import { User } from '../models/UserModel';

export class UserController {
  async createUser(request: Request, response: Response) {
    const data = request.body;

    const user = new User(data);

    const userCreated = await user.save();

    return response.status(201).json({
      userId: userCreated.getId(),
    });
  }

  async findAll(request: Request, response: Response) {
    const users = await User.findAll();
    return response.json(users);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const user = await User.findById(id);

    return response.json({
      user: {
        id: user.getId(),
        name: user.getName(),
        avatarUrl: user.getAvatarUrl(),
        email: user.getEmail(),
        role: user.getRole(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
      },
    });
  }

  async deleteUser(request: Request, response: Response) {
    const { id } = request.params;

    await User.delete(id);

    return response.status(204).send();
  }
}
