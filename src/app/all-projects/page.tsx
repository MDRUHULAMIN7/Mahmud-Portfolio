import dbConnect from "@/lib/db";
import Project, { type IProject } from "@/models/Project";

import ProjectCard from "@/components/ProjectCard";
import { TopNavigation,  PaginationNav } from "@/components/AllProjectsNavigation";

export const revalidate = 300;

const PAGE_SIZE = 20;
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
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page || "1"));
  const categoryFilter = params.category;

  await dbConnect();

  const query: Record<string, unknown> = { published: true };
  if (categoryFilter) {
    query.category = categoryFilter;
  }

  const [projects, total] = await Promise.all([
    Project.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean<ProjectDoc[]>(),
    Project.countDocuments(query),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const visiblePages = getVisiblePages(page, totalPages);

  const serializedProjects = projects.map((project) => ({
    ...project,
    _id: project._id.toString(),
  }));



  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text)', marginBottom: '8px' }}>
              All Projects
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
              Page {page} of {totalPages} ({total} {total === 1 ? "project" : "projects"})
            </p>
          </div>
          <TopNavigation />
        </div>


        <div className="projects" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          {serializedProjects.length > 0 ? (
            serializedProjects.map((project) => (
              <ProjectCard
                key={project._id}
                _id={project._id}
                title={project.title}
                category={project.category}
                thumbnailImage={project.thumbnailImage}
                posterImage={project.posterImage}
                isFeatured={project.isFeatured}
                showAnimation={false}
              />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
              <p>No projects found</p>
            </div>
          )}
        </div>

        <PaginationNav page={page} totalPages={totalPages} categoryFilter={categoryFilter} visiblePages={visiblePages} />
      </div>
    </main>
  );
}
