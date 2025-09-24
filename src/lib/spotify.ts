const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

// Get access token using YOUR refresh token (portfolio owner's token)
const getAccessToken = async (): Promise<string> => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  if (!response.ok) {
    console.error('Failed to get Spotify access token:', response.status);
    throw new Error('Failed to get access token');
  }

  const data = await response.json();
  return data.access_token;
};

// Generic Spotify API call using YOUR credentials
const spotifyApi = async (endpoint: string) => {
  try {
    const access_token = await getAccessToken();
    
    const response = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      // Cache for 2 minutes to avoid hitting rate limits but keep data fresh
      next: { revalidate: 120 }
    });

    if (!response.ok) {
      console.error(`Spotify API error for ${endpoint}:`, response.status);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Spotify API call failed:', error);
    return null;
  }
};

// Get currently playing track
export const getCurrentlyPlaying = async () => {
  const data = await spotifyApi('/me/player/currently-playing');
  if (!data || !data.item) return null;

  return {
    isPlaying: data.is_playing,
    title: data.item.name,
    artist: data.item.artists.map((artist: any) => artist.name).join(', '),
    album: data.item.album.name,
    albumImageUrl: data.item.album.images[0]?.url,
    songUrl: data.item.external_urls.spotify,
    previewUrl: data.item.preview_url,
    durationMs: data.item.duration_ms,
    progressMs: data.progress_ms,
    popularity: data.item.popularity,
  };
};

// Get recently played tracks
export const getRecentlyPlayed = async (limit = 10) => {
  const data = await spotifyApi(`/me/player/recently-played?limit=${limit}`);
  if (!data?.items) return [];

  return data.items.map((item: any) => ({
    title: item.track.name,
    artist: item.track.artists.map((artist: any) => artist.name).join(', '),
    album: item.track.album.name,
    albumImageUrl: item.track.album.images[2]?.url || item.track.album.images[0]?.url, // Use smaller image
    songUrl: item.track.external_urls.spotify,
    playedAt: item.played_at,
  }));
};

// Get top artists
export const getTopArtists = async (limit = 10, timeRange = 'medium_term') => {
  const data = await spotifyApi(`/me/top/artists?limit=${limit}&time_range=${timeRange}`);
  if (!data?.items) return [];

  return data.items.map((artist: any) => ({
    name: artist.name,
    genres: artist.genres,
    popularity: artist.popularity,
    followers: artist.followers.total,
    imageUrl: artist.images[2]?.url || artist.images[0]?.url,
    spotifyUrl: artist.external_urls.spotify,
  }));
};

// Get top tracks
export const getTopTracks = async (limit = 10, timeRange = 'medium_term') => {
  const data = await spotifyApi(`/me/top/tracks?limit=${limit}&time_range=${timeRange}`);
  if (!data?.items) return [];

  return data.items.map((track: any) => ({
    title: track.name,
    artist: track.artists.map((artist: any) => artist.name).join(', '),
    album: track.album.name,
    albumImageUrl: track.album.images[2]?.url || track.album.images[0]?.url,
    songUrl: track.external_urls.spotify,
    popularity: track.popularity,
    durationMs: track.duration_ms,
    previewUrl: track.preview_url,
  }));
};

// Get user profile
export const getUserProfile = async () => {
  const data = await spotifyApi('/me');
  if (!data) return null;

  return {
    displayName: data.display_name,
    followers: data.followers?.total || 0,
    profileImage: data.images?.[0]?.url,
    spotifyUrl: data.external_urls?.spotify,
    country: data.country,
    product: data.product, // free/premium
  };
};

// Generate Spotify authorization URL
export const getSpotifyAuthUrl = (baseUrl: string) => {
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
    state: 'spotify-auth',
  });

  return `${SPOTIFY_AUTH_ENDPOINT}?${params.toString()}`;
};

// Create a playlist summary for display
export const getMusicSummary = async () => {
  try {
    const [currentlyPlaying, recentTracks, topArtists, topTracks, profile] = await Promise.all([
      getCurrentlyPlaying(),
      getRecentlyPlayed(5),
      getTopArtists(5, 'short_term'), // Last 4 weeks
      getTopTracks(5, 'short_term'),
      getUserProfile(),
    ]);

    return {
      currentlyPlaying,
      recentTracks,
      topArtists,
      topTracks,
      profile,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Failed to get music summary:', error);
    return null;
  }
};
