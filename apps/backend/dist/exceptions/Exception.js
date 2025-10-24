"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
class Exception extends Error {
    statusCode;
    constructor(message, code = 400) {
        super(message);
        this.statusCode = code;
    }
}
exports.Exception = Exception;
