import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id", { length: 255 }).unique().notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("founder"),
  name: varchar("name", { length: 255 }).notNull(),
  bio: text("bio"),
  expertise: text("expertise"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  mentorId: uuid("mentor_id").references(() => users.id).notNull(),
  requesterId: uuid("requester_id").references(() => users.id).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  scheduledFor: timestamp("scheduled_for").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const startups = pgTable("startups", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  founderId: uuid("founder_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const startupMembers = pgTable("startup_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  startupId: uuid("startup_id").references(() => startups.id).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const mentorAvailability = pgTable("mentor_availability", {
  id: uuid("id").primaryKey().defaultRandom(),
  mentorId: uuid("mentor_id").references(() => users.id).notNull(),
  dayOfWeek: varchar("day_of_week", { length: 10 }).notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}); 