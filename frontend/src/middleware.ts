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
  // update the below
  const isSuperAdmin = role === "ADMIN";
  const isSuperAdminPath = path === "/admin/university";

  if (token) {
    if (isPublicPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (
      (!isAdmin && isAdminPath) ||
      (isUser && !isUserPath) ||
      (!isSuperAdmin && isSuperAdminPath)
    ) {
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
    "/not-authorized",
    "/i20",
    "/i20/pre-processor",
    "/i20/post-processor",
    "/admin",
    "/admin/users",
    "/admin/instance",
    "/admin/institution",
    "/dso",
    "/login",
    "/profile",
    "/logs",
  ],
};
