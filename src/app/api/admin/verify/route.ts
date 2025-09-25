import { NextRequest, NextResponse } from 'next/server'

// Define admin credentials (same as middleware)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'your-secure-password-change-this'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ 
        success: false, 
        message: 'No token provided' 
      }, { status: 401 })
    }

    // Decode the token and verify credentials
    try {
      const credentials = Buffer.from(token, 'base64').toString('ascii')
      const [username, password] = credentials.split(':')

      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return NextResponse.json({ 
          success: true, 
          message: 'Token is valid' 
        })
      } else {
        return NextResponse.json({ 
          success: false, 
          message: 'Invalid token' 
        }, { status: 401 })
      }
    } catch {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid token format' 
      }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Verification failed' 
    }, { status: 500 })
  }
}
