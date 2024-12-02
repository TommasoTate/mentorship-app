import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { eq, or } from "drizzle-orm";
import { users, sessions } from "@/lib/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function SessionsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userData = await db.query.users.findFirst({
    where: eq(users.clerkId, user.id),
  });

  if (!userData) {
    redirect("/");
  }

  const userSessions = await db.query.sessions.findMany({
    where: or(
      eq(sessions.mentorId, userData.id),
      eq(sessions.requesterId, userData.id)
    ),
    with: {
      mentor: true,
      requester: true,
    },
    orderBy: (sessions, { desc }) => [desc(sessions.scheduledFor)],
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sessions</h1>
        {userData.role !== "mentor" && (
          <Button>Book New Session</Button>
        )}
      </div>

      <div className="space-y-6">
        {userSessions.map((session) => (
          <Card key={session.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Session with{" "}
                  {user.id === session.mentorId
                    ? session.requester.name
                      : session.mentor.name}
                </CardTitle>
                <Badge
                  variant={
                    session.status === "completed"
                      ? "secondary"
                      : session.status === "pending"
                      ? "outline"
                      : "default"
                  }
                >
                  {session.status.charAt(0).toUpperCase() +
                    session.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Scheduled for:{" "}
                  {new Date(session.scheduledFor).toLocaleString()}
                </p>
                {session.notes && (
                  <p className="text-sm">Notes: {session.notes}</p>
                )}
                {session.status === "pending" && userData.role === "mentor" && (
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      Decline
                    </Button>
                    <Button size="sm">Accept</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {userSessions.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No sessions found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 