import { Request, Response } from 'express';
import { User } from '../models/UserModel';

export class UserController {
  async createUser(request: Request, response: Response) {
    const data = request.body;

    const user = new User(data);

    await user.save();
    response.status(201).json({
      userId: user.getId()
    });
  }
}
