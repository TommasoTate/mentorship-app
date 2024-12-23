import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { notifications, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import NotificationPopover from "./NotificationPopover";

export default async function NotificationCenter() {
  const {id} = (await currentUser())!;
  
  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, id)
  });

  if (!user) {
    notFound();
  }

  const userNotifications = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, user.id))
    .orderBy(notifications.createdAt)
    .limit(5);

  const unreadCount = userNotifications.filter(n => !n.isRead).length || 0;

  return (
    <NotificationPopover
      userNotifications={userNotifications}
      unreadCount={unreadCount}
    />
  );
}

