import { NextRequest, NextResponse } from 'next/server';

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // Get the correct base URL (prioritize ngrok URL from headers)
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = forwardedHost ? `${forwardedProto}://${forwardedHost}` : request.nextUrl.origin;

  if (error) {
    console.error('Spotify OAuth error:', error);
    return NextResponse.redirect(new URL(`${baseUrl}/?error=spotify_auth_failed`));
  }

  if (!code) {
    console.error('No authorization code received from Spotify');
    return NextResponse.redirect(new URL(`${baseUrl}/?error=no_auth_code`));
  }

  try {
    const client_id = process.env.SPOTIFY_CLIENT_ID!;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
    const redirect_uri = `${baseUrl}/api/auth/callback/spotify`;

    // Exchange authorization code for tokens
    const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Token exchange failed:', errorData);
      return NextResponse.redirect(new URL(`${baseUrl}/?error=token_exchange_failed`));
    }

    const tokenData = await response.json();
    const { access_token, refresh_token, expires_in } = tokenData;

    // Log the refresh token (you'll need to save this to your environment variables)
    console.log('=== SPOTIFY TOKENS ===');
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);
    console.log('Expires in:', expires_in, 'seconds');
    console.log('=== SAVE THE REFRESH TOKEN TO YOUR .env.local FILE ===');

    // Redirect to success page with tokens (in a real app, you'd save these securely)
    const successUrl = new URL(`${baseUrl}/spotify-success`);
    successUrl.searchParams.set('refresh_token', refresh_token);
    
    return NextResponse.redirect(successUrl);
  } catch (error) {
    console.error('Spotify callback error:', error);
    return NextResponse.redirect(new URL(`${baseUrl}/?error=callback_failed`));
  }
}
