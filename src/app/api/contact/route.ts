import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Contact } from '@/entities/Contact';

export async function GET() {
  try {
    const ds = await getDataSource();
    const contactRepo = ds.getRepository(Contact);

    const contacts = await contactRepo.find({
      order: { createdAt: 'DESC' },
    });

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const contactRepo = ds.getRepository(Contact);
    const body = await request.json();

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const contact = contactRepo.create({ name, email, subject, message });
    await contactRepo.save(contact);

    return NextResponse.json(
      { message: 'Message sent successfully', contact },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
