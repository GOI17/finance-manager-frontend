import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate a delay to make caching more apparent
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    message: 'Cache demo data fetched successfully',
    timestamp: Date.now(),
    data: {
      value: Math.random(),
      status: 'success'
    }
  });
}
