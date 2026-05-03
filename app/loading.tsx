/**
<<<<<<< HEAD
 * Global loading skeleton for VoteGuide AI.
=======
 * Global loading skeleton for CivicFlow.
>>>>>>> 07e37ac89f6262a75e08abc35848a720f8e03753
 *
 * Next.js automatically renders this component as an instant loading state
 * while page content is being fetched or rendered server-side.  Using a
 * skeleton instead of a blank screen prevents layout shift and improves
 * perceived performance.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/loading
 */
export default function GlobalLoading() {
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center px-4"
      role="status"
      aria-label="Loading page content"
    >
      <div className="glass-card p-10 text-center max-w-md w-full animate-pulse">
        {/* Icon placeholder */}
        <div className="w-12 h-12 rounded-full bg-white/10 mx-auto mb-4" />
        {/* Title placeholder */}
        <div className="h-6 bg-white/10 rounded-lg w-3/4 mx-auto mb-3" />
        {/* Subtitle placeholder */}
        <div className="h-4 bg-white/5 rounded-lg w-1/2 mx-auto mb-6" />
        {/* Button placeholder */}
        <div className="h-10 bg-white/10 rounded-xl w-40 mx-auto" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
