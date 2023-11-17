import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { COOKIES_KEY } from "@/common/constants/cookie";
import { APP_ROUTES } from "@/common/constants/routes";

export function middleware(request: NextRequest) {
  // const isWsAdmin = request?.cookies.get(COOKIES_KEY.IS_WS_ADMIN)?.value;
  // if (request.nextUrl.pathname === APP_ROUTES.HOME && !isWsAdmin) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = APP_ROUTES.LIST_INQUIRY;
  //   return NextResponse.redirect(url);
  // }
}
