"use client";

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white via-slate-50 to-white dark:from-black dark:via-neutral-950 dark:to-black">
      <div className="text-center px-4">
        <div className="text-7xl font-bold text-red-300 dark:text-red-700 mb-4">!</div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Something went wrong</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-6">
          Failed to load this project. Please try again.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
