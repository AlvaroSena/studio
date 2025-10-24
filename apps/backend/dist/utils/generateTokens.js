"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = generateTokens;
const jsonwebtoken_1 = require("jsonwebtoken");
function generateTokens(user) {
    const accessToken = (0, jsonwebtoken_1.sign)(user, process.env.AUTH_SECRET, {
        expiresIn: "15m",
    });
    const refreshToken = (0, jsonwebtoken_1.sign)(user, process.env.AUTH_SECRET, {
        expiresIn: "7d",
    });
    return { accessToken, refreshToken };
}
