import dbConnect from "@/lib/db";
import Project, { type IProject } from "@/models/Project";
import ProjectDetails from "@/components/projects/ProjectDetails";
import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";
import { notFound } from "next/navigation";
import { isValidObjectId } from "mongoose";

export const revalidate = 300;

type ProjectDoc = IProject & { _id: { toString: () => string } };

const PROJECT_DETAILS_FIELDS =
  "title description category thumbnailImage posterImage cover images highlights elementsImages accessibleLink authorName likes views createdAt updatedAt publishDate published";

function serializeProject(project: ProjectDoc) {
  return {
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt?.toString?.() ?? new Date().toISOString(),
    updatedAt: project.updatedAt?.toString?.() ?? new Date().toISOString(),
    publishDate: project.publishDate?.toString?.() ?? new Date().toISOString(),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isValidObjectId(id)) {
    notFound();
  }

  await dbConnect();

  const project = await Project.findById(id)
    .select(PROJECT_DETAILS_FIELDS)
    .lean<ProjectDoc>();

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <ProjectDetails project={serializeProject(project)} />
      <Footer />
    </>
  );
}
