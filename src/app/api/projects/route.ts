import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get('published') === 'true';

    const query = publishedOnly ? { published: true } : {};
    const projects = await Project.find(query).sort({ createdAt: -1 });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    if (!Array.isArray(body.elementsImages)) {
      body.elementsImages = [];
    }
    if (!body.thumbnailImage && !body.posterImage) {
      return NextResponse.json(
        { error: 'Thumbnail or poster image is required' },
        { status: 400 }
      );
    }
    const project = await Project.create(body);

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Create project failed:", error);
    return NextResponse.json(
      {
        error: 'Failed to create project',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Project id is required' }, { status: 400 });
    }

    const allowedUpdates = [
      'title',
      'description',
      'thumbnailImage',
      'posterImage',
      'accessibleLink',
      'elementsImages',
      'published',
    ];

    const safeUpdates: Record<string, unknown> = {};
    for (const key of allowedUpdates) {
      if (key in updates) {
        safeUpdates[key] = updates[key];
      }
    }

    const current = await Project.findById(id);
    if (!current) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const nextThumbnail =
      safeUpdates.thumbnailImage !== undefined
        ? safeUpdates.thumbnailImage
        : current.thumbnailImage;
    const nextPoster =
      safeUpdates.posterImage !== undefined
        ? safeUpdates.posterImage
        : current.posterImage;

    if (!nextThumbnail && !nextPoster) {
      return NextResponse.json(
        { error: 'Thumbnail or poster image is required' },
        { status: 400 }
      );
    }

    const project = await Project.findByIdAndUpdate(id, safeUpdates, { new: true });

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id, password } = await req.json();

    if (!id || !password) {
      return NextResponse.json(
        { error: 'Project id and password are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 403 });
    }

    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
