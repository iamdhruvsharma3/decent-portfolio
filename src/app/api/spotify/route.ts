import { getMusicSummary } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET() {
  try {
    const musicData = await getMusicSummary();

    if (!musicData) {
      return NextResponse.json(
        { error: 'Failed to fetch Spotify data' },
        {
          status: 500,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          }
        }
      );
    }

    return NextResponse.json(musicData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    });
  } catch (error) {
    console.error('Spotify API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        }
      }
    );
  }
}
