import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(request: Request, response: Response) {
    const body = request.body;

    // const { accessToken, refreshToken } = await this.authService.login(body.email, body.password);
    const { userId } = await this.authService.login(body.email, body.password);

    // response.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   maxAge: 1000 * 60 * 60,
    // });

    return response.status(201).json({
      userId,
    });
  }

  async verifyCode(request: Request, response: Response) {
    const { userId } = request.params;
    const { code } = request.body;

    const { accessToken, refreshToken } = await this.authService.verifyCode(code, userId);

    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    });

    return response.status(201).json({
      accessToken,
      refreshToken,
    });
  }

  refresh(request: Request, response: Response) {
    const token = request.cookies.refreshToken;

    if (!token) {
      return response.sendStatus(401);
    }

    try {
      const { accessToken, refreshToken } = this.authService.refresh(token);

      response.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
      });

      return response.status(201).json({ accessToken });
    } catch (err) {
      console.log(err);
    }
  }

  async logout(request: Request, response: Response) {
    response.clearCookie("refreshToken");
    return response.status(204).send();
  }
}
