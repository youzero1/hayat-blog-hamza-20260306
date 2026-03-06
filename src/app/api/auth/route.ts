import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === adminPassword) {
      return NextResponse.json({ success: true, message: 'Authentication successful' });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('POST /api/auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
