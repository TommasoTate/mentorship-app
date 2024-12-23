import { pgTable, serial, text, timestamp, integer, boolean, pgEnum, AnyPgColumn } from 'drizzle-orm/pg-core';

const roleEnum = pgEnum('role', ['mentor', 'founder', 'employee']);
const sessionStatusEnum = pgEnum('session_status', ['requested', 'accepted', 'rejected', 'completed', 'cancelled']);
const notificationTypeEnum = pgEnum('notification_type', ['session_requested', 'session_accepted', 'session_rejected', 'session_cancelled']);

export const users = pgTable('users', {
  id: serial().primaryKey(),
  clerkId: text().notNull().unique(),
  name: text().notNull(),
  email: text().notNull().unique(),
  avatarUrl: text(),
  bio: text(),
  expertise: text(),
  role: roleEnum().notNull(),
  startupId: integer().references(() => startups.id),
  calendarLink: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const startups = pgTable('startups', {
  id: serial().primaryKey(),
  name: text().notNull(),
  logoUrl: text(),
  industry: text(),
  description: text(),
  founderId: integer().references((): AnyPgColumn => users.id).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: serial().primaryKey(),
  mentorId: integer().references(() => users.id).notNull(),
  requesterId: integer().references(() => users.id).notNull(),
  startupId: integer().references(() => startups.id).notNull(),
  status: sessionStatusEnum().notNull(),
  scheduledAt: timestamp(),
  agenda: text(),
  notes: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const notifications = pgTable('notifications', {
  id: serial().primaryKey(),
  userId: integer().references(() => users.id).notNull(),
  type: notificationTypeEnum().notNull(),
  content: text().notNull(),
  isRead: boolean().default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type Startup = typeof startups.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Notification = typeof notifications.$inferSelect;

