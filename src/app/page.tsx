import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Connect with Expert Mentors
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get guidance from experienced entrepreneurs and industry experts to
              help grow your startup.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Our Platform?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-4">Expert Mentors</h3>
                <p className="text-muted-foreground">
                  Connect with industry veterans who have built successful
                  companies.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-4">
                  Flexible Scheduling
                </h3>
                <p className="text-muted-foreground">
                  Book sessions that fit your schedule with our easy-to-use
                  calendar.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-4">
                  Startup Resources
                </h3>
                <p className="text-muted-foreground">
                  Access valuable resources and tools to help grow your business.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
