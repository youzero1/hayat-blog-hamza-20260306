import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Subscriber } from '@/entities/Subscriber';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const ds = await getDataSource();
    const subscriberRepo = ds.getRepository(Subscriber);

    const existing = await subscriberRepo.findOne({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: 'Already subscribed!' });
    }

    await subscriberRepo.save({ email });
    return NextResponse.json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
