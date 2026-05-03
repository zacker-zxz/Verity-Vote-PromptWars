"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
<<<<<<< HEAD
 * Global error boundary for VoteGuide AI.
=======
 * Global error boundary for CivicFlow.
>>>>>>> 07e37ac89f6262a75e08abc35848a720f8e03753
 *
 * Next.js renders this component whenever an unhandled runtime error occurs
 * inside the app directory.  It provides a safe, branded fallback UI instead
 * of a blank screen, and exposes a "Try again" action to reset the error state.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production you would pipe this to your error monitoring service
    // (e.g. Sentry, Datadog) instead of the console.
    if (process.env.NODE_ENV === "development") {
<<<<<<< HEAD
      console.error("[VoteGuide AI] Unhandled error:", error);
=======
      console.error("[CivicFlow] Unhandled error:", error);
>>>>>>> 07e37ac89f6262a75e08abc35848a720f8e03753
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 page-enter">
      <div className="glass-card p-10 text-center max-w-md">
        <div className="text-5xl mb-4" role="img" aria-label="Error">
          ⚠️
        </div>
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-muted text-sm mb-6">
          An unexpected error occurred. Your data is safe — please try again or
          return to the home page.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary px-6 py-2 text-sm"
            aria-label="Try again"
          >
            Try again
          </button>
          <Link
            href="/"
            className="btn-ghost px-6 py-2 text-sm"
            aria-label="Go to home page"
          >
            Go home
          </Link>
        </div>
        {error.digest && (
          <p className="text-xs text-muted mt-4">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
