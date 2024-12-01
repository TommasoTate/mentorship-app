"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignUpPage() {
  const { resolvedTheme } = useTheme();
  console.log(resolvedTheme);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp
        appearance={{
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
          elements: {
            rootBox: "mx-auto",
            card: "bg-card",
          },
        }}
      />
    </div>
  );
} 