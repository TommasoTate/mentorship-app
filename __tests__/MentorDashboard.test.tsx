import { render, screen, fireEvent } from '@testing-library/react'
import MentorDashboard from '@/components/MentorDashboard'
import { User, Session } from '@/db/schema'

// Mock data
const mockUser: User = {
  id: 1,
  clerkId: 'clerk_123',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'mentor',
  bio: 'Experienced mentor',
  expertise: 'Web Development',
  calendarLink: 'https://calendly.com/johndoe',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockSessions: Session[] = [
  {
    id: 1,
    mentorId: 1,
    requesterId: 2,
    startupId: 1,
    status: 'requested',
    scheduledAt: new Date(),
    agenda: 'Discuss project roadmap',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more mock sessions as needed
]

describe('MentorDashboard', () => {
  it('renders mentor profile information', () => {
    render(
      <MentorDashboard
        user={mockUser}
        pendingRequests={[]}
        upcomingSessions={[]}
        pastSessions={[]}
      />
    )

    expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument()
    expect(screen.getByText('Experienced mentor')).toBeInTheDocument()
    expect(screen.getByText('Web Development')).toBeInTheDocument()
  })

  it('switches between tabs', () => {
    render(
      <MentorDashboard
        user={mockUser}
        pendingRequests={mockSessions}
        upcomingSessions={[]}
        pastSessions={[]}
      />
    )

    fireEvent.click(screen.getByText('Session Requests'))
    expect(screen.getByText('Discuss project roadmap')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Upcoming Sessions'))
    expect(screen.getByText('No upcoming sessions scheduled.')).toBeInTheDocument()
  })

  // Add more tests for other functionality
})

