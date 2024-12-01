"use server";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { sessions, users } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function updateSessionStatus(
  sessionId: string,
  status: "accepted" | "rejected" | "completed"
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
  });

  if (!session) {
    throw new Error("Session not found");
  }

  if (session.mentorId !== user.id) {
    throw new Error("Unauthorized");
  }

  await db
    .update(sessions)
    .set({ status, updatedAt: new Date() })
    .where(eq(sessions.id, sessionId));

  revalidatePath("/sessions");
  revalidatePath("/mentor/dashboard");
}

export async function createSession(
  mentorId: string,
  scheduledFor: Date,
  notes?: string
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role === "mentor") {
    throw new Error("Mentors cannot create session requests");
  }

  await db.insert(sessions).values({
    mentorId,
    requesterId: user.id,
    scheduledFor,
    notes,
    status: "pending",
  });

  revalidatePath("/sessions");
} 