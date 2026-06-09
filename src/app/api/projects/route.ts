import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
const getDefaultViews = () => Math.floor(Math.random() * 501) + 1000;


export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get('published') === 'true';
    const featured = searchParams.get('featured') === 'true';
    const category = searchParams.get('category');
    const withMeta = searchParams.get('withMeta') === 'true';
    const countOnly = searchParams.get('countOnly') === 'true';
    const fields = searchParams.get('fields')?.trim();
    const page = Math.max(1, Number(searchParams.get('page') || '1'));
    const limitParam = Number(searchParams.get('limit') || '0');
    const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 50) : 0;

    const query: Record<string, unknown> = {};
    if (publishedOnly) {
      query.published = true;
    }
    if (featured) {
      query.isFeatured = true;
    }
    if (category) {
      query.category = category;
    }

    if (countOnly) {
      const total = await Project.countDocuments(query);
      return NextResponse.json({ total });
    }

    const cursor = Project.find(query).sort({ createdAt: -1 });
    if (fields) {
      cursor.select(fields);
    }

    if (limit > 0) {
      cursor.skip((page - 1) * limit).limit(limit);
    }

    const projects = await cursor;

    if (!withMeta) {
      return NextResponse.json(projects);
    }

    const total = await Project.countDocuments(query);
    const totalPages = limit > 0 ? Math.max(1, Math.ceil(total / limit)) : 1;

    return NextResponse.json({
      projects,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!Array.isArray(body.elementsImages)) {
      body.elementsImages = [];
    }
    // Handle reference fields (cover, images, highlights)
    if (body.cover && !body.thumbnailImage) {
      body.thumbnailImage = body.cover;
    }
    if (typeof body.youtubeVideoLink === 'string') {
      body.youtubeVideoLink = body.youtubeVideoLink.trim();
    }
    if (body.images && !Array.isArray(body.images)) {
      try {
        body.images = body.images.split('\n').map((s: string) => s.trim()).filter(Boolean);
      } catch {
        body.images = [];
      }
    }
    if (body.highlights && !Array.isArray(body.highlights)) {
      try {
        body.highlights = body.highlights.split('\n').map((s: string) => s.trim()).filter(Boolean);
      } catch {
        body.highlights = [];
      }
    }
    if (body.posterImage && !body.images?.length) {
      body.images = [body.posterImage];
    }
    // For reference compatibility, we don't require thumbnail/poster
    const project = await Project.create({
      ...body,
      published: true, // Reference projects are always published
      likes: Number.isFinite(Number(body.likes)) ? Number(body.likes) : 252,
      views: Number.isFinite(Number(body.views)) ? Number(body.views) : getDefaultViews(),
      isFeatured: body.isFeatured === true || body.isFeatured === 'true' || body.featured === true || body.featured === 'true',
    });

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
    await dbConnect();
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Project id is required' }, { status: 400 });
    }

    const allowedUpdates = [
      'title',
      'description',
      'category',
      'thumbnailImage',
      'posterImage',
      'accessibleLink',
      'youtubeVideoLink',
      'elementsImages',
      'published',
      'cover',
      'images',
      'highlights',
      'isFeatured',
      'featured',
    ];

    const safeUpdates: Record<string, unknown> = {};
    for (const key of allowedUpdates) {
      if (key in updates) {
        safeUpdates[key] = updates[key];
      }
    }

    // Handle reference fields (cover, images, highlights)
    if (safeUpdates.cover && !safeUpdates.thumbnailImage) {
      safeUpdates.thumbnailImage = safeUpdates.cover;
    }
    if (typeof safeUpdates.youtubeVideoLink === 'string') {
      safeUpdates.youtubeVideoLink = safeUpdates.youtubeVideoLink.trim();
    }
    if (safeUpdates.images && !Array.isArray(safeUpdates.images)) {
      try {
        safeUpdates.images = (safeUpdates.images as string).split('\n').map((s: string) => s.trim()).filter(Boolean);
      } catch {
        safeUpdates.images = [];
      }
    }
    if (typeof safeUpdates.isFeatured === 'string') {
      safeUpdates.isFeatured = safeUpdates.isFeatured === 'true';
    }
    if (typeof safeUpdates.featured === 'string') {
      safeUpdates.isFeatured = safeUpdates.featured === 'true';
    } else if (typeof safeUpdates.featured === 'boolean') {
      safeUpdates.isFeatured = safeUpdates.featured;
    }
    delete safeUpdates.featured; // Remove the form field name
    if (safeUpdates.highlights && !Array.isArray(safeUpdates.highlights)) {
      try {
        safeUpdates.highlights = (safeUpdates.highlights as string).split('\n').map((s: string) => s.trim()).filter(Boolean);
      } catch {
        safeUpdates.highlights = [];
      }
    }

    const current = await Project.findById(id);
    if (!current) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const project = await Project.findByIdAndUpdate(id, safeUpdates, { new: true });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Project id is required' },
        { status: 400 }
      );
    }

    // For reference compatibility, skip password check
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Project deleted' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
