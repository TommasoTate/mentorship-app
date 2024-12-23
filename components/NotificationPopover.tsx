'use client'
import { markNotificationAsRead } from "@/app/actions/notification-actions";
import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Notification } from "@/db/schema";

export default function NotificationPopover({
  userNotifications,
  unreadCount
}: {
  userNotifications: Notification[];
  unreadCount: number;
}) {
    return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                {userNotifications.length === 0 ? (
                  <p className="text-center text-gray-500">No notifications</p>
                ) : (
                  <ul className="space-y-2">
                    {userNotifications.map((notification) => (
                      <li key={notification.id} className="flex items-center justify-between">
                        <span className={notification.isRead ? 'text-gray-500' : 'font-bold'}>
                          {notification.content}
                        </span>
                        {!notification.isRead && (
                            <Button 
                              onClick={() => markNotificationAsRead(notification.id)} 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                            >
                              Mark as read
                            </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      );
}