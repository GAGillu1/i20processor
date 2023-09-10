import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../../../components/utils/getTokens";
// -----------------------
// GET - ALL USERS
const basePath = process.env.BASE_PATH;
const usersApi = process.env.USERS;
export async function GET(request: NextRequest) {
  if (basePath && usersApi)
    try {
      const res = await fetch(basePath + usersApi, {
        headers: getToken(request),
      });
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } catch (err: any) {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
}
// -----------------------
// POST - ADD NEW USER
export async function POST(request: NextRequest) {
  if (basePath && usersApi)
    try {
      const body = await request.formData();
      const res = await fetch(basePath + usersApi, {
        method: "POST",
        body: body,
        headers: getToken(request),
      });
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } catch (err: any) {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: err.status }
      );
    }
}
