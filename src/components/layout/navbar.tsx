import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role as string | undefined;

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="font-semibold text-lg">
          Mentorship
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <>
              {userRole === "mentor" && (
                <Button variant="ghost" asChild>
                  <Link href="/mentor/dashboard">Dashboard</Link>
                </Button>
              )}
              {(userRole === "founder" || userRole === "employee") && (
                <Button variant="ghost" asChild>
                  <Link href="/startup/dashboard">Dashboard</Link>
                </Button>
              )}
              <Button variant="ghost" asChild>
                <Link href="/sessions">Sessions</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
} 