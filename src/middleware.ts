// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   console.log("in middleware");
//   const session = req.cookies.get("session")?.value;
//   const path = req.nextUrl.pathname;

//   const protectedRoutes = ["/dashboard"];

//   const isRouteProtected = protectedRoutes?.some((route) =>
//     path.startsWith(route)
//   );

//   if (isRouteProtected && !session) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     // "/dashboard/:path*",
//     // "/dashboard",
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//   ],
// };

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
