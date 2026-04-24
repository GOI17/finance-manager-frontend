import { NextResponse } from 'next/server';
import { getCacheDemoData } from '@/data/cache-demo';

export async function GET() {
  const data = await getCacheDemoData();
  return NextResponse.json(data);
}
