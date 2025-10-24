"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const collaborator_routes_1 = require("./collaborator.routes");
const auth_routes_1 = require("./auth.routes");
exports.routes = (0, express_1.Router)();
exports.routes.use("/collaborators", collaborator_routes_1.collaboratorRoutes);
exports.routes.use("/auth", auth_routes_1.authRoutes);
