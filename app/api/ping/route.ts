import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Keep database connection warm
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Ping API error:', error);
    return NextResponse.json(
      { ok: false, error: 'Database ping failed' },
      { status: 500 }
    );
  }
}
