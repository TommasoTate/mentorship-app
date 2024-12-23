import { useState } from 'react';
import { User } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateMentorProfile } from '@/app/actions/mentor-actions';

interface MentorProfileProps {
  user: User;
}

export default function MentorProfile({ user }: MentorProfileProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
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
  );
}

