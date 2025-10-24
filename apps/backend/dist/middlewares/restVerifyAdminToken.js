"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restVerifyAdminToken = restVerifyAdminToken;
const CollaboratorRepository_1 = require("../repositories/CollaboratorRepository");
const jsonwebtoken_1 = require("jsonwebtoken");
async function restVerifyAdminToken(request, reply, next) {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return reply.status(401).json({ message: "Token missing" });
    }
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.AUTH_SECRET);
        const collaboratorRepository = new CollaboratorRepository_1.CollaboratorRepository();
        const collaborator = await collaboratorRepository.findById(payload.sub);
        if (!collaborator) {
            return reply.status(401).json({ message: "User not found" });
        }
        if (collaborator.getRole() !== "admin") {
            return reply.status(401).json({ message: "Unauthorized" });
        }
        request.user = payload;
        next();
    }
    catch (error) {
        return reply.status(500).json({ error });
    }
}
