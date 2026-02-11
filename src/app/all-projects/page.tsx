import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Project, { type IProject } from "@/models/Project";
import { Heart } from "lucide-react";

export const revalidate = 300;

const PAGE_SIZE = 6;
const MAX_PAGE_BUTTONS = 5;

type ProjectDoc = IProject & { _id: { toString: () => string } };

function getVisiblePages(currentPage: number, totalPages: number) {
  const half = Math.floor(MAX_PAGE_BUTTONS / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + MAX_PAGE_BUTTONS - 1);

  if (end - start + 1 < MAX_PAGE_BUTTONS) {
    start = Math.max(1, end - MAX_PAGE_BUTTONS + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default async function AllProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page || "1"));

  await dbConnect();

  const [projects, total] = await Promise.all([
    Project.find({ published: true })
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean<ProjectDoc[]>(),
    Project.countDocuments({ published: true }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white px-4 py-12 dark:from-black dark:via-neutral-950 dark:to-black sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              All Projects
            </h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Page {page} of {totalPages}
            </p>
          </div>
          <Link
            href="/#projects"
            className="inline-flex items-center rounded-full border border-orange-500/30 px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-500/10 dark:text-orange-300"
          >
            Back
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const projectId = project._id.toString();
            const cover = project.thumbnailImage || project.posterImage;

            return (
              <Link
                key={projectId}
                href={`/projects/${projectId}`}
                className="group relative block overflow-hidden rounded-3xl border border-black/10 bg-white shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10 dark:border-white/10 dark:bg-neutral-950 dark:shadow-black/40"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {cover ? (
                    <Image
                      src={cover}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="space-y-3 p-5">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {project.title}
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="inline-flex items-center gap-2">
                      <Heart className="h-4 w-4 text-orange-500" />
                      {project.likes ?? 0} likes
                    </span>
                    <span className="rounded-full border border-orange-500/20 px-2 py-1 text-[10px] uppercase tracking-[0.25em] text-orange-600 dark:text-orange-300">
                      View Project
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link
            href={page > 1 ? `/all-projects?page=${page - 1}` : "#"}
            aria-disabled={page <= 1}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              page > 1
                ? "border border-orange-500/30 text-orange-600 hover:bg-orange-500/10 dark:text-orange-300"
                : "pointer-events-none border border-neutral-300 text-neutral-400 dark:border-neutral-700 dark:text-neutral-600"
            }`}
          >
            Prev
          </Link>
          <div className="flex items-center gap-2">
            {visiblePages.map((pageNo) => (
              <Link
                key={pageNo}
                href={`/all-projects?page=${pageNo}`}
                aria-current={pageNo === page ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-semibold ${
                  pageNo === page
                    ? "bg-orange-500 text-white"
                    : "border border-orange-500/30 text-orange-600 hover:bg-orange-500/10 dark:text-orange-300"
                }`}
              >
                {pageNo}
              </Link>
            ))}
          </div>
          <Link
            href={page < totalPages ? `/all-projects?page=${page + 1}` : "#"}
            aria-disabled={page >= totalPages}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              page < totalPages
                ? "border border-orange-500/30 text-orange-600 hover:bg-orange-500/10 dark:text-orange-300"
                : "pointer-events-none border border-neutral-300 text-neutral-400 dark:border-neutral-700 dark:text-neutral-600"
            }`}
          >
            Next
          </Link>
        </div>
      </div>
    </main>
  );
}
