import { Request, Response } from "express";
import { User, UserRole } from "../models/UserModel";
import { InvalidCredentialsException } from "../exceptions/InvalidCredentialsException";
import { compare } from "bcryptjs";
import { generateTokens } from "../utils/generateTokens";
import { verify } from "jsonwebtoken";

export interface UserPayloadDTO {
  sub: string;
  role: UserRole;
}

export class AuthController {
  async login(request: Request, response: Response) {
    const body = request.body;

    const user = await User.findByEmail(body.email);

    if (!user) {
      throw new InvalidCredentialsException("E-mail or password is incorrect.");
    }

    const passwordMatch = await compare(body.password, user.getPassword());

    if (!passwordMatch) {
      throw new InvalidCredentialsException("E-mail or password is incorrect.");
    }

    const { accessToken, refreshToken } = generateTokens({ sub: user.getId(), role: user.getRole() });

    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    });

    return response.status(201).json({ accessToken, refreshToken });
  }

  refresh(request: Request, response: Response) {
    const token = request.cookies.refreshToken;

    if (!token) {
      return response.sendStatus(401);
    }

    try {
      const payload = verify(token, process.env.AUTH_SECRET!) as UserPayloadDTO;
      const { refreshToken, accessToken } = generateTokens({
        sub: payload.sub,
        role: payload.role,
      });

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
