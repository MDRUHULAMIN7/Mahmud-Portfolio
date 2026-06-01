import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await dbConnect();

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin user already exists' }, { status: 200 });
    }

    // Create hashed password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create new admin user
    const newUser = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    return NextResponse.json(
      { message: 'Admin user created successfully', user: { id: newUser._id, email: newUser.email, name: newUser.name } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed failed:', error);
    return NextResponse.json(
      { error: 'Failed to seed admin user', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
