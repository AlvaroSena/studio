import { Request, Response } from 'express';
import { User } from '../models/UserModel';

export class UserController {
  async createUser(request: Request, response: Response) {
    const data = request.body;

    const user = new User(data);

    const userCreated =await user.save();
    response.status(201).json(userCreated);
  }

  async findAll(request: Request, response: Response) {
    const users = await User.findAll();
    response.json(users);
  }
}
