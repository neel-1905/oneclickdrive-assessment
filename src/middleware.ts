import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/" && !!session) {
    return NextResponse.rewrite(new URL("/dashboard", request.url));
  }

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
