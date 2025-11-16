import { relations } from "drizzle-orm";
import { pgTable, varchar, pgEnum, timestamp, date, text } from "drizzle-orm/pg-core";

export const collaboratorRoleEnum = pgEnum("collaborator_role", ["admin", "recepcionist", "instructor"]);
export const classStatusEnum = pgEnum("class_status", ["SCHEDULED", "DONE", "CANCELED"]);
export const classTypeEnum = pgEnum("class_type", ["NORMAL", "REPLACEMENT", "EXPERIMENTAL"]);

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
  classes: many(classes),
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

export const studentsRelations = relations(students, ({ one, many }) => ({
  collaborator: one(collaborators, {
    fields: [students.registeredBy],
    references: [collaborators.id],
  }),
  classes: many(classes),
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
  classes: many(classes),
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

export const classes = pgTable("classes", {
  id: varchar({ length: 255 }).primaryKey(),
  studioId: varchar("studio_id", { length: 255 }).notNull(),
  instructorId: varchar("instructor_id", { length: 255 }).notNull(),
  date: timestamp({ mode: "date" }).notNull(),
  status: classStatusEnum("status").notNull(),
  type: classTypeEnum("type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const classesRelations = relations(classes, ({ one, many }) => ({
  studio: one(studios, {
    fields: [classes.studioId],
    references: [studios.id],
  }),
  instructor: one(collaborators, {
    fields: [classes.studioId],
    references: [collaborators.id],
  }),
  students: many(enrollments),
}));

export const enrollments = pgTable("enrollments", {
  id: varchar({ length: 255 }).primaryKey(),
  classId: varchar("class_id", { length: 255 }).notNull(),
  studentId: varchar("student_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  class: one(classes, {
    fields: [enrollments.classId],
    references: [classes.id],
  }),
  student: one(students, {
    fields: [enrollments.studentId],
    references: [students.id],
  }),
}));
