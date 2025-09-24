import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const code = body?.code;
    if (!code) {
      return NextResponse.json({ error: "missing_code" }, { status: 400 });
    }

    const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REDIRECT_URI) {
      return NextResponse.json(
        {
          error:
            "server_misconfigured",
          details:
            "Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET and SPOTIFY_REDIRECT_URI in your environment",
        },
        { status: 500 }
      );
    }

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    });

    const authHeader = Buffer.from(
      `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await tokenRes.json();

    if (!tokenRes.ok) {
      return NextResponse.json({ error: data }, { status: tokenRes.status });
    }

    // data contains access_token, token_type, scope, expires_in, refresh_token (if available)
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
