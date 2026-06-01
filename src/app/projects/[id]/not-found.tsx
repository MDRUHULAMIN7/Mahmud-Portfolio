import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white via-slate-50 to-white dark:from-black dark:via-neutral-950 dark:to-black">
      <div className="text-center px-4">
        <div className="text-7xl font-bold text-neutral-300 dark:text-neutral-700 mb-4">404</div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Project not found</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-6">
          This project may have been removed or the link is incorrect.
        </p>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          ← Back to projects
        </Link>
      </div>
    </div>
  );
}
