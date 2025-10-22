import { pgTable, varchar, pgEnum, timestamp, date } from "drizzle-orm/pg-core";

export const collaboratorRoleEnum = pgEnum("collaborator_role", ["admin", "recepcionist", "instructor"]);

export const collaborators = pgTable("collaborators", {
  id: varchar({ length: 255 }).primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  photoUrl: varchar("photo_url", { length: 255 }),
  regionalCouncil: varchar("regional_council", { length: 255 }).notNull().unique(),
  birthDate: date("birth_date").notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 255 }).notNull().unique(),
  hiringDate: date("hiring_date"),
  password: varchar("password_hash", { length: 128 }).notNull(),
  role: collaboratorRoleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
