"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restExceptionHandler = restExceptionHandler;
const Exception_1 = require("../exceptions/Exception");
function restExceptionHandler(err, request, response, next) {
    let statusCode = 500;
    let message = "Internal server error";
    if (err instanceof Exception_1.Exception) {
        statusCode = err.statusCode;
        message = err.message;
    }
    if (process.env.NODE_ENV === "development") {
        console.log(err);
    }
    return response.status(statusCode).json({ error: message });
}
