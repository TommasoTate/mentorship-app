import { useState } from 'react';
import { User } from '@/db/schema';
import StartupProfile from './StartupProfile';
import EmployeeManagement from './EmployeeManagement';
import MentorList from '@/app/components/MentorList';
import UpcomingSessions from './UpcomingSessions';
import PastSessions from './PastSessions';

interface FounderDashboardProps {
  user: User;
}

export default function FounderDashboard({ user }: FounderDashboardProps) {
  const [activeTab, setActiveTab] = useState('startup');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>
      <div className="flex mb-4">
        <button
          className={`mr-4 ${activeTab === 'startup' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('startup')}
        >
          Startup Profile
        </button>
        <button
          className={`mr-4 ${activeTab === 'employees' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('employees')}
        >
          Manage Employees
        </button>
        <button
          className={`mr-4 ${activeTab === 'mentors' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('mentors')}
        >
          Browse Mentors
        </button>
        <button
          className={`mr-4 ${activeTab === 'upcoming' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Sessions
        </button>
        <button
          className={`${activeTab === 'past' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past Sessions
        </button>
      </div>
      {activeTab === 'startup' && <StartupProfile startupId={user.startupId} />}
      {activeTab === 'employees' && <EmployeeManagement startupId={user.startupId} />}
      {activeTab === 'mentors' && <MentorList />}
      {activeTab === 'upcoming' && <UpcomingSessions userId={user.id} userRole="founder" />}
      {activeTab === 'past' && <PastSessions userId={user.id} userRole="founder" />}
    </div>
  );
}

