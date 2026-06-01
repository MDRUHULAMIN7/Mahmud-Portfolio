import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

export async function POST(req: Request) {
  try {
    await dbConnect();

    // Delete all existing projects
    await Project.deleteMany({});

    return NextResponse.json({ message: 'All projects removed' });
  } catch (error) {
    console.error("Reset projects failed:", error);
    return NextResponse.json(
      {
        error: 'Failed to reset projects',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
