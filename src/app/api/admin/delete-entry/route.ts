import { NextRequest, NextResponse } from 'next/server';
import { sanityWriteClient } from '@/lib/sanity/client';

export async function DELETE(request: NextRequest) {
  try {
    const { entryId } = await request.json();

    if (!entryId) {
      return NextResponse.json(
        { error: 'Entry ID is required' },
        { status: 400 }
      );
    }

    // Delete the entry
    await sanityWriteClient.delete(entryId);

    return NextResponse.json({ 
      success: true, 
      message: 'Entry deleted successfully' 
    });

  } catch (error: any) {
    console.error('Error deleting entry:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
