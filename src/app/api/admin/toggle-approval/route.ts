import { NextRequest, NextResponse } from 'next/server';
import { sanityWriteClient } from '@/lib/sanity/client';

export async function POST(request: NextRequest) {
  try {
    const { entryId, approved } = await request.json();

    if (!entryId) {
      return NextResponse.json(
        { error: 'Entry ID is required' },
        { status: 400 }
      );
    }

    // Update the approval status
    await sanityWriteClient
      .patch(entryId)
      .set({ approved })
      .commit();

    return NextResponse.json({ 
      success: true, 
      message: `Entry ${approved ? 'approved' : 'unapproved'} successfully` 
    });

  } catch (error: any) {
    console.error('Error toggling approval:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
