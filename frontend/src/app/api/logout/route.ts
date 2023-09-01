import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
  cookies().delete("authorization");
  cookies().delete("institutionid");
  return NextResponse.json({
    message: "Logout Successful!",
  });
}
