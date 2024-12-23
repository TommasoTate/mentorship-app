import { BaseEmail } from './BaseEmail';
import { Text, Button } from '@react-email/components';
import * as React from 'react';

interface SessionRejectedEmailProps {
  mentorName: string;
}

export const SessionRejectedEmail = ({
  mentorName,
}: SessionRejectedEmailProps) => (
  <BaseEmail
    previewText={`Your mentorship session request with ${mentorName} has been rejected`}
    heading="Mentorship Session Request Rejected"
  >
    <Text style={text}>
      We&apos;re sorry to inform you that your mentorship session request with {mentorName} has been rejected.
    </Text>
    <Text style={text}>
      Don&apos;t worry, there are many other mentors available. We encourage you to browse our mentor list and request a session with another mentor.
    </Text>
    <Button
      pX={20}
      pY={12}
      style={btn}
      href="https://yourapp.com/dashboard/mentors"
    >
      Browse Mentors
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

