import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { notFound } from "next/navigation";
import ProjectDetails from "@/components/projects/ProjectDetails";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await dbConnect();
  const project = await Project.findById(id).lean();

  if (!project || !project.published) {
    notFound();
  }

  const serialized = {
    ...project,
    _id: project._id.toString(),
  };

  return <ProjectDetails project={serialized} />;
}
