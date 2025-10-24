"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(request, response) {
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
    async verifyCode(request, response) {
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
    refresh(request, response) {
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
        }
        catch (err) {
            console.log(err);
        }
    }
    async logout(request, response) {
        response.clearCookie("refreshToken");
        return response.status(204).send();
    }
}
exports.AuthController = AuthController;
