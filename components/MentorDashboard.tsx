import { useState } from 'react';
import { User, Session } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateMentorProfile, updateCalendarLink } from '@/app/actions/mentor-actions';
import SessionRequests from './SessionRequests';
import UpcomingSessions from './UpcomingSessions';
import PastSessions from './PastSessions';

interface MentorDashboardProps {
  user: User;
  pendingRequests: Session[];
  upcomingSessions: Session[];
  pastSessions: Session[];
}

export default function MentorDashboard({ user, pendingRequests, upcomingSessions, pastSessions }: MentorDashboardProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>
      <div className="flex mb-4 space-x-4">
        <Button
          onClick={() => setActiveTab('profile')}
          variant={activeTab === 'profile' ? 'default' : 'outline'}
        >
          Profile
        </Button>
        <Button
          onClick={() => setActiveTab('requests')}
          variant={activeTab === 'requests' ? 'default' : 'outline'}
        >
          Session Requests
        </Button>
        <Button
          onClick={() => setActiveTab('upcoming')}
          variant={activeTab === 'upcoming' ? 'default' : 'outline'}
        >
          Upcoming Sessions
        </Button>
        <Button
          onClick={() => setActiveTab('past')}
          variant={activeTab === 'past' ? 'default' : 'outline'}
        >
          Past Sessions
        </Button>
      </div>

      {activeTab === 'profile' && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Profile
                <Button onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form action={updateMentorProfile}>
                  <input type="hidden" name="userId" value={user.id} />
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                      <Input type="text" id="name" name="name" defaultValue={user.name} required />
                    </div>
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                      <Textarea id="bio" name="bio" defaultValue={user.bio || ''} rows={3} />
                    </div>
                    <div>
                      <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">Expertise</label>
                      <Input type="text" id="expertise" name="expertise" defaultValue={user.expertise || ''} />
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Bio:</strong> {user.bio || 'No bio provided'}</p>
                  <p><strong>Expertise:</strong> {user.expertise || 'Not specified'}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendar Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={updateCalendarLink} className="space-y-4">
                <input type="hidden" name="userId" value={user.id} />
                <div>
                  <label htmlFor="calendarLink" className="block text-sm font-medium text-gray-700">
                    Calendar Link (e.g., Calendly, Cal.com)
                  </label>
                  <Input 
                    type="url" 
                    id="calendarLink" 
                    name="calendarLink" 
                    defaultValue={user.calendarLink || ''} 
                    placeholder="https://calendly.com/your-link"
                  />
                </div>
                <Button type="submit">Update Calendar Link</Button>
              </form>
              {user.calendarLink && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Your current calendar link:</p>
                  <a href={user.calendarLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {user.calendarLink}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'requests' && <SessionRequests requests={pendingRequests} />}
      {activeTab === 'upcoming' && <UpcomingSessions sessions={upcomingSessions} />}
      {activeTab === 'past' && <PastSessions sessions={pastSessions} />}
    </div>
  );
}

