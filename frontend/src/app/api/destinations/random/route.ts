import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/destinations/random`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch destination');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching random destination:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destination' },
      { status: 500 }
    );
  }
} 