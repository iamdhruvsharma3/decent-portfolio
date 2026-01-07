"use client";

import { useEffect, useRef, useState } from "react";
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

/**
 * MarqueeText
 * - detects overflow and only scrolls when necessary
 * - duplicates the text inside the scroller for smooth continuous motion
 * - adaptive duration depending on text length
 */
function MarqueeText({
  children,
  className = "",
  baseSpeed = 12, // lower => faster (seconds per 100 chars roughly)
}: {
  children: React.ReactNode;
  className?: string;
  baseSpeed?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [scrolling, setScrolling] = useState(false);
  const [duration, setDuration] = useState(10);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const measure = () => {
      // If actual content width is larger than container, enable marquee
      const containerW = container.getBoundingClientRect().width;
      const contentW = content.scrollWidth;
      const isOverflow = contentW > containerW + 2; // small padding tolerance
      setScrolling(isOverflow);

      // compute duration: longer content -> longer duration
      // baseSpeed is seconds per 100 chars roughly, tune to taste
      const text = content.textContent || "";
      const len = Math.max(1, text.length);
      // formula to derive seconds: proportional to length and width ratio
      const scale = Math.max(1, contentW / Math.max(1, containerW));
      const computed = Math.max(6, Math.round((len / 30) * baseSpeed * scale));
      setDuration(computed);
    };

    measure();

    // Re-measure on resize
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    ro.observe(content);

    // Also re-run after fonts/images load
    const onLoad = () => measure();
    window.addEventListener("load", onLoad);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", onLoad);
    };
  }, [children, baseSpeed]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap relative ${className}`}
      aria-hidden={false}>
      {!scrolling ? (
        // simple static single-line
        <div
          ref={contentRef}
          className="inline-block align-middle min-w-0"
          style={{ willChange: "transform" }}>
          {children}
        </div>
      ) : (
        // duplicated content scroller
        <div
          className="flex gap-8 items-center will-change-transform"
          style={
            {
              // use CSS variable so keyframes can read --marquee-duration
              // We'll apply animation to this inner wrapper via inline style below
            }
          }>
          <div
            ref={contentRef}
            className="inline-block flex-shrink-0"
            style={
              {
                // animation applied to wrapper below (we wrap again)
              }
            }>
            {/* Animated wrapper */}
            <div
              className="marquee-track inline-flex items-center"
              style={{
                animation: `marquee ${duration}s linear infinite`,
              }}>
              <div className="inline-block mr-8">{children}</div>
              <div className="inline-block mr-8">{children}</div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* ensure the duplicated block sits inline and repeats smoothly */
        .marquee-track > div {
          /* width auto, content duplicated ensures continuity */
        }
      `}</style>
    </div>
  );
}

export function EnhancedMusicBento() {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSpotifyData() {
      try {
        const response = await fetch(`/api/spotify?t=${Date.now()}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
          cache: 'no-store',
        });
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

  // wrapper class ensures blobs are behind content
  if (loading) {
    return (
      <div className="relative">
        {/* animated blobs behind */}
        <BackgroundBlobs />
        <div className="relative z-10 bg-gradient-to-br from-emerald-600 to-black/70 rounded-3xl p-8 text-white shadow-2xl backdrop-blur-xl animate-pulse min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎶</div>
              <div className="h-8 bg-white/20 rounded w-32"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="md:col-span-2 lg:col-span-1 rounded-2xl bg-black/20 p-6 min-h-[280px]">
              <div className="h-4 bg-white/20 rounded mb-4 w-24"></div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 bg-white/20 rounded-xl"></div>
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-white/20 rounded"></div>
                  <div className="h-3 bg-white/20 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-black/20 p-6 min-h-[280px]">
              <div className="h-4 bg-white/20 rounded mb-4 w-20"></div>
              <div className="space-y-3">
                <div className="h-3 bg-white/20 rounded"></div>
                <div className="h-3 bg-white/20 rounded w-3/4"></div>
                <div className="h-3 bg-white/20 rounded w-1/2"></div>
              </div>
            </div>
            <div className="rounded-2xl bg-black/20 p-6 min-h-[280px]">
              <div className="h-4 bg-white/20 rounded mb-4 w-16"></div>
              <div className="space-y-2">
                <div className="h-8 bg-white/20 rounded"></div>
                <div className="h-4 bg-white/20 rounded w-4/5"></div>
              </div>
            </div>
            <div className="rounded-2xl bg-black/20 p-6 min-h-[280px]">
              <div className="h-4 bg-white/20 rounded mb-4 w-20"></div>
              <div className="space-y-2">
                <div className="h-6 bg-white/20 rounded"></div>
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative">
        <BackgroundBlobs />
        <div className="relative z-10 bg-gradient-to-br from-emerald-700 to-black rounded-3xl p-8 text-white shadow-2xl backdrop-blur-lg border border-white/10 min-h-[400px] flex flex-col justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">🎵</div>
            <h3 className="text-lg font-bold mb-2">Music Vibes</h3>
            <p className="text-sm text-white/80 mb-4">
              Nothing is being played right now!
            </p>
            <div className="text-xs text-white/60">
              Check back later for live Spotify updates
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background floating blurred blobs */}
      <BackgroundBlobs />

      <div className="relative z-10 bg-gradient-to-br from-emerald-700 via-black/80 to-black rounded-3xl p-8 text-white shadow-2xl backdrop-blur-2xl border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="text-4xl animate-bounce">🎶</div>
            <h3 className="text-3xl font-extrabold tracking-tight drop-shadow-lg">
              Spotify Live
            </h3>
          </div>
          {spotifyData?.profile && (
            <div className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-emerald-400/30 to-purple-400/30 border border-white/20 shadow-md">
              {spotifyData.profile.product === "premium"
                ? "💎 Premium"
                : "🎵 Free"}
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Now Playing */}
          <div className="md:col-span-2 lg:col-span-1 relative overflow-hidden rounded-2xl shadow-xl group">
            {spotifyData?.currentlyPlaying && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 blur-2xl scale-110"
                style={{
                  backgroundImage: `url(${spotifyData.currentlyPlaying.albumImageUrl})`,
                }}
              />
            )}
            <div className="relative z-10 bg-black/40 backdrop-blur-xl rounded-2xl p-6 h-full flex flex-col justify-between">
              <h4 className="text-sm font-semibold mb-4 text-white/70 tracking-wide uppercase">
                Now Playing
              </h4>

              {spotifyData?.currentlyPlaying ? (
                <div className="space-y-4">
                  {/* Album + Info */}
                  <div className="flex flex-col items-center gap-3">
                    <Image
                      src={spotifyData.currentlyPlaying.albumImageUrl}
                      alt={spotifyData.currentlyPlaying.album}
                      width={100}
                      height={100}
                      className="rounded-xl shadow-2xl ring-2 ring-emerald-400/40"
                    />
                    <div className="flex-1 min-w-0 text-center space-y-1">
                      <h5 className="text-lg font-bold">
                        <MarqueeText
                          className="max-w-[14rem] mx-auto text-ellipsis"
                          baseSpeed={6}>
                          {spotifyData.currentlyPlaying.title}
                        </MarqueeText>
                      </h5>
                      <p className="text-sm text-emerald-300">
                        <MarqueeText
                          className="max-w-[12rem] mx-auto text-ellipsis"
                          baseSpeed={6}>
                          {spotifyData.currentlyPlaying.artist}
                        </MarqueeText>
                      </p>
                      <p className="text-xs text-white/50">
                        <MarqueeText
                          className="max-w-[12rem] mx-auto text-ellipsis"
                          baseSpeed={6}>
                          {spotifyData.currentlyPlaying.album}
                        </MarqueeText>
                      </p>
                    </div>
                  </div>

                  {/* Visualizer + Progress */}
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-center">
                      {spotifyData.currentlyPlaying.isPlaying ? (
                        <div className="flex gap-1 rotate-180">
                          <span className="w-1.5 h-5 bg-emerald-400 animate-[pulse_1s_ease-in-out_infinite]" />
                          <span className="w-1.5 h-8 bg-emerald-400 animate-[pulse_1.3s_ease-in-out_infinite]" />
                          <span className="w-1.5 h-4 bg-emerald-400 animate-[pulse_0.9s_ease-in-out_infinite]" />
                          <span className="w-1.5 h-7 bg-emerald-400 animate-[pulse_1.1s_ease-in-out_infinite]" />
                        </div>
                      ) : (
                        <div className="text-white/60">⏸️ Paused</div>
                      )}
                    </div>
                    {spotifyData.currentlyPlaying.progressMs &&
                      spotifyData.currentlyPlaying.durationMs && (
                        <div>
                          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-emerald-400 to-purple-400 h-2 rounded-full transition-all duration-700 ease-linear"
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
                  <div className="text-5xl mb-3 opacity-70">⏹️</div>
                  <p>Nothing playing right now</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Artists */}
          <div className="bg-white/10 rounded-2xl p-5 shadow-lg backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 transition">
            <h4 className="text-sm font-semibold mb-3 text-white/70 uppercase tracking-wide">
              Top Artists
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {spotifyData?.topArtists?.slice(0, 5).map((artist, i) => (
                <a
                  href={artist.spotifyUrl}
                  target="_blank"
                  key={i}
                  className="text-center group cursor-pointer hover:scale-105 transition">
                  <Image
                    src={artist.imageUrl}
                    alt={artist.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover mx-auto mb-2 shadow-md lg:w-14 lg:h-14 ring-1 ring-white/20 group-hover:ring-emerald-400/40"
                  />
                  <div className="text-xs truncate text-white/70 px-1">
                    <MarqueeText
                      className="max-w-[7rem] mx-auto text-ellipsis"
                      baseSpeed={5}>
                      {artist.name}
                    </MarqueeText>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Top Tracks */}
          <div className="bg-white/10 rounded-2xl p-5 shadow-lg backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 transition">
            <h4 className="text-sm font-semibold mb-3 text-white/70 uppercase tracking-wide">
              Top Tracks
            </h4>
            <div className="space-y-2">
              {spotifyData?.topTracks?.slice(0, 5).map((track, i) => (
                <a
                  key={i}
                  href={track.songUrl}
                  target="_blank"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition cursor-pointer">
                  <span className="text-xs text-white/50 w-4 flex-shrink-0">
                    {i + 1}
                  </span>
                  <Image
                    src={track.albumImageUrl}
                    alt={track.title}
                    width={32}
                    height={32}
                    className="rounded shadow lg:w-9 lg:h-9 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium">
                      <MarqueeText className="max-w-[10rem]" baseSpeed={5}>
                        {track.title}
                      </MarqueeText>
                    </div>
                    <div className="text-xs text-white/60">
                      <MarqueeText className="max-w-[10rem]" baseSpeed={5}>
                        {track.artist}
                      </MarqueeText>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Recently Played */}
          <div className="bg-white/10 rounded-2xl p-5 shadow-lg backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 transition">
            <h4 className="text-sm font-semibold mb-3 text-white/70 uppercase tracking-wide">
              Recently Played
            </h4>
            <div className="space-y-2">
              {spotifyData?.recentTracks?.slice(0, 5).map((track, i) => (
                <a
                  key={i}
                  href={track.songUrl}
                  target="_blank"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition cursor-pointer">
                  <Image
                    src={track.albumImageUrl}
                    alt={track.album}
                    width={32}
                    height={32}
                    className="rounded shadow lg:w-9 lg:h-9 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium">
                      <MarqueeText className="max-w-[12rem]" baseSpeed={4}>
                        {track.title}
                      </MarqueeText>
                    </div>
                    <div className="text-xs text-white/60">
                      <MarqueeText className="max-w-[12rem]" baseSpeed={4}>
                        {track.artist}
                      </MarqueeText>
                    </div>
                  </div>
                  <div className="text-xs text-white/40 flex-shrink-0 hidden sm:block">
                    {new Date(track.playedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-5 mt-8 border-t border-white/10 text-xs text-white/50">
          <span>✨ Live data from Spotify</span>
          <span>
            Updated{" "}
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* Additional global marquee & blob CSS */}
      <style jsx>{`
        /* We include a subtle safeguard marquee CSS for older browsers */
        .marquee-track {
          display: inline-flex;
          gap: 2rem;
          align-items: center;
        }

        /* When duplicated, translateX(-50%) shifts half the visible duplicated width,
           which combined with duplicated content creates a continuous loop. Duration is set inline. */
      `}</style>
    </div>
  );
}

/**
 * BackgroundBlobs
 * - subtle animated gradient blobs floating behind the main card
 * - pointer-events-none so they don't obstruct interactions
 */
function BackgroundBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* multiple blobs for depth */}
        <div className="absolute -left-10 -top-10 w-72 h-72 rounded-full blur-3xl opacity-40 animate-blob-slow" />
        <div className="absolute right-6 -top-12 w-64 h-64 rounded-full blur-3xl opacity-30 animate-blob-medium" />
        <div className="absolute -right-16 bottom-6 w-80 h-80 rounded-full blur-3xl opacity-20 animate-blob-fast" />
      </div>

      <style jsx>{`
        /* colored radial gradients for blobs (using Tailwind-like colors but inline) */
        .pointer-events-none > div {
          background: radial-gradient(
            closest-side,
            rgba(72, 187, 120, 0.9),
            rgba(72, 187, 120, 0.05) 60%
          );
          mix-blend-mode: screen;
        }

        /* second blob override to violet-ish */
        .pointer-events-none > div:nth-child(2) {
          background: radial-gradient(
            closest-side,
            rgba(139, 92, 246, 0.9),
            rgba(139, 92, 246, 0.04) 60%
          );
        }

        /* third blob blue-ish */
        .pointer-events-none > div:nth-child(3) {
          background: radial-gradient(
            closest-side,
            rgba(59, 130, 246, 0.9),
            rgba(59, 130, 246, 0.03) 60%
          );
        }

        /* blob animations */
        @keyframes blobSlow {
          0% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(30px, 20px) scale(1.08);
            opacity: 0.8;
          }
          100% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.6;
          }
        }

        @keyframes blobMedium {
          0% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.45;
          }
          50% {
            transform: translate(-20px, 25px) scale(1.12);
            opacity: 0.6;
          }
          100% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.45;
          }
        }

        @keyframes blobFast {
          0% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.35;
          }
          50% {
            transform: translate(-40px, -20px) scale(1.06);
            opacity: 0.5;
          }
          100% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.35;
          }
        }

        .animate-blob-slow {
          animation: blobSlow 14s ease-in-out infinite;
          filter: blur(36px);
        }
        .animate-blob-medium {
          animation: blobMedium 10s ease-in-out infinite;
          filter: blur(42px);
        }
        .animate-blob-fast {
          animation: blobFast 8s ease-in-out infinite;
          filter: blur(48px);
        }
      `}</style>
    </>
  );
}

export default EnhancedMusicBento;
