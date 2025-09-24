"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SpotifySuccessPage() {
  const searchParams = useSearchParams();
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("refresh_token");
    setRefreshToken(token);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Spotify Authentication Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Your Spotify account has been successfully connected.
          </p>

          {refreshToken && (
            <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
              <h2 className="font-semibold text-gray-800 mb-2">
                🔑 Refresh Token (Save this to your .env.local file):
              </h2>
              <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
                SPOTIFY_REFRESH_TOKEN={refreshToken}
              </code>
              <p className="text-sm text-gray-600 mt-2">
                Copy this token and add it to your <code>.env.local</code> file
                to enable Spotify integration.
              </p>
            </div>
          )}

          <div className="space-y-2 text-sm text-gray-600">
            <p>✅ Access to currently playing track</p>
            <p>✅ Access to recently played tracks</p>
            <p>✅ Access to top artists and tracks</p>
            <p>✅ Access to user profile information</p>
          </div>

          <div className="mt-8">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Return to Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
