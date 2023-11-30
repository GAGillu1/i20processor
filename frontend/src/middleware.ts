import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import toast from "react-hot-toast";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("authorization")?.value;
  const role = request.cookies.get("role")?.value;

  const isAdmin =
    role === "PrimaryContact" || role === "SuperUser" || role === "Admin";
  const isUser = role === "User";
  const isPublicPath = path === "/login" || path === "/support";
  const isAdminPath =
    path.includes("admin") ||
    path === "/help/users" ||
    path === "/help/instance";
  const isStaffPath = path === "/dso";
  const isUserPath = !(isAdminPath || isStaffPath);
  const isAtHome = path === "/";
  const isSuperAdmin = role === "SuperUser";
  const isSuperAdminPath =
    path === "/admin/institution" || path === "/help/institution";

  if (token) {
    if (isPublicPath) {
      toast.success("Already Logged In, Redirecting to home!");
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (
      (!isAdmin && isAdminPath) ||
      (isUser && !isUserPath) ||
      (!isSuperAdmin && isSuperAdminPath)
    ) {
      toast.error("Not-Authorized");
      return NextResponse.redirect(new URL("/not-Authorized", request.url));
    }
  } else {
    if (!isPublicPath) {
      toast.error("Please, login to continue!");
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
    "/help",
    "/help/pre-processor",
    "/help/post-processor",
    "/help/users",
    "/help/instance",
    "/help/institution",
    "/aboutUs",
    "/privacy",
  ],
};
