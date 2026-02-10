import dbConnect from "@/lib/db";
import Project, { type IProject } from "@/models/Project";
import { notFound } from "next/navigation";
import ProjectDetails from "@/components/projects/ProjectDetails";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await dbConnect();
  let project: (IProject & { _id: { toString: () => string } }) | null = null;
  try {
    project = await Project.findById(id).lean<IProject & { _id: { toString: () => string } }>();
  } catch {
    project = null;
  }

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
