import { getMusicSummary } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const musicData = await getMusicSummary();
    
    if (!musicData) {
      return NextResponse.json(
        { error: 'Failed to fetch Spotify data' },
        { status: 500 }
      );
    }

    return NextResponse.json(musicData);
  } catch (error) {
    console.error('Spotify API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const revalidate = 300; // Cache for 5 minutes
