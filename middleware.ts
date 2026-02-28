import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const adminSession = request.cookies.get('admin_session')
    const { pathname } = request.nextUrl

    // Protect the UI pages
    if (pathname.startsWith('/admin/painel')) {
        if (!adminSession || adminSession.value !== 'authenticated') {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    }

    // Protect the internal admin API routes from public fetch requests
    if (pathname.startsWith('/api/admin')) {
        if (!adminSession || adminSession.value !== 'authenticated') {
            return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/painel/:path*', '/api/admin/:path*'],
}
