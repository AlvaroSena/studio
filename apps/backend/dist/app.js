"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const restExceptionHandler_1 = require("./middlewares/restExceptionHandler");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: process.env.WEB_ORIGIN,
    credentials: true,
}));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
exports.app.use(limiter);
exports.app.use("/v1", routes_1.routes);
exports.app.use(restExceptionHandler_1.restExceptionHandler);
