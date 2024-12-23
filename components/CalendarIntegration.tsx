import { User } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateCalendarLink } from '@/app/actions/mentor-actions';

interface CalendarIntegrationProps {
  user: User;
}

export default function CalendarIntegration({ user }: CalendarIntegrationProps) {
  return (
    <Card className="mt-6">
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
  );
}

