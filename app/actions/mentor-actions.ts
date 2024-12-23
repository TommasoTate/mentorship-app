'use server'

import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updateMentorProfile(formData: FormData) {
  const userId = parseInt(formData.get('userId') as string);
  const name = formData.get('name') as string;
  const bio = formData.get('bio') as string;
  const expertise = formData.get('expertise') as string;

  try {
    await db
      .update(users)
      .set({ name, bio, expertise })
      .where(eq(users.id, userId));

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error updating mentor profile:', error);
    return { success: false, error: 'Failed to update profile' };
  }
}

export async function updateCalendarLink(formData: FormData) {
  const userId = parseInt(formData.get('userId') as string);
  const calendarLink = formData.get('calendarLink') as string;

  try {
    await db
      .update(users)
      .set({ calendarLink })
      .where(eq(users.id, userId));

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error updating calendar link:', error);
    return { success: false, error: 'Failed to update calendar link' };
  }
}

