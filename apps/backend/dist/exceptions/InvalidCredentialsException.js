"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsException = void 0;
const Exception_1 = require("./Exception");
class InvalidCredentialsException extends Exception_1.Exception {
    constructor(message) {
        super(message ?? "Invalid credentials.", 401);
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
