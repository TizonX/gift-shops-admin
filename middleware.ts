import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  const isLoggedIn = !!token;
  const { pathname } = req.nextUrl;

  const publicPaths = ["/login", "/signup"];

  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  if (!isPublic && !isLoggedIn) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
    //   return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Apply middleware to all paths EXCEPT:
      - _next/static (Next.js static files)
      - _next/image (Next.js image optimization)
      - favicon.ico
    */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
