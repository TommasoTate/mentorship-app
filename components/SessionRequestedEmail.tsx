import { BaseEmail } from './BaseEmail';
import { Text, Button } from '@react-email/components';
import * as React from 'react';

interface SessionRequestedEmailProps {
  requesterName: string;
  requesterEmail: string;
}

export const SessionRequestedEmail = ({
  requesterName,
  requesterEmail,
}: SessionRequestedEmailProps) => (
  <BaseEmail
    previewText={`New mentorship session request from ${requesterName}`}
    heading="New Mentorship Session Request"
  >
    <Text style={text}>
      You have received a new mentorship session request from {requesterName} ({requesterEmail}).
    </Text>
    <Text style={text}>
      Please log in to your dashboard to review and respond to this request.
    </Text>
    <Button
      pX={20}
      pY={12}
      style={btn}
      href="https://yourapp.com/dashboard"
    >
      View Request
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

