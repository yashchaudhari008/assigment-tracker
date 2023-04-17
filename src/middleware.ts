// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if(request.cookies.get('token')?.value !== 'yashadmin'){
        const response = NextResponse.rewrite(new URL('/unauth', request.url))
        response.cookies.delete('token');
        return response;
    };
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}