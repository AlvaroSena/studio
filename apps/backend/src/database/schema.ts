import { relations } from "drizzle-orm";
import { pgTable, varchar, pgEnum, timestamp, date, text } from "drizzle-orm/pg-core";

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

export const collaboratorsRelations = relations(collaborators, ({ many }) => ({
  studentsRegistered: many(students),
}));

export const students = pgTable("students", {
  id: varchar({ length: 255 }).primaryKey(),
  name: text().notNull(),
  avatarUrl: text("avatar_url"),
  birthDate: date("birth_date").notNull(),
  cpf: text().notNull().unique(),
  email: text().notNull().unique(),
  phone: text().notNull().unique(),
  profession: text().notNull(),
  registeredBy: varchar("registered_by", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const studentsRelations = relations(students, ({ one }) => ({
  collaborator: one(collaborators, {
    fields: [students.registeredBy],
    references: [collaborators.id],
  }),
}));

export const studios = pgTable("studios", {
  id: varchar({ length: 255 }).primaryKey(),
  name: text().notNull(),
  address: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const studiosRelations = relations(studios, ({ many }) => ({
  schedules: many(studioSchedule),
}));

export const studioSchedule = pgTable("studio_schedule", {
  id: varchar({ length: 255 }).primaryKey(),
  studioId: varchar("studio_id", { length: 255 }).notNull(),
  dayOfWeek: text("day_of_week").notNull(),
  openTime: text("open_time").notNull(),
  closeTime: text("close_time").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const studioScheduleRelations = relations(studioSchedule, ({ one }) => ({
  studio: one(studios, {
    fields: [studioSchedule.studioId],
    references: [studios.id],
  }),
}));
