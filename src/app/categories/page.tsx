import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Category, { type ICategory } from "@/models/Category";
import Project from "@/models/Project";
import { FolderOpen, ArrowLeft } from "lucide-react";

export const revalidate = 300;

type CategoryDoc = ICategory & { _id: { toString: () => string } };

export default async function CategoriesPage() {
  await dbConnect();

  const categories = await Category.find({ isActive: true }).sort({ name: 1 }).lean<CategoryDoc[]>();

  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat) => {
      const projectCount = await Project.countDocuments({
        category: cat.slug,
        published: true,
      });
      return { ...cat, projectCount };
    })
  );

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white px-4 py-12 dark:from-black dark:via-neutral-950 dark:to-black sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-500/10 dark:text-orange-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Browse by Category
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Explore projects organized by their creative focus
          </p>
        </div>

        {categoriesWithCounts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-800">
            <FolderOpen className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
              No categories available yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesWithCounts.map((cat) => (
              <Link
                key={cat._id}
                href={`/categories/${cat.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg dark:border-white/10 dark:bg-neutral-950"
              >
                {cat.coverImage ? (
                  <div className="relative h-36 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={cat.coverImage}
                      alt={cat.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                ) : (
                  <div className="h-36 w-full bg-gradient-to-br from-orange-500/10 via-neutral-100 to-red-500/10 dark:from-orange-500/5 dark:via-neutral-900 dark:to-red-500/5" />
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-neutral-900 dark:text-white capitalize">
                        {cat.name}
                      </h2>
                      {cat.description && (
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                          {cat.description}
                        </p>
                      )}
                    </div>
                    <FolderOpen className="h-5 w-5 text-orange-500 shrink-0 ml-3" />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-300">
                      {cat.projectCount} {cat.projectCount === 1 ? "project" : "projects"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <Link
            href="/all-projects"
            className="inline-flex items-center rounded-full border border-orange-500/40 bg-orange-500/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600 transition hover:bg-orange-500/20 dark:text-orange-300"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
