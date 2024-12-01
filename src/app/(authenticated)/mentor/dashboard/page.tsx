import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users, sessions } from "@/lib/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function MentorDashboard() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (!user || user.role !== "mentor") {
    redirect("/");
  }

  const pendingSessions = await db.query.sessions.findMany({
    where: eq(sessions.mentorId, user.id),
    with: {
      requester: true,
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
        <Button>Update Availability</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingSessions.length === 0 ? (
              <p className="text-muted-foreground">No pending requests</p>
            ) : (
              <div className="space-y-4">
                {pendingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{session.requester.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(session.scheduledFor).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                      <Button size="sm">Accept</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No upcoming sessions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 