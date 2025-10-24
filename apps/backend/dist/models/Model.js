"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Model {
    id;
    createdAt;
    updatedAt;
    constructor(id, createdAt, updatedAt) {
        this.id = id || crypto_1.default.randomUUID();
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    setUpdatedAt(updatedAt) {
        this.updatedAt = updatedAt;
    }
}
exports.Model = Model;
