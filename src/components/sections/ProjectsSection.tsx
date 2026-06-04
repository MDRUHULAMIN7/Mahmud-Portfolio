import dbConnect from "@/lib/db";
import Project, { type IProject } from "@/models/Project";
import ProjectsSectionClient from "./ProjectsSectionClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProjectDoc = Omit<IProject, "_id"> & {
  _id: { toString: () => string };
};

export default async function ProjectsSection() {
  await dbConnect();

  const projects = await Project.find({ published: true, isFeatured: true })
    .sort({ createdAt: -1 })
    .lean<ProjectDoc[]>();

  const serializedProjects = projects.map((project) => ({
    ...project,
    _id: project._id.toString(),
  }));

  return <ProjectsSectionClient projects={serializedProjects} />;
}
