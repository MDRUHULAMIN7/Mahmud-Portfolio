import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const project = await Project.findById(id);
    if (!project) {
      console.log(`[API] GET /api/projects/${id} - project not found`);
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    console.log(`[API] GET /api/projects/${id} - project:`, project);
    return NextResponse.json(project);
  } catch (error) {
    console.error(`[API] GET /api/projects/${await params} failed:`, error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
