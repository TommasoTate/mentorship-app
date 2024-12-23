import { BaseEmail } from './BaseEmail';
import { Text, Button } from '@react-email/components';
import * as React from 'react';

interface SessionAcceptedEmailProps {
  mentorName: string;
  sessionDate: string;
  sessionTime: string;
}

export const SessionAcceptedEmail = ({
  mentorName,
  sessionDate,
  sessionTime,
}: SessionAcceptedEmailProps) => (
  <BaseEmail
    previewText={`Your mentorship session with ${mentorName} has been accepted`}
    heading="Mentorship Session Accepted"
  >
    <Text style={text}>
      Great news! Your mentorship session with {mentorName} has been accepted.
    </Text>
    <Text style={text}>
      The session is scheduled for {sessionDate} at {sessionTime}.
    </Text>
    <Button
      pX={20}
      pY={12}
      style={btn}
      href="https://yourapp.com/dashboard"
    >
      View Session Details
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

