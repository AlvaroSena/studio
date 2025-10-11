import { uuid, pgTable, varchar, pgEnum, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "recepcionist",
  "instructor",
  "student",
]);

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  avatarUrl: varchar("avatar_url", { length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar("password_hash", { length: 128 }).notNull(),
  role: userRoleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  studios: many(studios),
}));

export const studios = pgTable("studios", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  adminId: uuid().notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
