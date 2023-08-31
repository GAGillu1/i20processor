import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("authorization")?.value;
  const role = request.cookies.get("role")?.value;

  const isAdmin = role === "ADMIN";
  const isPublicPath = path === "/login" || path === "/support";
  const isAdminPath = path.includes("admin");

  if (token) {
    if (isPublicPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (!isAdmin && isAdminPath) {
      return NextResponse.redirect(new URL("/not-Authorized", request.url));
    }
  } else {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/notFound",
    "/i20",
    "/admin",
    "/admin/users",
    "/admin/instance",
    "/dso",
    "/login",
    "/profile",
  ],
};
