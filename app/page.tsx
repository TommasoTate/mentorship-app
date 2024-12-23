import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Mentorship</h1>
      {userId ? (
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Go to Dashboard
        </Link>
      ) : (
        <Link href="/sign-in" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      )}
    </main>
  )
}

