export default function LoadingProjectDetails() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white dark:from-black dark:via-neutral-950 dark:to-black">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="h-5 w-28 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>

        <div className="space-y-8">
          <div className="rounded-3xl border border-black/5 bg-white/85 p-6 dark:border-white/10 dark:bg-white/5">
            <div className="h-6 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="mt-4 h-10 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="mt-3 h-5 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="mt-2 h-5 w-2/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>

          <div className="h-105 w-full animate-pulse rounded-3xl border border-black/5 bg-neutral-200 dark:border-white/10 dark:bg-neutral-800" />

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3 rounded-3xl border border-black/5 bg-white/70 p-5 dark:border-white/10 dark:bg-neutral-950">
              <div className="h-6 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-24 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3 rounded-3xl border border-black/5 bg-white/70 p-5 dark:border-white/10 dark:bg-neutral-950">
              <div className="h-6 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-85 animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
