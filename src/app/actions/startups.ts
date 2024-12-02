"use server";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { startups, startupMembers, users } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function createStartup(name: string, description?: string) {
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

  if (user.role !== "founder") {
    throw new Error("Only founders can create startups");
  }

  const existingStartup = await db.query.startups.findFirst({
    where: eq(startups.founderId, user.id),
  });

  if (existingStartup) {
    throw new Error("You already have a startup");
  }

  const startup = await db
    .insert(startups)
    .values({
      name,
      description,
      founderId: user.id,
    })
    .returning();

  await db.insert(startupMembers).values({
    startupId: startup[0].id,
    userId: user.id,
    role: "founder",
  });

  revalidatePath("/startup/dashboard");
}

export async function addTeamMember(email: string, role: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const founder = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (!founder || founder.role !== "founder") {
    throw new Error("Only founders can add team members");
  }

  const startup = await db.query.startups.findFirst({
    where: eq(startups.founderId, founder.id),
  });

  if (!startup) {
    throw new Error("Startup not found");
  }

  const member = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!member) {
    throw new Error("User not found");
  }

  const existingMember = await db.query.startupMembers.findFirst({
    where: eq(startupMembers.userId, member.id),
  });

  if (existingMember) {
    throw new Error("User is already a member of a startup");
  }

  await db.insert(startupMembers).values({
    startupId: startup.id,
    userId: member.id,
    role,
  });

  revalidatePath("/startup/dashboard");
}

export async function removeTeamMember(memberId: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const founder = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (!founder || founder.role !== "founder") {
    throw new Error("Only founders can remove team members");
  }

  const startup = await db.query.startups.findFirst({
    where: eq(startups.founderId, founder.id),
  });

  if (!startup) {
    throw new Error("Startup not found");
  }

  await db
    .delete(startupMembers)
    .where(eq(startupMembers.id, memberId));

  revalidatePath("/startup/dashboard");
} 