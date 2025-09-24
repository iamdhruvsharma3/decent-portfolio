"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SpotifyData {
  currentlyPlaying?: {
    isPlaying: boolean;
    title: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    songUrl: string;
    progressMs?: number;
    durationMs?: number;
  };
  recentTracks: Array<{
    title: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    songUrl: string;
    playedAt: string;
  }>;
  topArtists: Array<{
    name: string;
    imageUrl: string;
    spotifyUrl: string;
  }>;
  topTracks: Array<{
    title: string;
    artist: string;
    albumImageUrl: string;
    songUrl: string;
  }>;
  profile?: {
    displayName: string;
    profileImage?: string;
    product: string;
  };
}

export function EnhancedMusicBento() {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSpotifyData() {
      try {
        const response = await fetch("/api/spotify");
        if (response.ok) {
          const data = await response.json();
          setSpotifyData(data);
          setError(null);
        } else {
          setError("Failed to load Spotify data");
        }
      } catch {
        setError("Failed to connect to Spotify");
      } finally {
        setLoading(false);
      }
    }

    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = (ms?: number) => {
    if (!ms) return "";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 text-white shadow-xl backdrop-blur-md">
        <div className="animate-pulse flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-4 bg-white/20 rounded mb-2"></div>
            <div className="h-3 bg-white/20 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-green-700 to-black/70 rounded-2xl p-8 text-white text-center shadow-xl backdrop-blur-lg">
        <div className="text-5xl mb-4">🎵</div>
        <h3 className="text-lg font-bold mb-2">Music Vibes</h3>
        <p className="text-sm text-white/80 mb-4">
          Nothing is being played right now!
        </p>
        <div className="text-xs text-white/60">
          Check back later for live Spotify updates
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-700 via-black/70 to-black rounded-2xl p-6 text-white shadow-2xl backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🎶</div>
          <h3 className="text-2xl font-extrabold tracking-tight">
            Spotify Live
          </h3>
        </div>
        {spotifyData?.profile && (
          <div className="text-xs text-white/70 px-3 py-1 rounded-full bg-white/10">
            {spotifyData.profile.product === "premium"
              ? "💎 Premium"
              : "🎵 Free"}
          </div>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Now Playing */}
        <div className="md:col-span-2 lg:col-span-1 relative overflow-hidden rounded-xl shadow-lg group">
          {spotifyData?.currentlyPlaying && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl"
              style={{
                backgroundImage: `url(${spotifyData.currentlyPlaying.albumImageUrl})`,
              }}
            />
          )}
          <div className="relative z-10 bg-black/40 backdrop-blur-xl rounded-xl p-5 h-full">
            <h4 className="text-sm font-semibold mb-3 text-white/80">
              Now Playing
            </h4>
            {spotifyData?.currentlyPlaying ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <Image
                    src={spotifyData.currentlyPlaying.albumImageUrl}
                    alt={spotifyData.currentlyPlaying.album}
                    width={80}
                    height={80}
                    className="rounded-lg shadow-xl lg:w-20 lg:h-20 md:w-16 md:h-16"
                  />
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h5 className="text-base lg:text-lg font-bold truncate">
                      {spotifyData.currentlyPlaying.title}
                    </h5>
                    <p className="text-sm text-white/70">
                      {spotifyData.currentlyPlaying.artist}
                    </p>
                    <p className="text-xs text-white/50">
                      {spotifyData.currentlyPlaying.album}
                    </p>
                  </div>
                </div>

                {/* Status + Progress */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-center">
                    {spotifyData.currentlyPlaying.isPlaying ? (
                      <div className="flex gap-1 -scale-y-100">
                        <span className="w-1.5 h-5 bg-green-400 animate-[pulse_1s_ease-in-out_infinite]" />
                        <span className="w-1.5 h-3 bg-green-400 animate-[pulse_1.2s_ease-in-out_infinite]" />
                        <span className="w-1.5 h-6 bg-green-400 animate-[pulse_0.9s_ease-in-out_infinite]" />
                      </div>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white/60"
                        viewBox="0 0 24 24"
                        fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    )}
                  </div>
                  {spotifyData.currentlyPlaying.progressMs &&
                    spotifyData.currentlyPlaying.durationMs && (
                      <div>
                        <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-green-400 h-1.5 rounded-full transition-all duration-700 ease-linear"
                            style={{
                              width: `${
                                (spotifyData.currentlyPlaying.progressMs /
                                  spotifyData.currentlyPlaying.durationMs) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-white/60 mt-1">
                          <span>
                            {formatDuration(
                              spotifyData.currentlyPlaying.progressMs
                            )}
                          </span>
                          <span>
                            {formatDuration(
                              spotifyData.currentlyPlaying.durationMs
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-center text-white/60">
                <div className="text-4xl mb-2 opacity-70">⏹️</div>
                <p>Nothing playing right now</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Artists */}
        <div className="bg-white/5 rounded-xl p-4 shadow-md backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 text-white/80">
            Top Artists
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3">
            {spotifyData?.topArtists?.slice(0, 6).map((artist, i) => (
              <div
                key={i}
                className="text-center group cursor-pointer hover:scale-105 transition">
                <Image
                  src={artist.imageUrl}
                  alt={artist.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover mx-auto mb-1 shadow-md lg:w-12 lg:h-12"
                />
                <div className="text-xs truncate text-white/70 px-1">
                  {artist.name.split(" ")[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tracks */}
        <div className="bg-white/5 rounded-xl p-4 shadow-md backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 text-white/80">
            Top Tracks
          </h4>
          <div className="space-y-1.5 lg:space-y-2">
            {spotifyData?.topTracks?.slice(0, 5).map((track, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-1.5 lg:p-2 rounded-lg hover:bg-white/10 transition cursor-pointer">
                <span className="text-xs text-white/50 w-4 flex-shrink-0">
                  {i + 1}
                </span>
                <Image
                  src={track.albumImageUrl}
                  alt={track.title}
                  width={28}
                  height={28}
                  className="rounded shadow lg:w-8 lg:h-8 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">
                    {track.title}
                  </div>
                  <div className="text-xs text-white/60 truncate">
                    {track.artist}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Played */}
        <div className="bg-white/5 rounded-xl p-4 shadow-md backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 text-white/80">
            Recently Played
          </h4>
          <div className="space-y-1.5 lg:space-y-2">
            {spotifyData?.recentTracks?.slice(0, 5).map((track, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-1.5 lg:p-2 rounded-lg hover:bg-white/10 transition cursor-pointer">
                <Image
                  src={track.albumImageUrl}
                  alt={track.album}
                  width={28}
                  height={28}
                  className="rounded shadow lg:w-8 lg:h-8 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">
                    {track.title}
                  </div>
                  <div className="text-xs text-white/60 truncate">
                    {track.artist}
                  </div>
                </div>
                <div className="text-xs text-white/40 flex-shrink-0 hidden sm:block">
                  {new Date(track.playedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 mt-6 border-t border-white/10 text-xs text-white/50">
        <span>Live data from Spotify</span>
        <span>
          Updated{" "}
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
