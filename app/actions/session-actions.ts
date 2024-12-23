'use server'

import { db } from '@/lib/db';
import { sessions, notifications, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { sendEmail } from '@/lib/email';
import { auth } from '@clerk/nextjs';

export async function acceptSession(formData: FormData) {
  const sessionId = parseInt(formData.get('sessionId') as string);

  try {
    const [updatedSession] = await db
      .update(sessions)
      .set({ status: 'accepted' })
      .where(eq(sessions.id, sessionId))
      .returning();

    if (!updatedSession) {
      throw new Error('Session not found');
    }

    const [mentor] = await db
      .select()
      .from(users)
      .where(eq(users.id, updatedSession.mentorId));

    // Create a notification
    await db.insert(notifications).values({
      userId: updatedSession.requesterId,
      type: 'session_accepted',
      content: `Your session request has been accepted.`,
    });

    // Send an email
    await sendEmail({
      to: updatedSession.requesterEmail,
      type: 'session_accepted',
      data: {
        mentorName: mentor.name,
        sessionDate: updatedSession.scheduledAt!.toLocaleDateString(),
        sessionTime: updatedSession.scheduledAt!.toLocaleTimeString(),
      },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error accepting session:', error);
    return { success: false, error: 'Failed to accept session' };
  }
}

export async function rejectSession(formData: FormData) {
  const sessionId = parseInt(formData.get('sessionId') as string);

  try {
    const [updatedSession] = await db
      .update(sessions)
      .set({ status: 'rejected' })
      .where(eq(sessions.id, sessionId))
      .returning();

    if (!updatedSession) {
      throw new Error('Session not found');
    }

    const [mentor] = await db
      .select()
      .from(users)
      .where(eq(users.id, updatedSession.mentorId));

    // Create a notification
    await db.insert(notifications).values({
      userId: updatedSession.requesterId,
      type: 'session_rejected',
      content: `Your session request has been rejected.`,
    });

    // Send an email
    await sendEmail({
      to: updatedSession.requesterEmail,
      type: 'session_rejected',
      data: {
        mentorName: mentor.name,
      },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error rejecting session:', error);
    return { success: false, error: 'Failed to reject session' };
  }
}

export async function cancelSession(formData: FormData) {
  const sessionId = parseInt(formData.get('sessionId') as string);

  try {
    const [cancelledSession] = await db
      .update(sessions)
      .set({ status: 'cancelled' })
      .where(eq(sessions.id, sessionId))
      .returning();

    if (!cancelledSession) {
      throw new Error('Session not found');
    }

    // Fetch both participants' details
    const [mentor, requester] = await Promise.all([
      db.select().from(users).where(eq(users.id, cancelledSession.mentorId)).limit(1),
      db.select().from(users).where(eq(users.id, cancelledSession.requesterId)).limit(1),
    ]);

    // Create notifications for both participants
    await db.insert(notifications).values([
      {
        userId: cancelledSession.mentorId,
        type: 'session_cancelled',
        content: `The session scheduled for ${cancelledSession.scheduledAt} has been cancelled.`,
      },
      {
        userId: cancelledSession.requesterId,
        type: 'session_cancelled',
        content: `The session scheduled for ${cancelledSession.scheduledAt} has been cancelled.`,
      },
    ]);

    // Send emails to both participants
    await Promise.all([
      sendEmail({
        to: mentor[0].email,
        type: 'session_cancelled',
        data: {
          sessionDate: cancelledSession.scheduledAt!.toLocaleDateString(),
          sessionTime: cancelledSession.scheduledAt!.toLocaleTimeString(),
        },
      }),
      sendEmail({
        to: requester[0].email,
        type: 'session_cancelled',
        data: {
          sessionDate: cancelledSession.scheduledAt!.toLocaleDateString(),
          sessionTime: cancelledSession.scheduledAt!.toLocaleTimeString(),
        },
      }),
    ]);

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error cancelling session:', error);
    return { success: false, error: 'Failed to cancel session' };
  }
}

export async function addSessionNotes(formData: FormData) {
  const sessionId = parseInt(formData.get('sessionId') as string);
  const notes = formData.get('notes') as string;

  try {
    const [updatedSession] = await db
      .update(sessions)
      .set({ notes })
      .where(eq(sessions.id, sessionId))
      .returning();

    if (!updatedSession) {
      throw new Error('Session not found');
    }

    // Create a notification for the requester
    await db.insert(notifications).values({
      userId: updatedSession.requesterId,
      type: 'session_notes_added',
      content: `Notes have been added to your session from ${updatedSession.scheduledAt}.`,
    });

    // Send an email to the requester
    const [requester] = await db
      .select()
      .from(users)
      .where(eq(users.id, updatedSession.requesterId));

    await sendEmail({
      to: requester.email,
      subject: 'Mentorship Session Notes Added',
      body: `Notes have been added to your mentorship session from ${updatedSession.scheduledAt}. Please log in to view them.`,
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error adding session notes:', error);
    return { success: false, error: 'Failed to add session notes' };
  }
}

export async function requestSession(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const mentorId = parseInt(formData.get('mentorId') as string);

  try {
    const [requester] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId));

    if (!requester) {
      throw new Error('Requester not found');
    }

    const [newSession] = await db
      .insert(sessions)
      .values({
        mentorId,
        requesterId: requester.id,
        startupId: requester.startupId,
        status: 'requested',
      })
      .returning();

    // Create a notification for the mentor
    await db.insert(notifications).values({
      userId: mentorId,
      type: 'session_requested',
      content: `${requester.name} has requested a mentorship session.`,
    });

    // Fetch mentor details
    const [mentor] = await db
      .select()
      .from(users)
      .where(eq(users.id, mentorId));

    // Send an email to the mentor
    await sendEmail({
      to: mentor.email,
      type: 'session_requested',
      data: {
        requesterName: requester.name,
        requesterEmail: requester.email,
      },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error requesting session:', error);
    return { success: false, error: 'Failed to request session' };
  }
}

