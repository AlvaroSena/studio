import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(request: Request, response: Response) {
    const body = request.body;

    const { userId } = await this.authService.login(body.email, body.password);

    return response.status(201).json({
      userId,
    });
  }

  async verifyCode(request: Request, response: Response) {
    const { userId } = request.params;
    const { code } = request.body;

    const { accessToken, refreshToken } = await this.authService.verifyCode(code, userId);

    return response.status(201).json({
      accessToken,
      refreshToken,
    });
  }

  refresh(request: Request, response: Response) {
    const token = request.body.token;

    if (!token) {
      return response.sendStatus(401);
    }

    try {
      const { accessToken, refreshToken } = this.authService.refresh(token);

      return response.status(201).json({ accessToken, refreshToken });
    } catch (err) {
      console.log(err);
    }
  }

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;

    await this.authService.forgotPassword(email);

    return response.status(204).send();
  }
}
