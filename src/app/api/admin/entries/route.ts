import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

export async function GET() {
  try {
    // Query ALL guestbook entries with full details
    const allEntries = await sanityClient.fetch(`
      *[_type == "guestbookEntry"] | order(submittedAt desc) {
        _id,
        name,
        message,
        email,
        website,
        location,
        submittedAt,
        approved,
        featured,
        ipAddress,
        userAgent
      }
    `);

    const approvedCount = allEntries.filter(entry => entry.approved).length;
    const unapprovedCount = allEntries.filter(entry => !entry.approved).length;

    return NextResponse.json({
      summary: {
        total: allEntries.length,
        approved: approvedCount,
        needingApproval: unapprovedCount
      },
      entries: allEntries.map(entry => ({
        id: entry._id,
        name: entry.name,
        message: entry.message.substring(0, 100) + (entry.message.length > 100 ? '...' : ''),
        email: entry.email,
        location: entry.location,
        website: entry.website,
        submittedAt: new Date(entry.submittedAt).toLocaleString(),
        approved: entry.approved,
        featured: entry.featured,
        ipAddress: entry.ipAddress
      })),
      studioLinks: {
        local: "http://localhost:3333",
        online: `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.sanity.studio`
      }
    });

  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}
