"use client";

import { useEffect, useState } from "react";

export default function SpotifyAuthPage() {
  const [authUrl, setAuthUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the auth URL from our API
    const baseUrl = window.location.origin;
    fetch("/api/spotify-auth")
      .then((response) => {
        if (response.redirected) {
          setAuthUrl(response.url);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error getting auth URL:", error);
        setLoading(false);
      });
  }, []);

  const handleAuth = () => {
    window.location.href = "/api/spotify-auth";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🎵</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Connect Your Spotify Account
        </h1>
        <p className="text-gray-600 mb-6">
          Authorize access to display your music data on your portfolio.
        </p>

        <div className="space-y-2 text-sm text-gray-600 mb-6">
          <p>• Currently playing track</p>
          <p>• Recently played music</p>
          <p>• Top artists and songs</p>
          <p>• Profile information</p>
        </div>

        {loading ? (
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg"></div>
          </div>
        ) : (
          <button
            onClick={handleAuth}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold">
            Connect with Spotify
          </button>
        )}

        <p className="text-xs text-gray-500 mt-4">
          This will redirect you to Spotify to authorize access.
        </p>
      </div>
    </div>
  );
}
