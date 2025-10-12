import { Request, Response } from 'express';
import { User } from '../models/UserModel';
import { NotFoundException } from '../exceptions/NotFoundException';
import { compare } from 'bcryptjs';
import { generateTokens } from '../utils/generateTokens';

export class AuthController {
  async login(request: Request, response: Response) {
    const body = request.body;

    const user = await User.findByEmail(body.email);

    if (!user) {
      throw new Error();
    }

    const passwordMatch = await compare(body.password, user.getPassword());

    if (!passwordMatch) {
      throw new Error();
    }

    const userId = user.getId();

     if (!userId) {
       throw new NotFoundException("User not found.");
     }

    const { accessToken, refreshToken } = generateTokens({ sub: userId, role: user.getRole() });

    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
       secure: false,
       sameSite: "lax",
       maxAge: 1000 * 60 * 60,
    })

    return response.status(201).json({ accessToken, refreshToken });

  }

  async logout(request: Request, response: Response) {
    response.clearCookie("refreshToken");
    return response.status(204).send();
  }
}
