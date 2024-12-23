import { Resend } from 'resend';
import { render } from '@react-email/render';
import { SessionAcceptedEmail } from '@/components/SessionAcceptedEmail';
import { SessionRejectedEmail } from '@/components/SessionRejectedEmail';
import { SessionCancelledEmail } from '@/components/SessionCancelledEmail';
import { SessionRequestedEmail } from '@/components/SessionRequestedEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SessionAcceptedEmailProps {
  mentorName: string;
  sessionDate: string;
  sessionTime: string;
}

interface SessionRejectedEmailProps {
  mentorName: string;
}

interface SessionCancelledEmailProps {
  sessionDate: string;
  sessionTime: string;
}

interface SessionRequestedEmailProps {
  requesterName: string;
  requesterEmail: string;
}

type EmailData = 
  | { type: 'session_accepted'; data: SessionAcceptedEmailProps }
  | { type: 'session_rejected'; data: SessionRejectedEmailProps }
  | { type: 'session_cancelled'; data: SessionCancelledEmailProps }
  | { type: 'session_requested'; data: SessionRequestedEmailProps };

export async function sendEmail({ to, type, data }: { to: string } & EmailData) {
  try {
    let subject: string;
    let html: string;

    switch (type) {
      case 'session_accepted': {
        subject = 'Mentorship Session Accepted';
        html = await render(SessionAcceptedEmail(data as SessionAcceptedEmailProps));
        break;
      }
      case 'session_rejected': {
        subject = 'Mentorship Session Rejected';
        html = await render(SessionRejectedEmail(data as SessionRejectedEmailProps));
        break;
      }
      case 'session_cancelled': {
        subject = 'Mentorship Session Cancelled';
        html = await render(SessionCancelledEmail(data as SessionCancelledEmailProps));
        break;
      }
      case 'session_requested': {
        subject = 'New Mentorship Session Request';
        html = await render(SessionRequestedEmail(data as SessionRequestedEmailProps));
        break;
      }
      default:
        throw new Error('Invalid email type');
    }

    const result = await resend.emails.send({
      from: 'Mentorship <noreply@yourdomain.com>',
      to,
      subject,
      html,
    });

    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

