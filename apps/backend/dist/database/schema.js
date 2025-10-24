"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collaborators = exports.collaboratorRoleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.collaboratorRoleEnum = (0, pg_core_1.pgEnum)("collaborator_role", ["admin", "recepcionist", "instructor"]);
exports.collaborators = (0, pg_core_1.pgTable)("collaborators", {
    id: (0, pg_core_1.varchar)({ length: 255 }).primaryKey(),
    name: (0, pg_core_1.varchar)({ length: 100 }).notNull(),
    photoUrl: (0, pg_core_1.varchar)("photo_url", { length: 255 }),
    regionalCouncil: (0, pg_core_1.varchar)("regional_council", { length: 255 }).notNull().unique(),
    birthDate: (0, pg_core_1.date)("birth_date").notNull(),
    email: (0, pg_core_1.varchar)({ length: 255 }).notNull().unique(),
    phoneNumber: (0, pg_core_1.varchar)("phone_number", { length: 255 }).notNull().unique(),
    hiringDate: (0, pg_core_1.date)("hiring_date"),
    password: (0, pg_core_1.varchar)("password_hash", { length: 128 }).notNull(),
    role: (0, exports.collaboratorRoleEnum)("role").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
