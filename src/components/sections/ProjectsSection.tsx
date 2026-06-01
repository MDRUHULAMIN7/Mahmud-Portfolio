import dbConnect from "@/lib/db";
import Project, { type IProject } from "@/models/Project";
import ProjectsSectionClient from "./ProjectsSectionClient";

type ProjectDoc = Omit<IProject, "_id"> & {
  _id: { toString: () => string };
};

export default async function ProjectsSection() {
  await dbConnect();

  const projects = await Project.find({ published: true })
    .sort({ createdAt: -1 })
    .limit(30)
    .lean<ProjectDoc[]>();

  const serializedProjects = projects.map((project) => ({
    ...project,
    _id: project._id.toString(),
  }));

  return <ProjectsSectionClient projects={serializedProjects} />;
}
