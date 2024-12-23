import { db } from './db';
import { notifications } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function fetchNotifications(userId: number | undefined) {
  if (!userId) {
    throw new Error('User ID is required to fetch notifications');
  }

  try {
    const userNotifications = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(notifications.createdAt)
      .limit(5);

    return userNotifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw new Error('Failed to fetch notifications');
  }
}

