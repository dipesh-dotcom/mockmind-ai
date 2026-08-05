import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const pathname = req.nextUrl.pathname;

  const protectedRoutes = ["/dashboard", "/interview", "/profile", "/settings"];

  const authRoutes = ["/sign-in", "/sign-up"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthPage = authRoutes.includes(pathname);

  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/interview/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
