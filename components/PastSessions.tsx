import { Session } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addSessionNotes } from '@/app/actions/session-actions';

interface PastSessionsProps {
  sessions: Session[];
}

export default function PastSessions({ sessions }: PastSessionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Past Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <p>No past sessions found.</p>
        ) : (
          <ul className="space-y-4">
            {sessions.map((session) => (
              <li key={session.id} className="border-b pb-4 last:border-b-0">
                <p><strong>Mentee:</strong> {session.requesterName}</p>
                <p><strong>Startup:</strong> {session.startupName}</p>
                <p><strong>Date:</strong> {new Date(session.scheduledAt).toLocaleString()}</p>
                <p><strong>Agenda:</strong> {session.agenda}</p>
                {session.notes ? (
                  <div className="mt-2">
                    <h4 className="font-semibold">Session Notes:</h4>
                    <p>{session.notes}</p>
                  </div>
                ) : (
                  <form action={addSessionNotes} className="mt-2">
                    <input type="hidden" name="sessionId" value={session.id} />
                    <Textarea
                      name="notes"
                      placeholder="Add session notes..."
                      className="mb-2"
                    />
                    <Button type="submit">Add Notes</Button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

