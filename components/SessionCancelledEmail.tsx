import { BaseEmail } from './BaseEmail';
import { Text, Button } from '@react-email/components';
import * as React from 'react';

interface SessionCancelledEmailProps {
  sessionDate: string;
  sessionTime: string;
}

export const SessionCancelledEmail = ({
  sessionDate,
  sessionTime,
}: SessionCancelledEmailProps) => (
  <BaseEmail
    previewText={`Your mentorship session scheduled for ${sessionDate} at ${sessionTime} has been cancelled`}
    heading="Mentorship Session Cancelled"
  >
    <Text style={text}>
      We regret to inform you that the mentorship session scheduled for {sessionDate} at {sessionTime} has been cancelled.
    </Text>
    <Text style={text}>
      If you&apos;re a mentee, we encourage you to request a new session. If you&apos;re a mentor, please check your dashboard for any pending session requests.
    </Text>
    <Button
      pX={20}
      pY={12}
      style={btn}
      href="https://yourapp.com/dashboard"
    >
      Go to Dashboard
    </Button>
  </BaseEmail>
);

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '0 48px',
};

const btn = {
  backgroundColor: '#5469d4',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  margin: '24px 0',
};

