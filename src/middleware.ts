import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define admin credentials (in production, use environment variables)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'your-secure-password-change-this'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Only protect API routes that need server-side auth
  // Client-side routes will be handled by AuthWrapper component
  const isProtectedApiRoute = pathname.startsWith('/api/admin') && 
    pathname !== '/api/admin/auth' && 
    pathname !== '/api/admin/verify'
  
  if (isProtectedApiRoute) {
    // Check for authentication
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return NextResponse.json({ 
        success: false, 
        message: 'Authentication required' 
      }, { status: 401 })
    }

    // Decode and verify credentials
    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid credentials' 
      }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/admin/:path*'
  ]
}
