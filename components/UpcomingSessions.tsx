import { Session } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cancelSession } from '@/app/actions/session-actions';

interface UpcomingSessionsProps {
  sessions: Session[];
}

export default function UpcomingSessions({ sessions }: UpcomingSessionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <p>No upcoming sessions scheduled.</p>
        ) : (
          <ul className="space-y-4">
            {sessions.map((session) => (
              <li key={session.id} className="border-b pb-4 last:border-b-0">
                <p><strong>Mentee:</strong> {session.requesterName}</p>
                <p><strong>Startup:</strong> {session.startupName}</p>
                <p><strong>Date:</strong> {new Date(session.scheduledAt).toLocaleString()}</p>
                <p><strong>Agenda:</strong> {session.agenda}</p>
                <form action={cancelSession} className="mt-2">
                  <input type="hidden" name="sessionId" value={session.id} />
                  <Button type="submit" variant="destructive">Cancel Session</Button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

