import { NextRequest, NextResponse } from 'next/server'

// Define admin credentials (same as middleware)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'your-secure-password-change-this'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create basic auth token for the response
      const credentials = Buffer.from(`${username}:${password}`).toString('base64')
      
      return NextResponse.json({ 
        success: true, 
        token: credentials,
        message: 'Authentication successful' 
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid username or password' 
      }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Authentication failed' 
    }, { status: 500 })
  }
}

// Also handle GET requests for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Admin authentication endpoint',
    method: 'POST',
    fields: ['username', 'password']
  })
}
