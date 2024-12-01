import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-8">{children}</main>
    </div>
  );
} 