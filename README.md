# Mentorship Platform

A modern web application for managing mentorship programs in startup incubators. Built with Next.js 14, TypeScript, and modern web development practices.

## Features

- 🔐 Authentication with Clerk
- 👥 Role-based access control (Mentor, Founder, Employee)
- 📅 Session scheduling and management
- 👨‍💼 Team management for startups
- 📊 Mentor availability management
- ⚡️ Real-time updates with Server Actions
- 🎨 Beautiful UI with Shadcn UI and Tailwind CSS

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Auth:** Clerk
- **Database:** Neon (Postgres)
- **ORM:** Drizzle
- **Styling:** Tailwind CSS
- **Components:** Shadcn UI
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- PNPM
- PostgreSQL database (we recommend using Neon)
- Clerk account for authentication

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mentorship-app.git
   cd mentorship-app
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Copy the example environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update the environment variables in `.env` with your own values

5. Initialize the database:
   ```bash
   pnpm drizzle-kit push:pg
   ```

6. Start the development server:
   ```bash
   pnpm dev
   ```

7. Visit `http://localhost:3000` to see the application

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── lib/                 # Utility functions and configurations
│   ├── db/             # Database configuration and schema
├── hooks/              # Custom React hooks
└── types/              # TypeScript type definitions
```

## Database Schema

The application uses the following main tables:
- `users`: User profiles with role-based access
- `sessions`: Mentorship session records
- `startups`: Startup company profiles
- `startup_members`: Team member associations
- `mentor_availability`: Mentor schedule management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
