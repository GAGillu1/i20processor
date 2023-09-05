import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("authorization")?.value;
  const role = request.cookies.get("role")?.value;

  const isAdmin = role === "ADMIN";
  const isUser = role === "USER";
  const isPublicPath = path === "/login" || path === "/support";
  const isAdminPath = path.includes("admin");
  const isStaffPath = path === "/dso";
  const isUserPath = !(isAdminPath || isStaffPath);
  const isAtHome = path === "/";

  if (token) {
    if (isUser && isAtHome) {
      return NextResponse.redirect(new URL("/i20/post-processor", request.url));
    }
    if (isPublicPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if ((!isAdmin && isAdminPath) || (isUser && !isUserPath)) {
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
    "/i20/pre-processor",
    "/i20/post-processor",
    "/i20/logs",
    "/admin",
    "/admin/users",
    "/admin/instance",
    "/dso",
    "/login",
    "/profile",
    "/logs",
  ],
};
