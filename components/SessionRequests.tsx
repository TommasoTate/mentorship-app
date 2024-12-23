import { Session } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { acceptSession, rejectSession } from '@/app/actions/session-actions';

interface SessionRequestsProps {
  requests: Session[];
}

export default function SessionRequests({ requests }: SessionRequestsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <p>No pending session requests.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((request) => (
              <li key={request.id} className="border-b pb-4 last:border-b-0">
                <p><strong>Requester:</strong> {request.requesterName}</p>
                <p><strong>Startup:</strong> {request.startupName}</p>
                <p><strong>Proposed Date:</strong> {new Date(request.scheduledAt).toLocaleString()}</p>
                <p><strong>Agenda:</strong> {request.agenda}</p>
                <div className="mt-2 space-x-2">
                  <form action={acceptSession} className="inline-block">
                    <input type="hidden" name="sessionId" value={request.id} />
                    <Button type="submit" variant="default">Accept</Button>
                  </form>
                  <form action={rejectSession} className="inline-block">
                    <input type="hidden" name="sessionId" value={request.id} />
                    <Button type="submit" variant="destructive">Reject</Button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

