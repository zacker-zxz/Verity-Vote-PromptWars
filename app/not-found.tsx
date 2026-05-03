import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Page Not Found — VoteGuide AI",
=======
  title: "Page Not Found — CivicFlow",
>>>>>>> 07e37ac89f6262a75e08abc35848a720f8e03753
  description: "The page you are looking for could not be found.",
};

/**
<<<<<<< HEAD
 * Custom 404 Not Found page for VoteGuide AI.
=======
 * Custom 404 Not Found page for CivicFlow.
>>>>>>> 07e37ac89f6262a75e08abc35848a720f8e03753
 *
 * Next.js renders this component when no route matches the requested URL.
 * A custom 404 keeps users within the branded experience and provides
 * actionable navigation options.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 page-enter">
      <div className="glass-card p-10 text-center max-w-md">
        <div
          className="text-7xl font-bold gradient-text mb-2"
          aria-hidden="true"
        >
          404
        </div>
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-primary px-6 py-2 text-sm"
<<<<<<< HEAD
            aria-label="Go to VoteGuide AI home page"
=======
            aria-label="Go to CivicFlow home page"
>>>>>>> 07e37ac89f6262a75e08abc35848a720f8e03753
          >
            Go Home
          </Link>
          <Link
            href="/faq"
            className="btn-ghost px-6 py-2 text-sm"
            aria-label="Open the FAQ and AI assistant"
          >
            Ask AI Assistant
          </Link>
        </div>
      </div>
    </div>
  );
}
