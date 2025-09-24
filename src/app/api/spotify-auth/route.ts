import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  
  if (!client_id) {
    return NextResponse.json(
      { error: 'Spotify client ID not configured' },
      { status: 500 }
    );
  }

  // Get the correct base URL (prioritize ngrok URL from headers)
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = forwardedHost ? `${forwardedProto}://${forwardedHost}` : request.nextUrl.origin;

  const redirect_uri = `${baseUrl}/api/auth/callback/spotify`;
  const scope = [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-top-read',
    'user-read-private',
  ].join(' ');

  const params = new URLSearchParams({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
    state: 'spotify-auth', // Optional: for security
  });

  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  
  return NextResponse.redirect(authUrl);
}
