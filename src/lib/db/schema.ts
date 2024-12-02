import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  clerkId: varchar({ length: 255 }).unique().notNull(),
  email: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 50 }).notNull().default("founder"),
  name: varchar({ length: 255 }).notNull(),
  bio: text(),
  expertise: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: uuid().primaryKey().defaultRandom(),
  mentorId: uuid().references(() => users.id).notNull(),
  requesterId: uuid().references(() => users.id).notNull(),
  status: varchar({ length: 50 }).notNull().default("pending"),
  scheduledFor: timestamp().notNull(),
  notes: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const startups = pgTable("startups", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  founderId: uuid().references(() => users.id).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const startupMembers = pgTable("startup_members", {
  id: uuid().primaryKey().defaultRandom(),
  startupId: uuid().references(() => startups.id).notNull(),
  userId: uuid().references(() => users.id).notNull(),
  role: varchar({ length: 50 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const mentorAvailability = pgTable("mentor_availability", {
  id: uuid().primaryKey().defaultRandom(),
  mentorId: uuid().references(() => users.id).notNull(),
  dayOfWeek: varchar({ length: 10 }).notNull(),
  startTime: timestamp().notNull(),
  endTime: timestamp().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
}); 