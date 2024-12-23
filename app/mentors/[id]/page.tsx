import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { users, sessions } from '@/db/schema';
import { eq, and, gte } from 'drizzle-orm';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requestSession } from '@/app/actions/session-actions';

export default async function MentorProfilePage({ params }: { params: { id: string } }) {
  const mentorId = parseInt(params.id);

  const mentor = await db
    .select()
    .from(users)
    .where(eq(users.id, mentorId))
    .limit(1);

  if (!mentor[0] || mentor[0].role !== 'mentor') {
    notFound();
  }

  const now = new Date();
  const upcomingSessions = await db
    .select({
      scheduledAt: sessions.scheduledAt,
    })
    .from(sessions)
    .where(
      and(
        eq(sessions.mentorId, mentorId),
        eq(sessions.status, 'accepted'),
        gte(sessions.scheduledAt, now)
      )
    )
    .orderBy(sessions.scheduledAt);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={mentor[0].avatarUrl || undefined} alt={mentor[0].name} />
            <AvatarFallback>{mentor[0].name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{mentor[0].name}</CardTitle>
            <p className="text-muted-foreground">{mentor[0].email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p>{mentor[0].bio}</p>
              <h2 className="text-xl font-semibold mt-4 mb-2">Expertise</h2>
              <p>{mentor[0].expertise}</p>
              {mentor[0].calendarLink ? (
                <a href={mentor[0].calendarLink} target="_blank" rel="noopener noreferrer">
                  <Button className="mt-6 w-full">Schedule a Session</Button>
                </a>
              ) : (
                <form action={requestSession} className="mt-6">
                  <input type="hidden" name="mentorId" value={mentor[0].id} />
                  <Button type="submit" className="w-full">Request Session</Button>
                </form>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Upcoming Sessions</h2>
              {upcomingSessions.length === 0 ? (
                <p>No upcoming sessions scheduled.</p>
              ) : (
                <ul className="space-y-2">
                  {upcomingSessions.map((session) => (
                    <li key={session.scheduledAt.toString()}>
                      {new Date(session.scheduledAt).toLocaleString()}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

