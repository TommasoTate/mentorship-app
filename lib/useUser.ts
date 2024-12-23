import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { db } from '../db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';

export function useUser() {
  const { userId } = useAuth();

  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null;
      const user = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1);
      return user[0] || null;
    },
  });
}

