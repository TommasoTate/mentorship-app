import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { users, sessions } from '@/db/schema';
import { eq, and, gte } from 'drizzle-orm';
import MentorProfile from '@/components/MentorProfile';
import SessionRequests from '@/components/SessionRequests';
import UpcomingSessions from '@/components/UpcomingSessions';
import CalendarIntegration from '@/components/CalendarIntegration';

export default async function MentorDashboard() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId));

  if (!user || user.role !== 'mentor') {
    redirect('/dashboard');
  }

  const now = new Date();
  const pendingRequests = await db
    .select()
    .from(sessions)
    .where(
      and(
        eq(sessions.mentorId, user.id),
        eq(sessions.status, 'requested')
      )
    );

  const upcomingSessions = await db
    .select()
    .from(sessions)
    .where(
      and(
        eq(sessions.mentorId, user.id),
        eq(sessions.status, 'accepted'),
        gte(sessions.scheduledAt, now)
      )
    )
    .orderBy(sessions.scheduledAt);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mentor Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <MentorProfile user={user} />
          <CalendarIntegration user={user} />
        </div>
        <div>
          <SessionRequests requests={pendingRequests} />
          <UpcomingSessions sessions={upcomingSessions} />
        </div>
      </div>
    </div>
  );
}

