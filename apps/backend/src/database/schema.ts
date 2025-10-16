import { uuid, pgTable, varchar, pgEnum, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["admin", "recepcionist", "instructor", "student"]);

export const users = pgTable("users", {
  id: varchar({ length: 255 }).primaryKey(),
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

export const studios = pgTable(
  "studios",
  {
    id: varchar({ length: 255 }).primaryKey(),
    name: varchar({ length: 100 }).notNull(),
    address: varchar({ length: 255 }).notNull(),
    adminId: varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    userIdIdx: index("studio_user_id_idx").on(table.adminId),
  }),
);
