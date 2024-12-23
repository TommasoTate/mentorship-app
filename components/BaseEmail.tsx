import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface BaseEmailProps {
  previewText: string;
  heading: string;
  children: React.ReactNode;
}

export const BaseEmail: React.FC<BaseEmailProps> = ({
  previewText,
  heading,
  children,
}) => (
  <Html>
    <Head />
    <Preview>{previewText}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{heading}</Heading>
        {children}
        <Text style={footer}>
          © 2023 Mentorship. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0 48px',
  marginBottom: '30px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginTop: '30px',
  padding: '0 48px',
};

