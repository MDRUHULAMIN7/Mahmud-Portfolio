import dbConnect from "@/lib/db";
import Project, { type IProject } from "@/models/Project";
import { notFound } from "next/navigation";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { unstable_cache } from "next/cache";

export const revalidate = 300;

type ProjectDoc = IProject & { _id: { toString: () => string } };

const PROJECT_DETAILS_FIELDS =
  "title description thumbnailImage posterImage elementsImages accessibleLink likes createdAt updatedAt publishDate";

const getProjectById = unstable_cache(
  async (id: string) => {
    await dbConnect();
    try {
      return await Project.findById(id).select(PROJECT_DETAILS_FIELDS).lean<ProjectDoc>();
    } catch {
      return null;
    }
  },
  ["project-by-id"],
  { revalidate: 300, tags: ["projects"] }
);

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const serialized = {
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt?.toString?.() ?? new Date().toISOString(),
    updatedAt: project.updatedAt?.toString?.() ?? new Date().toISOString(),
    publishDate: project.publishDate?.toString?.() ?? new Date().toISOString(),
  };

  return <ProjectDetails project={serialized} />;
}
