import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { db } from '../../lib/db';
import { users, sessions } from '../../db/schema';
import { eq, and, gte, lt } from 'drizzle-orm';
import MentorDashboard from '../../components/MentorDashboard';
import FounderDashboard from '../../components/FounderDashboard';
import EmployeeDashboard from '../../components/EmployeeDashboard';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const user = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1);

  if (!user[0]) {
    // Handle case where user is not in our database
    return <div>Error: User not found</div>;
  }

  switch (user[0].role) {
    case 'mentor':
      const now = new Date();
      const pendingRequests = await db
        .select()
        .from(sessions)
        .where(
          and(
            eq(sessions.mentorId, user[0].id),
            eq(sessions.status, 'requested')
          )
        );

      const upcomingSessions = await db
        .select()
        .from(sessions)
        .where(
          and(
            eq(sessions.mentorId, user[0].id),
            eq(sessions.status, 'accepted'),
            gte(sessions.scheduledAt, now)
          )
        )
        .orderBy(sessions.scheduledAt);

      const pastSessions = await db
        .select()
        .from(sessions)
        .where(
          and(
            eq(sessions.mentorId, user[0].id),
            eq(sessions.status, 'completed'),
            lt(sessions.scheduledAt, now)
          )
        )
        .orderBy(sessions.scheduledAt);

      return <MentorDashboard 
        user={user[0]} 
        pendingRequests={pendingRequests} 
        upcomingSessions={upcomingSessions}
        pastSessions={pastSessions}
      />;
    case 'founder':
      return <FounderDashboard user={user[0]} />;
    case 'employee':
      return <EmployeeDashboard user={user[0]} />;
    default:
      return <div>Error: Invalid user role</div>;
  }
}

