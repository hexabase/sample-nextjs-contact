import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIES_KEY } from './common/constants/cookie';
import acceptLanguage from 'accept-language'
import { APP_ROUTES } from './common/constants/routes';
import { cookieName, fallbackLng, languages } from '@/common/libs/i18n/settting';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let lng
  if (request.cookies.has(cookieName)) lng = acceptLanguage.get(request?.cookies.get(cookieName)?.value)
  if (!lng) lng = acceptLanguage.get(request.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !request.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${request.nextUrl.pathname}`, request.url))
  }

  const cookieStore = cookies();
  const access_token = cookieStore.get(COOKIES_KEY.ACCESS_TOKEN)
  const res = NextResponse.next();

  if(!access_token && request.nextUrl.pathname !== `/${lng}${APP_ROUTES.LOGIN}` ){
    return NextResponse.redirect(new URL(`/${lng}${APP_ROUTES.LOGIN}`, request.url))
  }

  if (request.headers.has('referer')) {
    const refererUrl =  new URL(request.headers.get('referer') as string)
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }
  return res
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
