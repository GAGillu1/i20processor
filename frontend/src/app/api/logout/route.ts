import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
  cookies().delete("authorization");
  cookies().delete("institutionid");
  cookies().delete("username");
  cookies().delete("role");
  return NextResponse.json({
    message: "Logout Successful!",
  });
}
