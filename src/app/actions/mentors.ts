"use server";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users, mentorAvailability } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export type AvailabilityInput = {
  dayOfWeek: string;
  startTime: Date;
  endTime: Date;
};

export async function updateAvailability(availabilities: AvailabilityInput[]) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (!user || user.role !== "mentor") {
    throw new Error("Only mentors can update availability");
  }

  // Delete existing availability
  await db
    .delete(mentorAvailability)
    .where(eq(mentorAvailability.mentorId, user.id));

  // Insert new availability
  for (const availability of availabilities) {
    await db.insert(mentorAvailability).values({
      mentorId: user.id,
      dayOfWeek: availability.dayOfWeek,
      startTime: availability.startTime,
      endTime: availability.endTime,
    });
  }

  revalidatePath("/mentor/dashboard");
}

export async function getMentorAvailability(mentorId: string) {
  const availability = await db.query.mentorAvailability.findMany({
    where: eq(mentorAvailability.mentorId, mentorId),
    orderBy: (mentorAvailability, { asc }) => [
      asc(mentorAvailability.dayOfWeek),
      asc(mentorAvailability.startTime),
    ],
  });

  return availability;
}

export async function getAvailableMentors() {
  const mentors = await db.query.users.findMany({
    where: eq(users.role, "mentor"),
    columns: {
      id: true,
      name: true,
      bio: true,
      expertise: true,
    },
    with: {
      availability: true,
    },
  });

  return mentors;
} 