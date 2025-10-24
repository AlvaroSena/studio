"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictException = void 0;
const Exception_1 = require("./Exception");
class ConflictException extends Exception_1.Exception {
    constructor(message) {
        super(message ?? "Conflict.", 409);
    }
}
exports.ConflictException = ConflictException;
