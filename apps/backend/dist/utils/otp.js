"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNumericOtp = generateNumericOtp;
exports.hashOtp = hashOtp;
const node_crypto_1 = require("node:crypto");
const OTP_LENGTH = 6;
const OTP_SECRET = process.env.OTP_SECRET ?? "troque_isto_por_variavel_de_ambiente";
function generateNumericOtp(length = OTP_LENGTH) {
    const max = 10 ** length;
    const n = (0, node_crypto_1.randomInt)(0, max); // crypto-secure
    return n.toString().padStart(length, "0");
}
function hashOtp(otp, email) {
    // HMAC com secret + identificador (email) para ligar ao usuário
    return (0, node_crypto_1.createHmac)("sha256", OTP_SECRET).update(`${email}:${otp}`).digest("hex");
}
