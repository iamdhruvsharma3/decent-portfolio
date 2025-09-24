import { NextRequest, NextResponse } from 'next/server';
import { sanityWriteClient } from '@/lib/sanity/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message, website, location, email } = body;

    // Validate required fields
    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be less than 100 characters' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message must be less than 1000 characters' },
        { status: 400 }
      );
    }

    // Create new guestbook entry in Sanity
    const newEntry = {
      _type: "guestbookEntry",
      name: name.trim(),
      message: message.trim(),
      email: email?.trim() || undefined,
      website: website?.trim() || undefined,
      location: location?.trim() || undefined,
      submittedAt: new Date().toISOString(),
      approved: true, // Auto-approve for demo (change to false for moderation)
      featured: false,
      // Add IP address and user agent for moderation
      ipAddress: request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    console.log('Creating guestbook entry:', { name, message: message.substring(0, 50) + '...' });
    
    const result = await sanityWriteClient.create(newEntry);
    
    console.log('✅ Guestbook entry created:', result._id);

    return NextResponse.json({ 
      success: true, 
      message: 'Guestbook entry created successfully',
      id: result._id 
    });

  } catch (error: unknown) {
    console.error('❌ Error creating guestbook entry:', error);
    
    // Handle specific Sanity errors
    if (error.statusCode === 403) {
      return NextResponse.json(
        { 
          error: 'Permission denied - server configuration issue',
          details: 'The server does not have permission to create guestbook entries'
        },
        { status: 500 }
      );
    }

      return NextResponse.json(
        { 
          error: 'Failed to create guestbook entry',
          details: error instanceof Error ? error.message : 'Unknown error' 
        },
        { status: 500 }
      );
  }
}
