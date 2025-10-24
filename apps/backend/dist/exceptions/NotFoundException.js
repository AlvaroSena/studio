"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const Exception_1 = require("./Exception");
class NotFoundException extends Exception_1.Exception {
    constructor(message) {
        super(message ?? "Not found.", 404);
    }
}
exports.NotFoundException = NotFoundException;
