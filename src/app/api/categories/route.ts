import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category, { ICategory } from '@/models/Category';
import Project from '@/models/Project';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

type CategoryResponse = ICategory & { projectCount?: number };

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';
    const active = searchParams.get('active') === 'true';
    const featured = searchParams.get('featured') === 'true';
    const withProjectCount = searchParams.get('withProjectCount') === 'true';

    const query: Record<string, unknown> = {};
    if (activeOnly || active) {
      query.isActive = true;
    }
    if (featured) {
      query.featuredOnHome = true;
    }

    let categories = (await Category.find(query).sort({ name: 1 }).lean()) as CategoryResponse[];

    if (withProjectCount) {
      categories = await Promise.all(
        categories.map(async (cat) => {
          const projectCount = await Project.countDocuments({
            category: cat.slug,
            published: true,
          });
          return { ...cat, projectCount };
        })
      );
    }

    return NextResponse.json(categories);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
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

    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const slug = body.slug
      ? body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
      : body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

    if (!slug) {
      return NextResponse.json({ error: 'Invalid slug generated from name' }, { status: 400 });
    }

    const existing = await Category.findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: 'A category with this slug already exists' }, { status: 409 });
    }

    const category = await Category.create({
      name: body.name.trim(),
      slug,
      description: body.description?.trim() || '',
      icon: body.icon || '',
      coverImage: body.coverImage || '',
      isActive: body.isActive !== undefined ? body.isActive : true,
      featuredOnHome: body.featuredOnHome === true,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category', details: error instanceof Error ? error.message : String(error) },
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
      return NextResponse.json({ error: 'Category id is required' }, { status: 400 });
    }

    const allowedUpdates = ['name', 'slug', 'description', 'icon', 'coverImage', 'isActive', 'featuredOnHome'];
    const safeUpdates: Record<string, unknown> = {};
    for (const key of allowedUpdates) {
      if (key in updates) {
        safeUpdates[key] = updates[key];
      }
    }

    if (safeUpdates.slug) {
      const slugStr = String(safeUpdates.slug).toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      safeUpdates.slug = slugStr;
      const existing = await Category.findOne({ slug: slugStr, _id: { $ne: id } });
      if (existing) {
        return NextResponse.json({ error: 'Another category with this slug already exists' }, { status: 409 });
      }
    }

    if (safeUpdates.name) {
      safeUpdates.name = String(safeUpdates.name).trim();
    }

    const category = await Category.findByIdAndUpdate(id, safeUpdates, { new: true });
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update category' },
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
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Category id is required' }, { status: 400 });
    }

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const projectCount = await Project.countDocuments({ category: category.slug });
    if (projectCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete: ${projectCount} project(s) are using this category. Reassign or remove them first.` },
        { status: 400 }
      );
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Category deleted' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
