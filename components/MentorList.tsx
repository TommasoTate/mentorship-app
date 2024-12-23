import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default async function MentorList() {
  const mentors = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      avatarUrl: users.avatarUrl,
      bio: users.bio,
      expertise: users.expertise,
    })
    .from(users)
    .where(eq(users.role, 'mentor'));

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mentors.map((mentor) => (
        <Card key={mentor.id}>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src={mentor.avatarUrl || undefined} alt={mentor.name} />
              <AvatarFallback>{mentor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{mentor.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{mentor.email}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-2 line-clamp-3">{mentor.bio}</p>
            <p className="mb-4 text-sm font-semibold">Expertise: {mentor.expertise}</p>
            <Link href={`/mentors/${mentor.id}`} passHref>
              <Button className="w-full">View Profile</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

