import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users, startups, startupMembers } from "@/lib/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function StartupDashboard() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (!user || (user.role !== "founder" && user.role !== "employee")) {
    redirect("/");
  }

  const startup = await db.query.startups.findFirst({
    where: eq(startups.founderId, user.id),
    with: {
      members: {
        with: {
          user: true,
        },
      },
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Startup Dashboard</h1>
        <div className="space-x-4">
          <Button variant="outline">Manage Team</Button>
          <Button>Book Session</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            {startup?.members.length === 0 ? (
              <p className="text-muted-foreground">No team members yet</p>
            ) : (
              <div className="space-y-4">
                {startup?.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{member.user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.user.email}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Remove
                    </Button>
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