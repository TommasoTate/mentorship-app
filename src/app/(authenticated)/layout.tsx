import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { currentUser } from "@clerk/nextjs/server";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-8">{children}</main>
    </div>
  );
} 