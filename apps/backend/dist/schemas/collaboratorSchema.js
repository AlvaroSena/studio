"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collaboratorSchema = void 0;
const zod_1 = require("zod");
exports.collaboratorSchema = zod_1.z.object({
    id: zod_1.z.uuid({ message: "Invalid ID" }).optional(),
    name: zod_1.z.string().min(3, { message: "Name must be at least 3 characters long" }),
    photoUrl: zod_1.z.url().optional(),
    regionalCouncil: zod_1.z.string().min(3, { message: "Name must be at least 3 characters long" }),
    birthDate: zod_1.z.coerce.date(),
    email: zod_1.z.email({ message: "Invalid e-mail" }),
    phoneNumber: zod_1.z.string().min(3, { message: "Name must be at least 3 characters long" }),
    hiringDate: zod_1.z.date({ message: "Invalid date" }).optional(),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long" }),
    role: zod_1.z.enum(["admin", "recepcionist", "instructor"], {
        message: "Invalid role",
    }),
    createdAt: zod_1.z.date({ message: "Invalid date" }).optional(),
    updatedAt: zod_1.z.date({ message: "Invalid date" }).optional(),
});
